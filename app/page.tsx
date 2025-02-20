"use client";

import { TowerControl as GameController, Power, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSoundEffect } from "@/hooks/use-sound-effect";
import ABButton from "@/components/ui/ab-button";
import Init1 from "@/components/monitor-screen/init-1";
import Init2 from "@/components/monitor-screen/init-2";
import Init3 from "@/components/monitor-screen/init-3";
import { PortfolioItem } from "@/types";
import PortfolioScreen from "@/components/monitor-screen/portfolio-screen";

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "AI Selector",
    description: "Geminiが物事を独断と偏見で決めてくれるアプリ",
    image: "/AI_Selector.png",
    url: "https://gemini-selection.vercel.app/home"
  },
  {
    id: 2,
    title: "Spotify プレイリスト作成アプリ",
    description: "アーティスト選ぶだけで人気曲を一気に追加してプレイリストを作成できます。\n※APIの都合上、作成者以外は検索しかできません。",
    image: "/Spotify.png",
    url: "https://playlister-x.vercel.app/"
  },
  {
    id: 3,
    title: "Notion 英単語アプリ",
    description: "Notionのデータベースと連携して英単語がランダムに出現します。",
    image: "/English.png", 
    url: "https://notion-english-wordbook.vercel.app/"
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
      const timer1 = setTimeout(() => setBootPhase(2), 1000);
      const timer2 = setTimeout(() => setBootPhase(3), 2000);
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
        <Init1 />
      case 2:
        <Init2 />
      case 3:
        <Init3 />
      case 4:
        <PortfolioScreen showText={showText} portfolioItems={portfolioItems} selectedIndex={selectedIndex}/>
      default:
        return <div className="absolute inset-0 bg-black" />;
    }
  };

  return (
    <>
      <div className="scanlines" />
      <main className="min-h-screen p-4 sm:p-8">
        <div className="max-w-full sm:max-w-4xl mx-auto">
          <div className="gba-screen-frame p-4 sm:p-8">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <h1 className="text-[#9BBC0F] text-xl sm:text-2xl tracking-wider">PORTFOLIO</h1>
              <button
                onClick={() => setIsOn(!isOn)}
                className="gba-button p-3 sm:p-4 hover:opacity-90 transition-opacity"
              >
                <Power className="w-5 h-5 sm:w-6 sm:h-6 text-[#8F7FD4]" />
              </button>
            </div>

            {/* Screen Section */}
            <div className="bg-black p-2 sm:p-4 pixel-corners mb-4 sm:mb-8">
              <div className="border-4 border-[#4A3B78] p-4 sm:p-6 h-[400px] sm:h-[540px] relative overflow-hidden">
                {renderBootScreen()}
              </div>
            </div>

            {/* Controller Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div className="gba-dpad p-4 pixel-corners">
                <div className="flex justify-center items-center h-20 sm:h-24">
                  <div className="grid grid-cols-3 gap-2 w-16 sm:w-20 h-16 sm:h-20">
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
                <div className="grid grid-cols-2 gap-4 h-20 sm:h-24 place-content-center">
                  <ABButton label="A" onClick={handleSelect}/>
                  <ABButton label="B" onClick={handleSelect}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
