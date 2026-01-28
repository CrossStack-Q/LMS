"use client";

import { useState } from "react";

export default function TeacherAuthPage() {
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    alert(`Teacher login/signup logic → Email: ${email}`);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Teacher Login</h2>
        <p className="text-gray-600 mb-6">Login or sign up with your email.</p>

        <input
          type="email"
          placeholder="Enter teacher email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={handleContinue}
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
        >
          Continue
        </button>

        <p className="text-center mt-4 text-sm text-gray-500">
          Student?{" "}
          <a href="/auth" className="text-purple-600">
            Go to Student Login
          </a>
        </p>
      </div>
    </div>
  );
}
