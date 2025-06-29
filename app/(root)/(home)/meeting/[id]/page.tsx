'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';
// import Alert from '@/components/Alert';
import MeetingSetup from '@/components/Meeting/MeetingSetup';
import MeetingRoom from '@/components/Meeting/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';

const MeetingPage = () => {
  const params = useParams();
  const { isLoaded, user } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Safe param access: assumes route is /meeting/[id]
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-white" />
      </div>
    );
  }

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }

  const notAllowed =
    call.type === 'invited' &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  // if (notAllowed) {
  //   return <Alert title="You are not allowed to join this meeting" />;
  // }

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
