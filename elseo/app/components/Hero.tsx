import SearchBar from "./SearchBar";

type HeroProps = {
  text: string;
  desc?: string;
  author?: string;
  rating?: string;
  level?: string;
  search?: boolean;
  isImage?: boolean;
  createTopic?: boolean;
  onCreateTopic?: () => void;
};

export default function Hero({
  text,
  desc,
  author,
  rating,
  level,
  search,
  isImage = false,
  createTopic = false,
  onCreateTopic,
}: HeroProps) {
  return (
    <header className="w-full bg-grid py-12">
      <div className="mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">

          {/* LEFT */}
          <div className={isImage ? "md:col-span-8" : "md:col-span-12"}>
            <h1
              className="text-6xl md:text-7xl font-semibold leading-[1.05]"
              dangerouslySetInnerHTML={{ __html: text }}
            />

            {desc && (
              <p className="mt-4 text-2xl text-(--gray-500) font-medium">
                {desc}
              </p>
            )}

            <div className="flex gap-4 flex-wrap items-center">
              {createTopic && (
                <button
                  onClick={onCreateTopic}
                  className="px-16 py-4 text-lg bg-(--primary-green) border border-(--gray-500) cursor-pointer mt-8"
                >
                  + Create Topic
                </button>
              )}

              {author && <p className="mt-8 text-(--gray-500)">by {author}</p>}
              {rating && <p className="mt-8 text-(--gray-500)">{rating}</p>}
              {level && <p className="mt-8 text-(--gray-500)">{level}</p>}
            </div>

            {search && (
              <div className="mt-8">
                <SearchBar button />
              </div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          {isImage && (
            <div className="md:col-span-4 hidden md:flex justify-end">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-white border border-(--gray-500) rounded-md flex items-center justify-center shadow-sm">
                <div className="text-center">
                  <div className="text-6xl">🧠</div>
                  <div className="text-3xl font-bold text-(--primary-green)">UX</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
