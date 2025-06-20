
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
import { Loader2, UserCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }).max(20, { message: 'Username must be 20 characters or less' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const anonymousLoginSchema = z.object({
  pseudo: z.string().min(3, { message: 'Pseudo must be at least 3 characters' }).max(20, { message: 'Pseudo must be 20 characters or less' }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;
type AnonymousLoginFormData = z.infer<typeof anonymousLoginSchema>;

const GoogleGLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" width="100%"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
);

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { logInWithEmail, signUpWithEmail, signInWithGoogle, signInAnonymously, user, loading: authLoading } = useAuth();
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

  const {
    register: registerAnonymous,
    handleSubmit: handleSubmitAnonymous,
    formState: { errors: anonymousErrors, isSubmitting: isAnonymousSubmitting },
  } = useForm<AnonymousLoginFormData>({
    resolver: zodResolver(anonymousLoginSchema),
  });


  useEffect(() => {
    if (user && !authLoading) {
      router.push('/profile');
    }
  }, [user, authLoading, router]);

  const onLoginSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await logInWithEmail(data.email, data.password);
  };

  const onSignupSubmit: SubmitHandler<SignupFormData> = async (data) => {
    await signUpWithEmail(data.email, data.password, data.username);
  };

  const onAnonymousSubmit: SubmitHandler<AnonymousLoginFormData> = async (data) => {
    await signInAnonymously(data.pseudo);
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  if (authLoading && !user) { 
    return (
      <div className="flex min-h-screen items-center justify-center animated-page-gradient p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (user && !authLoading) { 
    return null;
  }

  const isLoading = isLoginSubmitting || isSignupSubmitting || isAnonymousSubmitting || authLoading;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 animated-page-gradient">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-md shadow-2xl rounded-xl p-4 sm:p-6 border border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-gradient-theme mb-2 sm:mb-3 tracking-tight">
            {isLoginMode ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLoginMode ? 'Log in to continue your game.' : 'Sign up to start your Skyfall Boomer journey.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoginMode ? (
            <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="login-email" className="block text-sm font-medium text-foreground/90 mb-1">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  {...registerLogin('email')}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 hover:border-primary/70"
                />
                {loginErrors.email && <p className="text-sm text-destructive mt-1">{loginErrors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="login-password" className="block text-sm font-medium text-foreground/90 mb-1">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  {...registerLogin('password')}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 hover:border-primary/70"
                />
                {loginErrors.password && <p className="text-sm text-destructive mt-1">{loginErrors.password.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-primary/30 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading && isLoginSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Log In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitSignup(onSignupSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="signup-username" className="block text-sm font-medium text-foreground/90 mb-1">Username</Label>
                <Input
                  id="signup-username"
                  {...registerSignup('username')}
                  placeholder="YourGamerTag"
                  className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 hover:border-primary/70"
                />
                {signupErrors.username && <p className="text-sm text-destructive mt-1">{signupErrors.username.message}</p>}
              </div>
              <div>
                <Label htmlFor="signup-email" className="block text-sm font-medium text-foreground/90 mb-1">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  {...registerSignup('email')}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 hover:border-primary/70"
                />
                {signupErrors.email && <p className="text-sm text-destructive mt-1">{signupErrors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="signup-password" className="block text-sm font-medium text-foreground/90 mb-1">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  {...registerSignup('password')}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 hover:border-primary/70"
                />
                {signupErrors.password && <p className="text-sm text-destructive mt-1">{signupErrors.password.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-primary/30 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading && isSignupSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign Up
              </Button>
            </form>
          )}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/70" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/80 backdrop-blur-md px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-secondary/50 hover:bg-secondary/70 text-foreground font-medium py-2.5 px-4 rounded-lg border-border hover:border-primary/70 transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={handleGoogleSignIn}
            disabled={isLoading && !isLoginSubmitting && !isSignupSubmitting && !isAnonymousSubmitting}
          >
             {isLoading && !(isLoginSubmitting || isSignupSubmitting || isAnonymousSubmitting) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleGLogo />}
            Sign in with Google
          </Button>

          <div className="relative my-4 pt-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/70" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/80 backdrop-blur-md px-2 text-muted-foreground">Or Play as Guest</span>
            </div>
          </div>

          <form onSubmit={handleSubmitAnonymous(onAnonymousSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="anonymous-pseudo" className="block text-sm font-medium text-foreground/90 mb-1">Choose a Pseudo</Label>
              <Input
                id="anonymous-pseudo"
                {...registerAnonymous('pseudo')}
                placeholder="GuestPlayer123"
                className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 hover:border-primary/70"
              />
              {anonymousErrors.pseudo && <p className="text-sm text-destructive mt-1">{anonymousErrors.pseudo.message}</p>}
            </div>
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-secondary/50 hover:bg-secondary/70 text-foreground font-medium py-2.5 px-4 rounded-lg border-border hover:border-primary/70 transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading && isAnonymousSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserCircle2 className="mr-2 h-5 w-5"/>}
              Login as Guest
            </Button>
          </form>


        </CardContent>
        <CardFooter className="flex justify-center pt-4">
          <Button
            variant="link"
            onClick={() => setIsLoginMode(!isLoginMode)}
            disabled={isLoading}
            className="text-primary hover:text-primary/80"
          >
            {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
