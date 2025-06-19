
'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Loader2, User, LogOut, Crown, Gamepad2 } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center animated-page-gradient p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 animated-page-gradient">
      <Card className="w-full max-w-md text-center bg-card shadow-xl rounded-xl p-4">
        <CardHeader>
          <div className="mx-auto mb-4 h-28 w-28 rounded-full overflow-hidden border-4 border-primary bg-secondary flex items-center justify-center shadow-lg">
            {user.photoURL ? (
              <Image src={user.photoURL} alt={user.username || 'User'} width={112} height={112} className="object-cover" />
            ) : (
              <User className="h-20 w-20 text-primary" />
            )}
          </div>
          <CardTitle className="text-3xl font-bold text-gradient-theme tracking-tight">{user.username || 'User Profile'}</CardTitle>
          <CardDescription className="text-muted-foreground">{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-2xl font-semibold text-foreground">
            High Score: <span className="text-accent font-bold">{user.highScore || 0}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 mt-6">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full py-3 bg-background hover:bg-secondary text-foreground border-border hover:border-primary"
          >
            <Gamepad2 className="mr-2 h-5 w-5" /> Back to Game
          </Button>
           <Button
            onClick={() => router.push('/leaderboard')}
            variant="outline"
            className="w-full py-3 bg-background hover:bg-secondary text-foreground border-border hover:border-primary"
           >
            <Crown className="mr-2 h-5 w-5" /> View Leaderboard
          </Button>
          <Button
            onClick={logOut}
            variant="destructive"
            className="w-full py-3"
          >
            <LogOut className="mr-2 h-5 w-5" /> Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
