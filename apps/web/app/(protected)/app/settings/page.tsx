"use client";

import React, { useState, useEffect } from "react";

const CURRENCY_OPTIONS = ["USD", "INR"];
const THEME_OPTIONS = ["light", "dark"];
const PRIVACY_OPTIONS = ["public", "private"];

export default function SettingsPage() {
  // Initialize from localStorage or defaults
  const [currency, setCurrency] = useState(() => localStorage.getItem("currency") || "USD");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [privacy, setPrivacy] = useState(() => localStorage.getItem("privacy") || "public");

  // Sync localStorage
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("privacy", privacy);
  }, [privacy]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Currency */}
      <div>
        <label htmlFor="currency-select" className="block mb-1 font-semibold">
          Currency
        </label>
        <select
          id="currency-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {CURRENCY_OPTIONS.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-600">
          Choose your preferred currency for displaying prices and transactions.
        </p>
      </div>

      {/* Privacy */}
      <div>
        <label htmlFor="privacy-select" className="block mb-1 font-semibold">
          Privacy
        </label>
        <select
          id="privacy-select"
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {PRIVACY_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-600">
          Select whether your profile and activity are visible publicly or private to yourself.
        </p>
      </div>

      {/* Theme */}
      <div>
        <label htmlFor="theme-select" className="block mb-1 font-semibold">
          Theme
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {THEME_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-600">
          Choose between Light and Dark themes for comfortable viewing.
        </p>
      </div>
    </div>
  );
}
