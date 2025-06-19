import GameScreen from '@/components/game/GameScreen';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-game-screen">
      <GameScreen />
    </main>
  );
}