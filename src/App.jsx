import './App.css'
import CaesarCipher from "./components/CaesarCipher";
import VigenereCipher from "./components/VigenereCipher";
import MonoalphabeticCipher from "./components/MonoalphabeticCipher";
import PlayfairCipher from "./components/PlayfairCipher";
import RailFenceCipher from "./components/RailFenceCipher";
import RSAComponent from "./components/RSAComponent";
// src/App.jsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <CaesarCipher />
      <VigenereCipher />
      <MonoalphabeticCipher />
      <PlayfairCipher />
      <RailFenceCipher />
      <RSAComponent />
    </div>
  );
}
export default App;
