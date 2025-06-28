import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Collection from '@/components/ui/ui/Collection';
import { getAllEvents } from '@/lib/actions/event.actions';

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

      <section id="events" className="bg-primary wrapper my-0 pl-8! flex flex-col gap-8 md:gap-12 text-white">
        <h2 className="h2-bold">Trusted by <br /> Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {/* You can add Search and CategoryFilter components here */}
          Search
          CategoryFilter
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
