'use client';

import { Button } from '@/components/ui/button';
import { Plus, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface HeaderProps {
  onCreateTask: () => void;
}

export function Header({ onCreateTask }: HeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button onClick={onCreateTask} className="gap-2">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}