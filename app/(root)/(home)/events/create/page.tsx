import EventForm from '@/components/ui/EventForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const CreateEvent = async () => {
  const { userId } = await auth(); 
  // console.log(userId);
  if (!userId) {
    return <div className="wrapper py-10 text-center text-red-500">You must be logged in to create an event.</div>;
  }


  return (
    <>
      <section className="bg-primary-50 text-white bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center text-white sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  )
}

export default CreateEvent
