import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { NextRequest, NextResponse } from 'next/server';

import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action';
import { clerkClient } from '@clerk/clerk-sdk-node';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

async function validateRequest(request: Request) {
  const payload = await request.text();
  const headerPayload = await headers();

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  };

  const wh = new Webhook(webhookSecret);
  return wh.verify(payload, svixHeaders) as WebhookEvent;
}

export async function POST(req: NextRequest) {
  try {
    const evt = await validateRequest(req);
    const eventType = evt.type;

    if (eventType === 'user.created') {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        photo: image_url,
      };

      const newUser = await createUser(user);

      if (newUser) {
        await clerkClient.users.updateUser(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      return NextResponse.json({ message: 'User created', user: newUser });
    }

    if (eventType === 'user.updated') {
      const { id, image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name,
        lastName: last_name,
        username: username!,
        photo: image_url,
      };

      const updatedUser = await updateUser(id, user);

      return NextResponse.json({ message: 'User updated', user: updatedUser });
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      const deletedUser = await deleteUser(id!);

      return NextResponse.json({ message: 'User deleted', user: deletedUser });
    }

    return NextResponse.json({ message: 'Unhandled event type' });
  } catch (err) {
    console.error('❌ Webhook validation failed:', err);
    return new Response('Webhook validation failed', { status: 400 });
  }
}
