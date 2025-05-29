import { useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const MonoalphabeticCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const isValidKey = (key) => {
    const upperKey = key.toUpperCase();
    return (
      upperKey.length === 26 &&
      new Set(upperKey.split("")).size === 26 &&
      [...upperKey].every((ch) => alphabet.includes(ch))
    );
  };

  const encrypt = () => {
    if (!isValidKey(key)) return alert("Key must be a 26-letter unique alphabet sequence.");

    const upperText = text.toUpperCase();
    const upperKey = key.toUpperCase();
    const map = Object.fromEntries(alphabet.split("").map((char, i) => [char, upperKey[i]]));

    const encrypted = [...upperText]
      .map((ch) => (map[ch] ? map[ch] : ch))
      .join("");

    setResult(encrypted);
  };

  const decrypt = () => {
    if (!isValidKey(key)) return alert("Key must be a 26-letter unique alphabet sequence.");

    const upperText = text.toUpperCase();
    const upperKey = key.toUpperCase();
    const reverseMap = Object.fromEntries(upperKey.split("").map((char, i) => [char, alphabet[i]]));

    const decrypted = [...upperText]
      .map((ch) => (reverseMap[ch] ? reverseMap[ch] : ch))
      .join("");

    setResult(decrypted);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-4 text-green-600">
        Monoalphabetic Cipher 🔐
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
          className="w-full border border-gray-300 p-2 rounded uppercase"
          placeholder="Enter 26-letter key (e.g. QWERTYUIOPASDFGHJKLZXCVBNM)"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase())}
        />
        <div className="flex gap-4 justify-center">
          <button
            onClick={encrypt}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
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

export default MonoalphabeticCipher;
