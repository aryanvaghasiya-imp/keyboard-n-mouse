import { useState, useEffect } from "react";
import keyboardHero from "@/assets/keyboard-hero.jpg";

export const GamingHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Hero Content */}
        <div className={`space-y-8 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-8xl font-orbitron font-black text-glow pulse-glow">
              OPTIMUS
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground font-medium max-w-md">
              Level up your gaming with RGB perfection ✨
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl text-accent-glow font-orbitron font-bold">
              GAMER BACCHII ❤
            </h2>
            <p className="text-lg text-foreground/80 max-w-lg leading-relaxed">
              Experience mechanical precision with RGB lighting, anti-ghosting technology, 
              and dedicated media controls. Built for gamers who demand perfection 🎮
              <br/>
              Let's don't lose hope! & fight for more hmmm :)
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-accent-glow">42~</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-accent-glow">18930~</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-accent-glow">2-07-2025</div>
              <div className="text-sm text-muted-foreground">Joined</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className={`relative ${isLoaded ? 'animate-scaleIn' : 'opacity-0'} delay-300`}>
          <div className="relative float-animation">
            <img 
              src={keyboardHero} 
              alt="Zebronics Optimus Gaming Keyboard"
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 30px rgba(108, 0, 255, 0.5))' }}
            />
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-secondary rounded-full animate-pulse delay-1000"></div>
          </div>

          {/* Gaming Tags */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
            <span className="gaming-card px-5 py-2 text-sm font-orbitron font-semibold">
              NOOBDI 👻
            </span>
            <span className="gaming-card px-5 py-2 text-sm font-orbitron font-semibold">
              GADHEDII 𓃘
            </span>
            <span className="gaming-card px-5 py-2 text-sm font-orbitron font-semibold">
              GUNDII 🔧
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};