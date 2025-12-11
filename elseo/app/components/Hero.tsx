import SearchBar from "./SearchBar";

export default function Hero({text,desc,author,rating,level ,search}) {
  return (
    <header className="w-full bg-grid ">
      <div className=" mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* left */}
          <div className="md:col-span-8">
            <h1 className="text-6xl md:text-7xl font-semibold leading-[1.05]">
              {text}
            </h1>

            <p className="mt-4 text-2xl text-(--gray-500) font-medium">
              {desc}
            </p>

            <div className="flex gap-4">
            <p className="mt-4 text-(--gray-500)">by {author}</p>
            {rating && <p className="mt-4 text-(--gray-500)">{rating}</p>}
            {level && <p className="mt-4 text-(--gray-500)">{level}</p>}
            </div>

            {search && 
            <div className="mt-8">
              <SearchBar button />
            </div>
}
          </div>

          {/* right: image box — hide on mobile */}
          <div className="md:col-span-4 hidden md:flex justify-end">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-white border border-subtle rounded-md flex items-center justify-center shadow-sm">
              {/* placeholder; replace with next/image if you have an svg */}
              <div className="text-center">
                <div className="text-6xl">🧠</div>
                <div className="text-3xl font-bold text-(--primary-green)">UX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
