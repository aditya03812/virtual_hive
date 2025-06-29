'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY!;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error('User is not authenticated');
  if (!STREAM_API_KEY || !STREAM_API_SECRET) {
    throw new Error('Stream API key or secret is missing');
  }

  // Initialize server client
  const client = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  // Ensure the user exists (upsert if necessary)
  await client.upsertUsers([{
    id: user.id,
    role: 'user',
    name: user.fullName ?? undefined,
    image: user.imageUrl ?? undefined,
  }]);

  // Generate a user token valid for 1 hour
  const token = client.generateUserToken({
    user_id: user.id,
    validity_in_seconds: 60 * 60,
  });

  return token;
};
