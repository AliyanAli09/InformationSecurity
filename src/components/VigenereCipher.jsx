import { useState } from "react";

const VigenereCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const formatKey = (str, key) => {
    key = key.toUpperCase();
    let newKey = "";
    let j = 0;
    for (let i = 0; i < str.length; i++) {
      if (/[A-Z]/.test(str[i])) {
        newKey += key[j % key.length];
        j++;
      } else {
        newKey += str[i];
      }
    }
    return newKey;
  };

  const encrypt = () => {
    const input = text.toUpperCase();
    const formattedKey = formatKey(input, key);
    let encrypted = "";

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (char >= "A" && char <= "Z") {
        const shift = formattedKey[i].charCodeAt(0) - 65;
        const encChar = String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        encrypted += encChar;
      } else {
        encrypted += char;
      }
    }
    setResult(encrypted);
  };

  const decrypt = () => {
    const input = text.toUpperCase();
    const formattedKey = formatKey(input, key);
    let decrypted = "";

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (char >= "A" && char <= "Z") {
        const shift = formattedKey[i].charCodeAt(0) - 65;
        const decChar = String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        decrypted += decChar;
      } else {
        decrypted += char;
      }
    }
    setResult(decrypted);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-4 text-purple-600">
        Vigenère Cipher 🔐
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
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter key (e.g. KEY)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <div className="flex gap-4 justify-center">
          <button
            onClick={encrypt}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
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

export default VigenereCipher;
