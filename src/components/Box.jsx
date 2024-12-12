import React, { useState, useEffect } from "react";

const Box = ({ scores, filter }) => {
  const [filteredScores, setFilteredScores] = useState([]);

  useEffect(() => {
    const filtered =
      Array.isArray(scores) && scores.length > 0
        ? scores.filter((item) => (filter === null ? true : item.kelas === filter)) // Periksa filter null
        : [];
    setFilteredScores(filtered);
  }, [filter, scores]);

  const rankedItems = [...filteredScores]
    .sort((a, b) => {
      if (b.skor !== a.skor) {
        return b.skor - a.skor;
      }
      return a.nama.localeCompare(b.nama);
    })
    .map((item, index) => ({ ...item, rank: index + 1 }));

    console.log("TESTING API KEY:", import.meta.env.VITE_FIREBASE_API_KEY)
  return (
    <div className="">
      <ol className="bg-white rounded-lg">
        {rankedItems.map(({ nama, skor, rank }) => (
          <li
            key={rank}
            className={`flex rounded-full drop-shadow-md justify-between py-4 px-6 border-b mb-4 last:border-b-0 ${getRankColor(rank)}`}
          >
            <span className="font-semibold w-8">{getOrdinal(rank)}</span>
            <span className="w-3/4 flex justify-start">{nama}</span>
            <span className="w-8 flex justify-end">{skor}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const getOrdinal = (n) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = n % 100;
  return n + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
};

const getRankColor = (rank) => {
  switch (rank) {
    case 1:
      return "bg-yellow-300"; // Emas
    case 2:
      return "bg-gray-300"; // Perak
    case 3:
      return "bg-orange-200"; // Perunggu
    default:
      return "bg-gray-100"; // Warna biasa untuk peringkat lainnya
  }
};

export default Box;
