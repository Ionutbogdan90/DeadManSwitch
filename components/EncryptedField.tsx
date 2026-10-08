"use client";

import { useState } from "react";

export default function EncryptedField() {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");

  const encryptText = async () => {
    if (!text || !key) return;

    try {
      // Simple encryption using a basic XOR cipher for demonstration
      // In production, use proper encryption libraries
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const keyData = encoder.encode(key.padEnd(text.length, key));
      
      const encrypted = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++) {
        encrypted[i] = data[i] ^ keyData[i];
      }
      
      setEncryptedText(btoa(String.fromCharCode(...encrypted)));
    } catch (error) {
      console.error("Encryption failed:", error);
    }
  };

  const decryptText = async () => {
    if (!encryptedText || !key) return;

    try {
      const encrypted = new Uint8Array(
        atob(encryptedText).split("").map((c) => c.charCodeAt(0))
      );
      const keyData = new TextEncoder().encode(key);
      
      const decrypted = new Uint8Array(encrypted.length);
      for (let i = 0; i < encrypted.length; i++) {
        decrypted[i] = encrypted[i] ^ keyData[i % keyData.length];
      }
      
      const decoder = new TextDecoder();
      setText(decoder.decode(decrypted));
    } catch (error) {
      console.error("Decryption failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-200">Encrypted Text Field</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Encryption Key
          </label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter encryption key"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Text to Encrypt
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to encrypt"
            rows={3}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-200 resize-none"
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={encryptText}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 hover:scale-105 active:scale-95 border border-green-500/30"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Encrypt
            </span>
          </button>
          <button
            onClick={decryptText}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 border border-blue-500/30"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Decrypt
            </span>
          </button>
        </div>
        
        {encryptedText && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Encrypted Result
            </label>
            <div className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-sm font-mono break-all text-gray-300">
              {encryptedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}