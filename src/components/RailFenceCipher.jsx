import React, { useState } from "react";

const RailFenceCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState(3);
  const [result, setResult] = useState("");

  const encryptRailFence = (text, key) => {
    if (key <= 1) return text;

    const rail = Array.from({ length: key }, () => []);
    let row = 0, direction = 1;

    for (let char of text) {
      rail[row].push(char);

      if (row === 0) direction = 1;
      else if (row === key - 1) direction = -1;

      row += direction;
    }

    return rail.flat().join('');
  };

  const decryptRailFence = (cipher, key) => {
    if (key <= 1) return cipher;

    const length = cipher.length;
    const rail = Array.from({ length: key }, () => Array(length).fill('\n'));

    let row = 0, direction = 1;

    // Mark the pattern
    for (let i = 0; i < length; i++) {
      rail[row][i] = '*';

      if (row === 0) direction = 1;
      else if (row === key - 1) direction = -1;

      row += direction;
    }

    // Fill the pattern with ciphertext
    let index = 0;
    for (let r = 0; r < key; r++) {
      for (let c = 0; c < length; c++) {
        if (rail[r][c] === '*' && index < cipher.length) {
          rail[r][c] = cipher[index++];
        }
      }
    }

    // Read in zigzag
    row = 0;
    direction = 1;
    let result = "";

    for (let i = 0; i < length; i++) {
      result += rail[row][i];

      if (row === 0) direction = 1;
      else if (row === key - 1) direction = -1;

      row += direction;
    }

    return result;
  };

  const encrypt = () => {
    const cleanText = text.replace(/[^A-Za-z]/g, "").toUpperCase();
    setResult(encryptRailFence(cleanText, parseInt(key)));
  };

  const decrypt = () => {
    const cleanText = text.replace(/[^A-Za-z]/g, "").toUpperCase();
    setResult(decryptRailFence(cleanText, parseInt(key)));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Rail Fence Cipher 🚆
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
      />

      <input
        type="number"
        value={key}
        min={2}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter key (number of rails)"
        className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-4 mb-4 justify-center">
        <button
          onClick={encrypt}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Encrypt
        </button>
        <button
          onClick={decrypt}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Decrypt
        </button>
      </div>

      <div>
        <strong>Result:</strong>
        <div className="mt-2 p-3 border rounded-lg bg-gray-100 text-gray-800 break-all">
          {result}
        </div>
      </div>
    </div>
  );
};

export default RailFenceCipher;
