import SearchBar from "./SearchBar";

export type HeroProps = {
  text: string;
  desc?: string;
  author?: string;
  rating?: string;
  level?: string;
  search?: boolean;
  isImage?: boolean;
  createTopic?: boolean;
  imageURL?:string;
  imageText?:string;
  onCreateTopic?: () => void;
};

export default function Hero({
  text,
  desc,
  author,
  rating,
  level,
  imageText,
  imageURL,
  search = false,
  isImage = false,
  createTopic = false,
  onCreateTopic,
}: HeroProps) {
  return (
    <header className="w-full bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">

          {/* LEFT CONTENT */}
          <div className={isImage ? "md:col-span-8" : "md:col-span-12"}>
            <h1
              className="
                text-4xl 
                sm:text-5xl 
                md:text-6xl 
                lg:text-7xl 
                font-semibold 
                leading-tight
              "
              dangerouslySetInnerHTML={{ __html: text }}
            />

            {desc && (
              <p className="mt-4 max-w-2xl text-lg sm:text-xl md:text-2xl text-(--gray-500) font-medium">
                {desc}
              </p>
            )}

            {/* META + ACTIONS */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-(--gray-500)">
              {author && <span>by {author}</span>}
              {rating && <span>{rating}</span>}
              {level && <span>{level}</span>}
            </div>

            {createTopic && (
              <button
                onClick={onCreateTopic}
                className="
                  mt-8 
                  inline-flex 
                  items-center 
                  justify-center
                  px-10 sm:px-14 
                  py-3 sm:py-4 
                  text-base sm:text-lg
                  bg-(--primary-green) 
                  border border-(--gray-500) 
                  cursor-pointer
                "
              >
                + Create Topic
              </button>
            )}

            {search && (
              <div className="mt-8 max-w-xl">
                <SearchBar button />
              </div>
            )}
          </div>

          {/* RIGHT IMAGE / CARD */}
          {isImage && !imageURL && (
            <div className="hidden md:flex md:col-span-4 justify-end">
              <div className="
                w-64 h-64 
                lg:w-80 lg:h-80
                rounded-md 
                flex items-center justify-center 
                shadow-sm
                bg-white
                border border-(--gray-500)
              ">
                <div className="text-center">
                  {/* <div className="text-6xl">🧠</div> */}
                  <div className="text-4xl lg:text-7xl font-bold text-(--primary-green)">
                    {imageText}
                  </div>
                </div>
              </div>
            </div>
          )}
          {isImage&& imageURL && (
  <div className="hidden md:flex md:col-span-4">
    <div
      className="
        relative
        w-full
        h-auto
        bg-white
        border border-(--gray-500)
        rounded-md
        shadow-sm
      "
    >
      <img
        src={imageURL}
        alt=""
        className="
        "
      />
    </div>
  </div>
)}

        </div>
      </div>
    </header>
  );
}
