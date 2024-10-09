"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@/components/ui/date-picker';

interface Subtask {
  id: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
  notification: boolean
}

interface Goal {
  id: string;
  description: string;
  subtasks: Subtask[];
}

export default function GoalsPage() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal>({
    id: '',
    description: '',
    subtasks: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.description && goal.subtasks.length > 0) {
      const newGoal = { ...goal, id: Date.now().toString() };
      const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
      localStorage.setItem('goals', JSON.stringify([...existingGoals, newGoal]));
      router.push('/goals/overview');
    }
  };

  const addSubtask = () => {
    setGoal(prevGoal => ({
      ...prevGoal,
      subtasks: [...prevGoal.subtasks, { 
        id: Date.now().toString(), 
        description: '', 
        notification: true,
        completed: false,
        dueDate: null
      }]
    }));
  };

  const updateSubtask = (id: string, updates: Partial<Subtask>) => {
    setGoal(prevGoal => ({
      ...prevGoal,
      subtasks: prevGoal.subtasks.map(subtask =>
        subtask.id === id ? { ...subtask, ...updates } : subtask
      )
    }));
  };

  const removeSubtask = (id: string) => {
    setGoal(prevGoal => ({
      ...prevGoal,
      subtasks: prevGoal.subtasks.filter(subtask => subtask.id !== id)
    }));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Set Your Goal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Goal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="goal-description">What's your goal?</Label>
              <Input
                id="goal-description"
                value={goal.description}
                onChange={(e) => setGoal({...goal, description: e.target.value})}
                placeholder="e.g., Complete a web development project"
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
            <Button type="submit" className="w-full">Set Goal</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}