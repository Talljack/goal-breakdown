import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Rocket, Target, ArrowRight, Bell, BarChart } from 'lucide-react';
import Header from '@/components/header';
import NewsletterSubscription from '@/components/newsletter-subscription';
import DemoVideo from '@/components/demo-video';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              Transform Your Goals into{' '}
              <span className="text-primary">Achievable Milestones</span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Break down ambitious goals, track progress, and stay motivated with personalized reminders. Your journey to success starts here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/goals">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <DemoVideo />
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">How Goal Breakdown Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Target className="h-12 w-12 text-primary" />}
                title="Set Smart Goals"
                description="Define your ambitions with our intuitive goal-setting interface. Specify deadlines and milestones with ease."
              />
              <FeatureCard
                icon={<Bell className="h-12 w-12 text-primary" />}
                title="Stay on Track"
                description="Receive personalized reminders based on your preferences. Never lose sight of your objectives."
              />
              <FeatureCard
                icon={<BarChart className="h-12 w-12 text-primary" />}
                title="Visualize Progress"
                description="Track your journey with interactive charts and celebrate every milestone achieved."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-muted">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Achieve More?</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of goal-setters who are turning their dreams into reality.
            </p>
            <Link href="/goals">
              <Button size="lg">
                Create Your First Goal
              </Button>
            </Link>
          </div>
        </section>

        <NewsletterSubscription />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © 2023 Goal Breakdown. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}