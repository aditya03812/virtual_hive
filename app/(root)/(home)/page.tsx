import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Collection from '@/components/ui/ui/Collection';
import { getAllEvents } from '@/lib/actions/event.actions';
import Search from '@/components/ui/Search';
import CategoryFilter from '@/components/ui/CategoryFilter';
import MeetingTypeList from '@/components/Meeting/MeetingTypeList';

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // ✅ make it a promise
}

function getParam(param?: string | string[]): string {
  if (Array.isArray(param)) return param[0] || '';
  return param ?? '';
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams; // ✅ await first
  const page = Number(getParam(resolvedSearchParams.page)) || 1;
  const searchText = getParam(resolvedSearchParams.query);
  const category = getParam(resolvedSearchParams.category);

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <>
      <section className="bg-primary bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 text-white pl-10">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit rounded-3xl bg-dark-2">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
    

<section className="flex  flex-col gap-5 mt-10 text-white">
      <div className="h-[308px] w-full rounded-[20px] bg-[image:var(--bg-hero)] bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

     < MeetingTypeList /> 
    </section>



      <section id="events" className="bg-primary wrapper mt-10 my-0 pl-8! flex flex-col gap-8 md:gap-12 text-white">
        <h2 className="h2-bold">Trusted by <br /> Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {/* You can add Search and CategoryFilter components here */}
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
