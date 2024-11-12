import { Button } from '@/components/ui/button';
import { db } from '@/drizzle/db';
import { auth } from '@clerk/nextjs/server';
import { CalendarPlus, CalendarRange } from 'lucide-react';
import Link from 'next/link';

export default async function EventsPage() {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">
          Events
        </h1>
        <Button asChild>
          <Link href="/events/new">
            <CalendarPlus className="mr-2 size-6" /> New Event
          </Link>
        </Button>
      </div>
      {events.length > 0 ? (
        events.map((event) => <div>{event.name}</div>)
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <CalendarRange className="size-16 mx-auto" />
          Create your first event to get started!
          <Button size="lg" className="text-lg" asChild>
            <Link href="/events/new">
              <CalendarPlus className="mr-2 size-6" /> New Event
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
