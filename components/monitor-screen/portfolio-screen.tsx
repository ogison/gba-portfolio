import { PortfolioItem } from "@/types";

interface Props {
  showText: boolean
  portfolioItems:PortfolioItem[]
  selectedIndex:number
}

const PortfolioScreen = ({showText, portfolioItems,selectedIndex }: Props) => {
  return (
    <div className="text-center w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
      {showText && (
        <div className="space-y-4 fade-in">
          <h2 className="text-[#9BBC0F] text-lg sm:text-xl mb-4">PROJECTS</h2>
          <div className="relative">
            <div className="bg-[#1E1B2E] p-4 sm:p-6 pixel-corners">
              <div className="aspect-video mb-4 overflow-hidden w-full max-w-[400px] mx-auto">
                <img
                  src={portfolioItems[selectedIndex].image}
                  alt={portfolioItems[selectedIndex].title}
                  className="w-full h-full object-cover pixel-image"
                />
              </div>
              <h3 className="text-[#8F7FD4] mb-4 text-sm sm:text-base">{portfolioItems[selectedIndex].title}</h3>
              <p className="text-[#9BBC0F] text-xs sm:text-sm whitespace-pre-line">{portfolioItems[selectedIndex].description}</p>
              <div className="mt-4 flex justify-center space-x-4">
                <span className="text-[#8F7FD4] text-sm">
                  {selectedIndex + 1} / {portfolioItems.length}
                </span>
              </div>
            </div>
            <p className="blink mt-4 text-[#9BBC0F] text-xs sm:text-sm">{"<・>: Navigate | PRESS A・B: Open Project"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioScreen;

