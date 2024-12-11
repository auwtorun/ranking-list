// HomePage.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Box from "./components/Box";
import getDate from "./components/getDate";

const HomePage = ({ setLoading }) => {
  const [scores, setScores] = useState([]);
  const [filter, setFilter] = useState(null);

  const fetchScores = () => {
    const scoresCollection = collection(db, "siswa");
    setLoading(true); // Set loading to true when starting fetch
    const unsubscribe = onSnapshot(scoresCollection, (snapshot) => {
      const scoresData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.nama && data.skor !== undefined && data.kelas) {
          scoresData.push({
            nama: data.nama,
            skor: data.skor,
            kelas: data.kelas,
          });
        }
      });
      setScores(scoresData);
      setTimeout(() => {
        setLoading(false); // Set loading to false after fetching with delay
      }, 100);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchScores();
    return () => unsubscribe();
  }, []);

  // Filter the scores based on the selected kelas
  const filteredScores = filter
    ? scores.filter((score) => score.kelas === filter)
    : scores;

  return (
    <div className="max-w-md mx-auto p-6 md:py-6 md:px-0">
      <h2 className="text-xl font-bold mb-4">Ranking List - {getDate()}</h2>
      <div className="mb-4">
        <select
          value={filter === null ? "all" : filter}
          onChange={(e) => setFilter(e.target.value === "all" ? null : Number(e.target.value))}
          className="p-1 border rounded focus:outline-none"
        >
          <option value="all">Semua Kelas</option>
          <option value={4}>Kelas 4</option>
          <option value={5}>Kelas 5</option>
          <option value={6}>Kelas 6</option>
        </select>
      </div>

      {/* Komponen Box menerima skor yang sudah difilter */}
      <Box scores={filteredScores} filter={filter} />
    </div>
  );
};

export default HomePage;
