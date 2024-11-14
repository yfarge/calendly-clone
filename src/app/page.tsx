import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { CalendarFold } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = await auth();
  if (userId != null) redirect('/events');

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="flex flex-col gap-6 p-8 shadow-xl rounded-xl bg-white max-w-sm w-full">
        <header className="flex items-center gap-3">
          <CalendarFold className="text-4xl" />
          <h1 className="text-3xl font-semibold">Calendly Clone</h1>
        </header>

        <div className="flex flex-col gap-4">
          <Button asChild>
            <SignInButton />
          </Button>
          <Button asChild>
            <SignUpButton />
          </Button>
        </div>
      </div>
    </div>
  );
}
