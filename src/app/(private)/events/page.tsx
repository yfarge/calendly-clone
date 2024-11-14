import { CopyEventButton } from '@/components/CopyEventButton';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { db } from '@/drizzle/db';
import { formatEventDescription } from '@/lib/formatters';
import { cn } from '@/lib/utils';
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
                <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
                    {events.map((event) => (
                        <EventCard {...event} />
                    ))}
                </div>
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

type EventCardProps = {
    id: string;
    isActive: boolean;
    name: string;
    description: string | null;
    duration: number;
    clerkUserId: string;
};

function EventCard({
    id,
    isActive,
    name,
    description,
    duration,
    clerkUserId,
}: EventCardProps) {
    return (
        <Card className={cn('flex flex-col', !isActive && 'border-secondary')}>
            <CardHeader className={cn(!isActive && 'opacity-50')}>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatEventDescription(duration)}</CardDescription>
            </CardHeader>
            {description != null && (
                <CardContent className={cn(!isActive && 'opacity-50')}>
                    {description}
                </CardContent>
            )}
            <CardFooter className="flex justify-end gap-2 mt-auto">
                {isActive && (
                    <CopyEventButton
                        variant="outline"
                        clerkUserId={clerkUserId}
                        eventId={id}
                    />
                )}
                <Button asChild>
                    <Link href={`/events/${id}/edit`}>Edit</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
