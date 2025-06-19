
'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Loader2, User, LogOut, Crown, Gamepad2, ShieldQuestion, Edit3, Save, XCircle, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

// Inline SVG for ShieldQuestion (Guest)
const ShieldQuestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-question text-primary">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </svg>
);

// Inline SVG for User (Default placeholder)
const UserIconPlaceholder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-primary">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);


export default function ProfilePage() {
  const { user, loading, logOut, updateUserProfileData } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editableUsername, setEditableUsername] = useState('');
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setEditableUsername(user.username || '');
      setAvatarPreview(user.photoURL || null);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 animated-page-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Cloudinary has its own file size limits, so we remove the client-side check for now.
      // We can add a more generous client-side limit if desired, e.g., 5MB.
      // For example: if (file.size > 5 * 1024 * 1024) { ... }
      setSelectedAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string); // Show local preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    if (!user || user.isAnonymous) {
      toast({ title: "Error", description: "Cannot update guest profile.", variant: "destructive" });
      return;
    }
    const trimmedUsername = editableUsername.trim();
    if (!trimmedUsername) {
      toast({ title: "Validation Error", description: "Username cannot be empty.", variant: "destructive" });
      return;
    }
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      toast({ title: "Validation Error", description: "Username must be between 3 and 20 characters.", variant: "destructive" });
      return;
    }


    setIsSaving(true);
    const result = await updateUserProfileData({
      newUsername: trimmedUsername !== user.username ? trimmedUsername : undefined,
      newAvatarFile: selectedAvatarFile || undefined,
    });
    setIsSaving(false);

    if (result.success) {
      toast({ title: "Profile Updated", description: result.message, className: "bg-primary text-primary-foreground border-primary" });
      setIsEditing(false);
      setSelectedAvatarFile(null); 
      // Avatar preview will be updated via useEffect when user.photoURL changes
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      toast({ title: "Update Failed", description: result.message, variant: "destructive" });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableUsername(user.username || '');
    setAvatarPreview(user.photoURL || null); // Revert preview to original photoURL
    setSelectedAvatarFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const canEditProfile = !user.isAnonymous;

  // If editing and an avatar preview exists from a selected file, use that. Otherwise, use user.photoURL.
  const displayAvatar = (isEditing && avatarPreview) ? avatarPreview : user.photoURL;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 animated-page-gradient">
      <Card className="w-full max-w-md text-center bg-card/80 backdrop-blur-md shadow-2xl rounded-xl p-4 border border-border/50">
        <CardHeader>
          <div className="relative mx-auto mb-4 h-32 w-32 rounded-full overflow-hidden border-4 border-primary bg-secondary flex items-center justify-center shadow-lg">
            {isEditing && canEditProfile ? (
              <button
                onClick={triggerFileSelect}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer rounded-full"
                aria-label="Change profile picture"
              >
                <UploadCloud className="h-10 w-10 mb-1" />
                <span className="text-xs">Change</span>
              </button>
            ) : null}
            
            {displayAvatar ? (
              <Image
                src={displayAvatar} // This will show the local preview during editing or the Cloudinary URL
                alt={user.username || 'User'}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                key={displayAvatar} // Add key to force re-render if URL changes
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {user.isAnonymous ? <ShieldQuestionIcon /> : <UserIconPlaceholder />}
              </div>
            )}

            {isEditing && canEditProfile && (
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/png, image/jpeg, image/gif, image/webp"
                className="hidden"
              />
            )}
          </div>
          {isEditing && canEditProfile ? (
            <div className="mb-3">
              <Label htmlFor="username" className="sr-only">Username</Label>
              <Input
                id="username"
                type="text"
                value={editableUsername}
                onChange={(e) => setEditableUsername(e.target.value)}
                placeholder="Enter new username"
                className="w-full text-center text-2xl font-bold bg-input border-border text-foreground focus:ring-primary"
              />
            </div>
          ) : (
            <CardTitle className="text-3xl font-bold text-gradient-theme tracking-tight">
              {user.username || 'User Profile'}
              {user.isAnonymous && <span className="block text-sm font-normal text-muted-foreground">(Guest Account)</span>}
            </CardTitle>
          )}
          <CardDescription className="text-muted-foreground">
            {user.email ? user.email : user.isAnonymous ? 'Guest Account - No email' : 'Email not available'}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-2xl font-semibold text-foreground">
            High Score: <span className="text-accent font-bold">{user.highScore || 0}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 mt-6">
          {isEditing && canEditProfile ? (
            <>
              <Button
                onClick={handleSaveChanges}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                Save Changes
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                className="w-full py-3 bg-secondary/50 hover:bg-secondary/70 text-foreground border-border hover:border-destructive"
                disabled={isSaving}
              >
                <XCircle className="mr-2 h-5 w-5" /> Cancel
              </Button>
            </>
          ) : (
            <>
              {canEditProfile && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="w-full py-3 bg-secondary/50 hover:bg-secondary/70 text-foreground border-border hover:border-primary"
                >
                  <Edit3 className="mr-2 h-5 w-5" /> Edit Profile
                </Button>
              )}
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full py-3 bg-secondary/50 hover:bg-secondary/70 text-foreground border-border hover:border-primary"
              >
                <Gamepad2 className="mr-2 h-5 w-5" /> Back to Game
              </Button>
              <Button
                onClick={() => router.push('/leaderboard')}
                variant="outline"
                className="w-full py-3 bg-secondary/50 hover:bg-secondary/70 text-foreground border-border hover:border-primary"
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
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

