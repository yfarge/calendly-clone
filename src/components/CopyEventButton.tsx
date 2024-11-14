'use client';
import { CopyButton, type CopyButtonProps } from './CopyButton';

export function CopyEventButton({
    clerkUserId,
    eventId,
    ...copyButtonProps
}: Omit<CopyButtonProps, 'content'> & {
    clerkUserId: string;
    eventId: string;
}) {
    return (
        <CopyButton
            content={`${location.origin}/book/${clerkUserId}/${eventId}`}
            {...copyButtonProps}
        />
    );
}
