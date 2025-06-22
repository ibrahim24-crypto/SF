import GameScreen from '@/components/game/GameScreen';

export const metadata = {
  title: 'Skyfall Boomer',
  description: 'Bienvenue sur Skyfall Boomer',
  other: {
    'google-site-verification': '56_RypUHAdcOMV5XgJKxTnIY7IXdJPViXdR8GXKIdYc',
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-game-screen">
      <GameScreen />
    </main>
  );
}
