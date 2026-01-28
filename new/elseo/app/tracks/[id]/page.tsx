import { TrackTopics } from "@/lib/dummyTracksTopics";

const TrackTopic = () => {
  const currentIndex = TrackTopics.findIndex(
    (t) => t.is_completed === false
  );

  return (
    <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500) p-6 w-full">
      <p className="text-2xl mb-10">Introduction to Go</p>

      {/* Scroll container */}
      <div className="relative max-h-[calc(100vh-220px)] overflow-y-scroll hidescroll">
        
        {/* TIMELINE LIST */}
        <div className="relative pl-4">

          {/* CONTINUOUS SPINE */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-(--gray-300)" />

          <div className="space-y-10">
            {TrackTopics.map((topic, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;

              return (
                <div
                  key={topic.id}
                  className="grid grid-cols-[32px_1fr] gap-6"
                >
                  {/* SPINE COLUMN */}
                  <div className="flex justify-center z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${
                          isCompleted
                            ? "bg-(--primary-dark) text-white"
                            : isCurrent
                            ? "bg-white border-2 border-(--primary-dark) shadow-[0_0_0_6px_rgba(34,197,94,0.15)]"
                            : "bg-white border-2 border-(--gray-300)"
                        }
                      `}
                    >
                      {isCompleted && "✓"}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <p
                      className={`text-lg leading-8 cursor-pointer hover:font-semibold ${
                        isCompleted
                          ? "text-(--gray-500)"
                          : "text-(--gray-900)"
                      }`}
                    >
                      {topic.title}
                    </p>

                    {isCurrent && (
                      <div className="mt-4 space-y-3">
                        <div className="text-sm text-(--gray-600)">
                          ⏱ 15 min · 🔥 +5
                        </div>
                        <button className="bg-indigo-500 text-white px-6 py-2 rounded-md">
                          Continue →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackTopic;
