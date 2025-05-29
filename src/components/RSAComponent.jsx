import React, { useState } from "react";

const RSAComponent = () => {
  const [p, setP] = useState(3);
  const [q, setQ] = useState(11);
  const [e, setE] = useState(7);
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const modInverse = (e, phi) => {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;

    while (e > 1) {
      q = Math.floor(e / phi);
      t = phi;

      phi = e % phi;
      e = t;
      t = x0;

      x0 = x1 - q * x0;
      x1 = t;
    }

    if (x1 < 0) x1 += m0;

    return x1;
  };

  const modPow = (base, exponent, mod) => {
    let result = 1;
    base = base % mod;
    while (exponent > 0) {
      if (exponent % 2 === 1) result = (result * base) % mod;
      exponent = Math.floor(exponent / 2);
      base = (base * base) % mod;
    }
    return result;
  };

  const encrypt = () => {
    const n = p * q; // modulus (part of both public and private keys)
    const phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
      alert("e must be coprime with φ(n)");
      return;
    }

    // PUBLIC KEY = (e, n)
    // Encrypt message chars using public key
    const msgCodes = message.split("").map((char) => char.charCodeAt(0));
    const cipherCodes = msgCodes.map((m) => modPow(m, e, n));
    setEncrypted(cipherCodes.join(" "));
  };

  const decrypt = () => {
    const n = p * q; // modulus (part of both keys)
    const phi = (p - 1) * (q - 1);

    // PRIVATE KEY = (d, n), where d is modular inverse of e mod phi
    const d = modInverse(e, phi);

    const cipherCodes = encrypted.split(" ").map(Number);
    const msgCodes = cipherCodes.map((c) => modPow(c, d, n));
    const plainText = msgCodes.map((m) => String.fromCharCode(m)).join("");
    setDecrypted(plainText);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">
        RSA Cipher 🔐
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          value={p}
          onChange={(e) => setP(parseInt(e.target.value))}
          placeholder="Prime p"
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          value={q}
          onChange={(e) => setQ(parseInt(e.target.value))}
          placeholder="Prime q"
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          value={e}
          onChange={(e) => setE(parseInt(e.target.value))}
          placeholder="Public key exponent e"
          className="p-2 border rounded-lg col-span-2"
        />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <p><strong>Public Key:</strong> (e, n) where n = p × q</p>
        <p><strong>Private Key:</strong> (d, n) where d = modular inverse of e mod φ(n)</p>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to encrypt"
        className="w-full p-3 border rounded-lg mb-4"
        rows={3}
      />

      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={encrypt}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Encrypt
        </button>
        <button
          onClick={decrypt}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Decrypt
        </button>
      </div>

      {encrypted && (
        <div className="mb-3">
          <strong>Encrypted (as numbers):</strong>
          <div className="p-2 bg-gray-100 rounded-md mt-1 break-all">{encrypted}</div>
        </div>
      )}

      {decrypted && (
        <div>
          <strong>Decrypted Message:</strong>
          <div className="p-2 bg-green-100 rounded-md mt-1">{decrypted}</div>
        </div>
      )}
    </div>
  );
};

export default RSAComponent;
