"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/components/ui/use-toast";
import { Plus, X } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';

interface Subtask {
  id: string;
  description: string;
  completed: boolean;
  notification: boolean;
  dueDate: Date | null;
}

interface Goal {
  id: string;
  description: string;
  subtasks: Subtask[];
}

export default function EditGoal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    const foundGoal = goals.find((g: Goal) => g.id === params.id);
    if (foundGoal) {
      setGoal(foundGoal);
    } else {
      router.push('/goals/overview');
    }
  }, [params.id, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal) {
      const goals = JSON.parse(localStorage.getItem('goals') || '[]');
      const updatedGoals = goals.map((g: Goal) => g.id === goal.id ? goal : g);
      localStorage.setItem('goals', JSON.stringify(updatedGoals));
      toast({
        title: "Goal Updated",
        description: "Your goal has been successfully updated.",
      });
      router.push('/goals/overview');
    }
  };

  const addSubtask = () => {
    if (goal) {
      setGoal({
        ...goal,
        subtasks: [...goal.subtasks, { 
          id: Date.now().toString(), 
          description: '', 
          completed: false,
          dueDate: null
        }]
      });
    }
  };

  const updateSubtask = (id: string, updates: Partial<Subtask>) => {
    if (goal) {
      setGoal({
        ...goal,
        subtasks: goal.subtasks.map(subtask =>
          subtask.id === id ? { ...subtask, ...updates } : subtask
        )
      });
    }
  };

  const removeSubtask = (id: string) => {
    if (goal) {
      setGoal({
        ...goal,
        subtasks: goal.subtasks.filter(subtask => subtask.id !== id)
      });
    }
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Edit Goal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Goal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="goal-description">Goal Description</Label>
              <Input
                id="goal-description"
                value={goal.description}
                onChange={(e) => setGoal({...goal, description: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Subtasks</Label>
              {goal.subtasks.map((subtask) => (
                <div key={subtask.id} className="space-y-2 border p-4 rounded-md">
                  <Input
                    value={subtask.description}
                    onChange={(e) => updateSubtask(subtask.id, { description: e.target.value })}
                    placeholder="Describe your subtask"
                    className="flex-grow"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`completed-${subtask.id}`}
                        checked={subtask.completed}
                        onCheckedChange={(checked) => updateSubtask(subtask.id, { completed: checked })}
                      />
                      <Label htmlFor={`completed-${subtask.id}`}>Completed</Label>
                    </div>
                    <DatePicker
                      date={subtask.dueDate}
                      setDate={(date) => updateSubtask(subtask.id, { dueDate: date })}
                    />
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="notifications"
                        checked={subtask.notification}
                        onCheckedChange={(checked) => updateSubtask(subtask.id, { notification: checked })}
                      />
                      <Label htmlFor="notifications">Notification</Label>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSubtask(subtask.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSubtask} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Subtask
              </Button>
            </div>
            <Button type="submit" className="w-full">Update Goal</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}