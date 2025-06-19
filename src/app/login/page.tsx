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
      router.push('/profile'); 
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
      <div className="flex min-h-screen items-center justify-center animated-page-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    return null;
  }
  
  const isLoading = isLoginSubmitting || isSignupSubmitting || authLoading;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 animated-page-gradient">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-md rounded-xl shadow-2xl border border-border/50 p-2 sm:p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-gradient-purple-pink mb-2 sm:mb-4 tracking-tight">
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
                <Label htmlFor="login-email" className="block text-sm font-medium text-foreground/80 mb-1">Email</Label>
                <Input 
                  id="login-email" 
                  type="email" 
                  {...registerLogin('email')} 
                  placeholder="you@example.com" 
                  className="w-full px-4 py-3 bg-input/70 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 hover:border-primary/50"
                />
                {loginErrors.email && <p className="text-sm text-destructive mt-1">{loginErrors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="login-password" className="block text-sm font-medium text-foreground/80 mb-1">Password</Label>
                <Input 
                  id="login-password" 
                  type="password" 
                  {...registerLogin('password')} 
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 bg-input/70 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 hover:border-primary/50"
                />
                {loginErrors.password && <p className="text-sm text-destructive mt-1">{loginErrors.password.message}</p>}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary/30 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" 
                disabled={isLoading}
              >
                {isLoading && !isLoginSubmitting ? null : isLoginSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Log In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitSignup(onSignupSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="signup-username" className="block text-sm font-medium text-foreground/80 mb-1">Username</Label>
                <Input 
                  id="signup-username" 
                  {...registerSignup('username')} 
                  placeholder="YourGamerTag" 
                  className="w-full px-4 py-3 bg-input/70 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 hover:border-primary/50"
                />
                {signupErrors.username && <p className="text-sm text-destructive mt-1">{signupErrors.username.message}</p>}
              </div>
              <div>
                <Label htmlFor="signup-email" className="block text-sm font-medium text-foreground/80 mb-1">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  {...registerSignup('email')} 
                  placeholder="you@example.com" 
                  className="w-full px-4 py-3 bg-input/70 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 hover:border-primary/50"
                />
                {signupErrors.email && <p className="text-sm text-destructive mt-1">{signupErrors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="signup-password" className="block text-sm font-medium text-foreground/80 mb-1">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  {...registerSignup('password')} 
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 bg-input/70 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 hover:border-primary/50"
                />
                {signupErrors.password && <p className="text-sm text-destructive mt-1">{signupErrors.password.message}</p>}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary/30 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" 
                disabled={isLoading}
              >
                {isLoading && !isSignupSubmitting ? null : isSignupSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign Up
              </Button>
            </form>
          )}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/80 px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 bg-input/50 hover:bg-input/70 text-foreground font-medium py-3 px-4 rounded-lg border border-border/70 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" 
            onClick={handleGoogleSignIn} 
            disabled={isLoading}
          >
             {isLoading && !(isLoginSubmitting || isSignupSubmitting) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4 text-primary" />}
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center pt-4">
          <Button 
            variant="link" 
            onClick={() => setIsLoginMode(!isLoginMode)} 
            disabled={isLoading}
            className="text-accent hover:text-accent/80"
          >
            {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}