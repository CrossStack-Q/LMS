import React from "react";

export default function MessageRequestModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-96 p-6 shadow-xl">
        <h2 className="text-xl font-semibold">Message request</h2>
        <p className="text-sm text-gray-600 mt-2">
          Your first message will be treated as a request until the mentor
          accepts.
        </p>

        <textarea
          className="w-full mt-4 border rounded-lg p-3 h-28 text-sm"
          placeholder="Introduce yourself and give a reason for your request"
        ></textarea>

        <button
          className="w-full bg-teal-700 text-white py-2 rounded-lg mt-4"
          onClick={onClose}
        >
          Send message
        </button>
      </div>
    </div>
  );
}
