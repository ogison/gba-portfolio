"use client";

import { TowerControl as GameController, Power, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSoundEffect } from "@/hooks/use-sound-effect";

const portfolioItems = [
  {
    id: 1,
    title: "ウェブアプリ",
    description: "React/Next.jsを使用したモダンなウェブアプリケーション開発",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=300",
    url: "https://github.com/yourusername/web-projects"
  },
  {
    id: 2,
    title: "モバイルアプリ",
    description: "React Nativeを使用したクロスプラットフォームアプリ開発",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=400&h=300",
    url: "https://github.com/yourusername/mobile-projects"
  },
  {
    id: 3,
    title: "ゲーム開発",
    description: "Unityを使用した2D/3Dゲーム開発",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400&h=300",
    url: "https://github.com/yourusername/game-projects"
  },
];

export default function Home() {
  const [isOn, setIsOn] = useState(false);
  const [showText, setShowText] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bootPhase, setBootPhase] = useState(0);
  const { playBeep, playStartupSound } = useSoundEffect();

  useEffect(() => {
    if (isOn) {
      playStartupSound();
      setBootPhase(1);
      const timer1 = setTimeout(() => {
        setBootPhase(2);
      }, 1000);
      const timer2 = setTimeout(() => {
        setBootPhase(3);
      }, 2000);
      const timer3 = setTimeout(() => {
        setBootPhase(4);
        setShowText(true);
      }, 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setShowText(false);
      setBootPhase(0);
    }
  }, [isOn, playStartupSound]);

  const handlePrevious = () => {
    playBeep();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : portfolioItems.length - 1));
  };

  const handleNext = () => {
    playBeep();
    setSelectedIndex((prev) => (prev < portfolioItems.length - 1 ? prev + 1 : 0));
  };

  const handleSelect = () => {
    playBeep();
    window.open(portfolioItems[selectedIndex].url, '_blank');
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isOn || !showText) return;

      if (event.key === 'a' || event.key === 'A') {
        handlePrevious();
      } else if (event.key === 'b' || event.key === 'B') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOn, showText]);

  const renderBootScreen = () => {
    if (!isOn) return <div className="absolute inset-0 bg-black" />;

    switch (bootPhase) {
      case 1:
        return (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-[#8F7FD4] text-base sm:text-xl power-on">
              POWER ON
            </div>
          </div>
        );
      case 2:
        return (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-[#9BBC0F] text-xs sm:text-sm fade-in font-mono">
              INITIALIZING...
            </div>
          </div>
        );
      case 3:
        return (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div 
              className="text-[#9BBC0F] text-base sm:text-xl glitch"
              data-text="PORTFOLIO"
            >
              PORTFOLIO
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center w-[640px] mx-auto">
            {showText && (
              <div className="space-y-4 fade-in">
                <h2 className="text-[#9BBC0F] text-xl mb-4">PROJECTS</h2>
                <div className="relative">
                  <div className="bg-[#1E1B2E] p-6 pixel-corners">
                    <div className="aspect-video mb-4 overflow-hidden w-[400px] mx-auto">
                      <img
                        src={portfolioItems[selectedIndex].image}
                        alt={portfolioItems[selectedIndex].title}
                        className="w-full h-full object-cover pixel-image"
                      />
                    </div>
                    <h3 className="text-[#8F7FD4] mb-4 text-base">{portfolioItems[selectedIndex].title}</h3>
                    <p className="text-[#9BBC0F] text-sm">{portfolioItems[selectedIndex].description}</p>
                    <div className="mt-4 flex justify-center space-x-4">
                      <span className="text-[#8F7FD4] text-sm">
                        {selectedIndex + 1} / {portfolioItems.length}
                      </span>
                    </div>
                  </div>
                  <p className="blink mt-4 text-[#9BBC0F] text-sm">A・B: Navigate | PRESS START: Open Project</p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <div className="absolute inset-0 bg-black" />;
    }
  };

  return (
    <>
      <div className="scanlines" />
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="gba-screen-frame p-8">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-[#9BBC0F] text-2xl tracking-wider">PORTFOLIO</h1>
              <button
                onClick={() => setIsOn(!isOn)}
                className="gba-button p-4 hover:opacity-90 transition-opacity"
              >
                <Power className="w-6 h-6 text-[#8F7FD4]" />
              </button>
            </div>

            {/* Screen Section */}
            <div className="bg-black p-4 pixel-corners mb-8">
              <div className="border-4 border-[#4A3B78] p-6 h-[480px] relative overflow-hidden">
                {renderBootScreen()}
              </div>
            </div>

            {/* Controller Section */}
            <div className="grid grid-cols-2 gap-8">
              <div className="gba-dpad p-4 pixel-corners">
                <div className="flex justify-center items-center h-24">
                  <div className="grid grid-cols-3 gap-2 w-20 h-20">
                    <div className="col-start-2">
                      <button
                        onClick={handlePrevious}
                        className="w-full h-full bg-[#1E1B2E] hover:bg-[#2E2B3E] transition-colors flex items-center justify-center"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#8F7FD4]" />
                      </button>
                    </div>
                    <div className="col-start-3">
                      <button
                        onClick={handleNext}
                        className="w-full h-full bg-[#1E1B2E] hover:bg-[#2E2B3E] transition-colors flex items-center justify-center"
                      >
                        <ChevronRight className="w-4 h-4 text-[#8F7FD4]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gba-dpad p-4 pixel-corners">
                <div className="grid grid-cols-3 gap-4 h-24 place-content-center">
                  <button
                    onClick={handlePrevious}
                    className="gba-button p-4 text-[#9BBC0F] hover:opacity-90 transition-opacity"
                  >
                    A
                  </button>
                  <button
                    onClick={handleSelect}
                    className="bg-[#8F7FD4] p-4 rounded text-[#1E1B2E] hover:opacity-90 transition-opacity"
                  >
                    START
                  </button>
                  <button
                    onClick={handleNext}
                    className="gba-button p-4 text-[#9BBC0F] hover:opacity-90 transition-opacity"
                  >
                    B
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}