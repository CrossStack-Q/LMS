import React, { useState } from "react";

const TopBar2 = () => {
  const [isTeacherActive, setIsTeacherActive] = useState(false);
  const [sortOption, setSortOption] = useState("Most popular");

  const handleToggle = () => setIsTeacherActive(!isTeacherActive);

  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch py-1 mb-2 gap-4">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-between flex-1 rounded-2xl">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Teachers</h2>
          <p className="text-gray-600 text-sm mt-1">
            Search for specific subjects and find the teachers you take course with.
          </p>
        </div>

        <div className="mt-3">
          <input
            type="text"
            placeholder="Search teachers"
            className="border border-gray-300 rounded-xl p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-between flex-1 rounded-2xl">
        {/* Toggle Switch */}
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2 bg-purple-200 p-4 rounded-2xl">
            <button
              onClick={handleToggle}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                isTeacherActive ? "bg-purple-600" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  isTeacherActive ? "translate-x-5" : ""
                }`}
              ></div>
            </button>
            <span className="text-sm font-medium text-gray-800">
              Activate teacher account
            </span>
            <div className="text-gray-500 text-sm ml-1">?</div>
          </div>
        </div>

        {/* Sort + Filter + Bookmark */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 text-sm">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Most popular</option>
              <option>Price low → high</option>
              <option>Price high → low</option>
              <option>Highest rated</option>
            </select>
          </div>
          <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-500 bg-white">
            Filter
          </button>
          <button className="border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-500 bg-white">
            Bookmark
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar2;
