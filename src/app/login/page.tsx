
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, Chrome } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { logInWithEmail, signUpWithEmail, signInWithGoogle, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (user) {
      router.push('/profile'); // Or '/' to go to the game
    }
  }, [user, router]);

  const onLoginSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await logInWithEmail(data.email, data.password);
  };

  const onSignupSubmit: SubmitHandler<SignupFormData> = async (data) => {
    await signUpWithEmail(data.email, data.password, data.username);
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If user exists and we are about to navigate, render nothing to avoid flicker
  if (user) {
    return null;
  }
  
  const isLoading = isLoginSubmitting || isSignupSubmitting || authLoading;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">
            {isLoginMode ? 'Welcome Back!' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {isLoginMode ? 'Log in to continue your game.' : 'Sign up to start your Skyfall Boomer journey.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoginMode ? (
            <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" {...registerLogin('email')} placeholder="you@example.com" />
                {loginErrors.email && <p className="text-sm text-destructive mt-1">{loginErrors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" {...registerLogin('password')} placeholder="••••••••" />
                {loginErrors.password && <p className="text-sm text-destructive mt-1">{loginErrors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Log In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitSignup(onSignupSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="signup-username">Username</Label>
                <Input id="signup-username" {...registerSignup('username')} placeholder="YourGamerTag" />
                {signupErrors.username && <p className="text-sm text-destructive mt-1">{signupErrors.username.message}</p>}
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" {...registerSignup('email')} placeholder="you@example.com" />
                {signupErrors.email && <p className="text-sm text-destructive mt-1">{signupErrors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" {...registerSignup('password')} placeholder="••••••••" />
                {signupErrors.password && <p className="text-sm text-destructive mt-1">{signupErrors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign Up
              </Button>
            </form>
          )}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => setIsLoginMode(!isLoginMode)} disabled={isLoading}>
            {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
