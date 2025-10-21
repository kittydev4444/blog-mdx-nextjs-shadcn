"use client";

export function BuyMeCoffee() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://www.buymeacoffee.com/SifvZUPOTV"
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:scale-105 transition-transform duration-200 drop-shadow-lg hover:drop-shadow-xl">
        <img
          src="https://img.buymeacoffee.com/button-api/?text=Buy me a catfee&emoji=😾&slug=SifvZUPOTV&button_colour=40DCA5&font_colour=ffffff&font_family=Comic&outline_colour=000000&coffee_colour=FFDD00"
          alt="Buy me a catfee"
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}