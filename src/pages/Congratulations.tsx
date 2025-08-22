import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Particles } from '@/components/Particles';
import { Fireworks } from '@/components/Fireworks';
import { Timeline } from '@/components/Timeline';

export default function Congratulations() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [friendName, setFriendName] = useState('Amazing Friend');

  useEffect(() => {
    // Auto-progress through sections
    const timers = [
      setTimeout(() => setCurrentSection(1), 3000), // Show "Finally, you did it!"
      setTimeout(() => setCurrentSection(2), 6000), // Show timeline
      setTimeout(() => {
        setCurrentSection(3);
        setShowFireworks(true);
      }, 12000), // Show celebration
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const restartAnimation = () => {
    setCurrentSection(0);
    setShowFireworks(false);
    
    const timers = [
      setTimeout(() => setCurrentSection(1), 3000),
      setTimeout(() => setCurrentSection(2), 6000),
      setTimeout(() => {
        setCurrentSection(3);
        setShowFireworks(true);
      }, 12000),
    ];

    return () => timers.forEach(clearTimeout);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Particles />
      <Fireworks isActive={showFireworks} />
      
      {/* Opening Screen */}
      {currentSection >= 0 && (
        <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in-up">
              <p className="text-2xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-relaxed font-light">
                From sleepless nights, endless coding,<br />
                and countless retries...
              </p>
            </div>
            
            {currentSection >= 1 && (
              <div className="scale-in">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold celebration-text glow-pulse mb-8">
                  Finally, you did it!
                </h1>
                <div className="w-32 h-1 bg-gradient-celebration mx-auto rounded-full shadow-glow-primary" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {currentSection >= 2 && (
        <Timeline isVisible={currentSection >= 2} />
      )}

      {/* Celebration Section */}
      {currentSection >= 3 && (
        <>
          <section className="py-20 px-4 text-center relative z-10 fade-in-up">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold celebration-text glow-pulse mb-8">
                Congratulations {friendName}!<br />
                You Did It 🚀
              </h1>
              
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-muted/50 mb-12">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                  Your hard work, resilience, and determination inspire me every day. 
                  This achievement is just the beginning of your amazing journey. 
                  I'm so proud of you 💙
                </p>
              </div>
            </div>
          </section>

          {/* Inspiring Quote Section */}
          <section className="py-20 px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-2xl md:text-4xl font-light italic success-text mb-8">
                "Dreams don't work unless you do – and you proved it."
              </blockquote>
              
              <Button 
                onClick={restartAnimation}
                variant="celebration"
                size="lg"
                className="text-xl px-8 py-6"
              >
                🎉 Celebrate Again
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}