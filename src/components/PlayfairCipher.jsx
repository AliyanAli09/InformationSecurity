import { useState } from "react";

const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // J is merged with I

const PlayfairCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const prepareKeyMatrix = (key) => {
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    let matrixKey = "";
    for (let ch of key + alphabet) {
      if (!matrixKey.includes(ch)) matrixKey += ch;
    }

    const matrix = [];
    for (let i = 0; i < 25; i += 5) {
      matrix.push(matrixKey.slice(i, i + 5).split(""));
    }

    return matrix;
  };

  const findPosition = (matrix, char) => {
    for (let row = 0; row < 5; row++) {
      const col = matrix[row].indexOf(char);
      if (col !== -1) return [row, col];
    }
    return [-1, -1];
  };

  const processText = (input) => {
    let clean = input.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    let pairs = [];
    for (let i = 0; i < clean.length; i += 2) {
      let a = clean[i];
      let b = clean[i + 1] || "X";
      if (a === b) {
        pairs.push([a, "X"]);
        i--;
      } else {
        pairs.push([a, b]);
      }
    }
    return pairs;
  };

  const encrypt = () => {
    const matrix = prepareKeyMatrix(key);
    const pairs = processText(text);
    let encrypted = "";

    for (let [a, b] of pairs) {
      const [rowA, colA] = findPosition(matrix, a);
      const [rowB, colB] = findPosition(matrix, b);

      if (rowA === rowB) {
        encrypted += matrix[rowA][(colA + 1) % 5];
        encrypted += matrix[rowB][(colB + 1) % 5];
      } else if (colA === colB) {
        encrypted += matrix[(rowA + 1) % 5][colA];
        encrypted += matrix[(rowB + 1) % 5][colB];
      } else {
        encrypted += matrix[rowA][colB];
        encrypted += matrix[rowB][colA];
      }
    }

    setResult(encrypted);
  };

  const decrypt = () => {
    const matrix = prepareKeyMatrix(key);
    const pairs = processText(text);
    let decrypted = "";
  
    for (let [a, b] of pairs) {
      const [rowA, colA] = findPosition(matrix, a);
      const [rowB, colB] = findPosition(matrix, b);
  
      if (rowA === rowB) {
        decrypted += matrix[rowA][(colA + 4) % 5];
        decrypted += matrix[rowB][(colB + 4) % 5];
      } else if (colA === colB) {
        decrypted += matrix[(rowA + 4) % 5][colA];
        decrypted += matrix[(rowB + 4) % 5][colB];
      } else {
        decrypted += matrix[rowA][colB];
        decrypted += matrix[rowB][colA];
      }
    }
  
    // 🧼 Clean the decrypted result
    const cleanDecryptedText = (text) => {
      // Remove filler X between repeated letters (like LXL → LL)
      text = text.replace(/([A-Z])X\1/g, "$1$1");
  
      // Remove trailing X if it looks like a padding character
      return text.endsWith("X") ? text.slice(0, -1) : text;
    };
  
    setResult(cleanDecryptedText(decrypted));
  };
  

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
        Playfair Cipher 🧩
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
          placeholder="Enter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <div className="flex gap-4 justify-center">
          <button
            onClick={encrypt}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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

export default PlayfairCipher;
