
'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Loader2, User, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto mb-4 h-24 w-24 rounded-full overflow-hidden border-2 border-primary bg-muted flex items-center justify-center">
            {user.photoURL ? (
              <Image src={user.photoURL} alt={user.username || 'User'} width={96} height={96} className="object-cover" />
            ) : (
              <User className="h-16 w-16 text-primary" />
            )}
          </div>
          <CardTitle className="text-3xl font-headline text-primary">{user.username || 'User Profile'}</CardTitle>
          <CardDescription className="text-foreground/80">{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-foreground">
            High Score: <span className="text-accent">{user.highScore || 0}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={() => router.push('/')} variant="outline" className="w-full">
            Back to Game
          </Button>
           <Button onClick={() => router.push('/leaderboard')} variant="outline" className="w-full">
            View Leaderboard
          </Button>
          <Button onClick={logOut} variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
