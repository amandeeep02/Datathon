"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";

export function Landing() {
  const [error, setError] = useState("");
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Landing component mounted"); // Debug log
  }, []);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Button clicked"); 

    try {
      await loginWithGoogle();
      console.log("Google sign in successful");   
      navigate("/user-details"); 
    } catch (err) {
      setError("Failed to sign in with Google");
      console.error("Sign in error:", err);
    }
  };

  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Datathon
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Your AI assistant for daily tasks
        </p>
        <div>
          {error && (
            <div className="error text-red-500 text-center mb-4">{error}</div>
          )}
          <button
            className="bg-gradient-to-br relative z-20 from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-md cursor-pointer hover:opacity-90"
            onClick={handleGoogleSignIn}
            type="button"
            aria-label="Sign in with Google"
          >
            <div className="relative z-30">Sign in with Google</div>
            <BackgroundBeams />
          </button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
