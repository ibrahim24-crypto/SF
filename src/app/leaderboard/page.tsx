
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Trophy, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

interface LeaderboardEntry {
  id: string;
  username: string;
  highScore: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('highScore', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const boardData: LeaderboardEntry[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.username && typeof data.highScore === 'number') {
            boardData.push({ id: doc.id, username: data.username, highScore: data.highScore });
          }
        });
        setLeaderboard(boardData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center animated-page-gradient p-4 pt-10">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-md shadow-2xl rounded-xl border border-border/50">
        <CardHeader className="text-center p-6">
          <Trophy className="mx-auto h-16 w-16 text-accent mb-3" />
          <CardTitle className="text-4xl font-bold text-gradient-theme tracking-tight">Leaderboard</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">Top 10 Skyfall Boomers!</CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
          ) : leaderboard.length === 0 ? (
            <p className="text-center text-xl text-muted-foreground py-10">No scores yet. Be the first champion!</p>
          ) : (
            <Table className="mt-2">
              <TableHeader>
                <TableRow className="border-b-border">
                  <TableHead className="w-[60px] text-center text-base font-semibold text-muted-foreground">Rank</TableHead>
                  <TableHead className="text-base font-semibold text-muted-foreground">Player</TableHead>
                  <TableHead className="text-right text-base font-semibold text-muted-foreground">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry, index) => (
                  <TableRow key={entry.id} className="border-b-border/70 hover:bg-secondary/30 transition-colors duration-150">
                    <TableCell className="font-bold text-lg text-center text-primary">{index + 1}</TableCell>
                    <TableCell className="text-lg text-foreground/90">{entry.username}</TableCell>
                    <TableCell className="text-right font-semibold text-xl text-accent">{entry.highScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
         <CardFooter className="flex justify-center p-6 mt-2">
           <Link href="/" passHref>
            <Button
              variant="outline"
              className="py-3 px-6 text-base bg-secondary/50 hover:bg-secondary/70 text-foreground border-border hover:border-primary"
            >
              <Gamepad2 className="mr-2 h-5 w-5" /> Back to Game
            </Button>
           </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
