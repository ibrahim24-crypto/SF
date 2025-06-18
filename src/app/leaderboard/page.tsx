
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Trophy } from 'lucide-react';
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
        // Potentially show a toast error
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 pt-10">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <Trophy className="mx-auto h-12 w-12 text-accent mb-2" />
          <CardTitle className="text-3xl font-headline text-primary">Leaderboard</CardTitle>
          <CardDescription>Top 10 Skyfall Boomers!</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : leaderboard.length === 0 ? (
            <p className="text-center text-muted-foreground">No scores yet. Be the first!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-center">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry, index) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell>{entry.username}</TableCell>
                    <TableCell className="text-right font-semibold text-accent">{entry.highScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
         <CardFooter className="flex justify-center mt-4">
           <Link href="/" passHref>
            <Button variant="outline">Back to Game</Button>
           </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
