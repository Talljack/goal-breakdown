"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Goal Breakdown
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/goals/overview" className="text-muted-foreground hover:text-foreground">
            My Goals
          </Link>
          <Link href="/goals" className="text-muted-foreground hover:text-foreground">
            Set New Goal
          </Link>
          <ModeToggle />
        </nav>
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/goals/overview" className="text-muted-foreground hover:text-foreground">
                  My Goals
                </Link>
                <Link href="/goals" className="text-muted-foreground hover:text-foreground">
                  Set New Goal
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}