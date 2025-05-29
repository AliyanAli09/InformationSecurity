// src/components/CaesarCipher.jsx
import { useState } from "react";

const CaesarCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState(0);
  const [result, setResult] = useState("");

  const encrypt = () => {
    let res = "";
    for (let char of text.toUpperCase()) {
      if (char >= "A" && char <= "Z") {
        let shifted = ((char.charCodeAt(0) - 65 + Number(key)) % 26) + 65;
        res += String.fromCharCode(shifted);
      } else {
        res += char;
      }
    }
    setResult(res);
  };

  const decrypt = () => {
    let res = "";
    for (let char of text.toUpperCase()) {
      if (char >= "A" && char <= "Z") {
        let shifted = ((char.charCodeAt(0) - 65 - Number(key) + 26) % 26) + 65;
        res += String.fromCharCode(shifted);
      } else {
        res += char;
      }
    }
    setResult(res);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-600">
        Caesar Cipher 🔐
      </h2>
      <div className="space-y-4">
        <textarea
          rows="4"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter your text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter key (e.g. 3)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <div className="flex gap-4 justify-center">
          <button
            onClick={encrypt}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
          >
            Encrypt
          </button>
          <button
            onClick={decrypt}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Decrypt
          </button>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">Result:</h3>
          <div className="border border-gray-300 p-3 rounded bg-gray-50 mt-2">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaesarCipher;
