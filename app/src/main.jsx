"use client";

import { useState } from "react";

const generateTree = (height, message = "") => {
  const decorations = ["*", "+", "⋆", "·", "°", "✦"];
  let tree = [];

  // 꼭대기 별
  tree.push("⭐");

  // 메시지 처리
  const letters = message.split("");
  const messageStartRow = Math.floor(height * 0.4); // 시작 위치를 조정
  let letterIndex = 0;

  // 트리 몸통
  for (let i = 0; i < height; i++) {
    let line = "";
    const lineLength = 2 * i + 1;
    const middleIndex = Math.floor(lineLength / 2);

    for (let j = 0; j < lineLength; j++) {
      // 트리 가장자리
      if (j === 0 || j === lineLength - 1) {
        line += "*";
      }
      // 메시지 글자 넣기 (가운데 정렬)
      else if (
        i >= messageStartRow &&
        i < messageStartRow + letters.length &&
        j === middleIndex &&
        letterIndex < letters.length
      ) {
        line += letters[letterIndex++];
      }
      // 장식 패턴
      else {
        // 리본과 반짝이의 출현 확률 높임
        if (Math.random() < 0.12) {
          line += "✨";
        } else if (Math.random() < 0.12) {
          line += "🎀";
        } else if (Math.random() < 0.7) {
          // 일반 장식 확률 높임
          line += decorations[Math.floor(Math.random() * decorations.length)];
        } else {
          line += " ";
        }
      }
    }
    tree.push(line);
  }

  // 트리 기둥
  tree.push("  [|]");
  tree.push("  [|]");

  // 받침대와 선물
  tree.push(" =====");
  tree.push("[🎁][🎁]");

  return tree;
};

export default function ChristmasTreeGenerator() {
  const [height, setHeight] = useState(15);
  const [message, setMessage] = useState("");
  const [tree, setTree] = useState(generateTree(15));

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value);
    setHeight(newHeight);
    setTree(generateTree(newHeight, message));
  };

  const handleMessageChange = (e) => {
    const newMessage = e.target.value.slice(0, 10);
    setMessage(newMessage);
    setTree(generateTree(height, newMessage));
  };

  const regenerateTree = () => {
    setTree(generateTree(height, message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">🎄</span>
          <h1 className="text-3xl font-bold text-center text-green-600">
            나만의 크리스마스 트리
          </h1>
          <span className="text-2xl">✨</span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            메시지 입력 (3-10자)
          </label>
          <input
            type="text"
            minLength={3}
            maxLength={10}
            value={message}
            onChange={handleMessageChange}
            placeholder="메시지를 입력하세요"
            className="w-full p-2 border border-gray-300 rounded-lg text-center"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            트리 높이 조절 (5-20)
          </label>
          <input
            type="range"
            min="5"
            max="20"
            value={height}
            onChange={handleHeightChange}
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center text-gray-600 mt-2">
            현재 높이: {height}
          </div>
        </div>

        <button
          onClick={regenerateTree}
          className="w-full mb-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          새로운 트리 생성하기 🎄
        </button>

        <div className="relative bg-gray-100 p-4 rounded-lg overflow-auto">
          <pre className="font-mono text-lg flex flex-col items-center justify-center">
            {tree.map((line, index) => (
              <div key={index} className="whitespace-pre">
                {line}
              </div>
            ))}
          </pre>
        </div>

        <p className="text-center mt-6 text-gray-600">
          즐거운 크리스마스 되세요! 🎄✨
        </p>
      </div>
    </div>
  );
}
