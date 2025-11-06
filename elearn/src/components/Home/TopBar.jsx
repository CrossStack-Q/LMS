import React from "react";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center py-1 mb-2">
      <div className="flex items-center gap-2 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search teachers..."
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-lg">Notification</div>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          Avatar
        </div>
      </div>
    </div>
  );
};

export default TopBar;
