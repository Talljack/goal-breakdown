"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Subtask {
  id: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
}

interface Goal {
  id: string;
  description: string;
  notificationsEnabled: boolean;
  subtasks: Subtask[];
}

const motivationalQuotes = [
  "The way is long but not difficult.",
  "Don't let yesterday take up too much of today.",
  "Small progress is still progress.",
  "Your only limit is you.",
  "Believe you can and you're halfway there."
];

export default function GoalsOverview() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [quote, setQuote] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
    setGoals(storedGoals);
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  const deleteGoal = (id: string) => {
    const updatedGoals = goals?.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
    toast({
      title: "Goal Deleted",
      description: "Your goal has been successfully removed.",
    });
  };

  const editGoal = (id: string) => {
    window.location.href = `/goals/edit/${id}`;
  };

  const calculateProgress = (goal: Goal) => {
    if (!goal.subtasks?.length) return 0;
    const completedSubtasks = goal.subtasks?.filter(subtask => subtask.completed).length;
    const totalSubtasks = goal.subtasks?.length;
    return totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => calculateProgress(goal) === 100).length;
  const unfinishedGoals = totalGoals - completedGoals;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Goals</h1>
        <Link href="/goals">
          <Button>Add New Goal</Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-lg font-semibold mb-4">{quote}</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{totalGoals}</p>
              <p className="text-sm text-muted-foreground">Total Goals</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{completedGoals}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{unfinishedGoals}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {goals.length === 0 ? (
        <p className="text-center text-muted-foreground">You haven't set any goals yet. Start by adding a new goal!</p>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{goal.description}</span>
                  <div>
                    <Button variant="ghost" size="icon" className="mr-2" onClick={() => editGoal(goal.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={calculateProgress(goal)} className="w-full" />
                  <div className="flex justify-between text-sm">
                    <span>{goal.subtasks?.filter(st => st.completed).length ?? 0} / {goal.subtasks?.length ?? 0} subtasks completed</span>
                    <span className="font-medium">{calculateProgress(goal)}% Complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}