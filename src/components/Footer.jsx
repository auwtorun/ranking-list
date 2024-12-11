import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const Footer = () => {
  const [lastUpdated, setLastUpdated] = useState(null);
  const MyContact = [
    { name: "Whatsapp", link: "https://wa.me" },
    { name: "Instagram", link: "https://instagram.com" },
    { name: "Linkedin", link: "https://linkedin.com" },
  ];

  // Fetch the latest 'lastUpdated' field from Firestore
  useEffect(() => {
    const fetchLastUpdated = async () => {
      const scoresCollection = collection(db, "siswa");
      const q = query(
        scoresCollection,
        orderBy("lastUpdated", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No documents found!");
        return; // Jika tidak ada dokumen, keluar dari fungsi
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Cek apakah lastUpdated adalah string dan konversi ke Date
        if (typeof data.lastUpdated === "string") {
          const lastUpdatedDate = new Date(data.lastUpdated);
          setLastUpdated(lastUpdatedDate.toLocaleString());
        } else {
          console.log("lastUpdated is not a valid string:", data.lastUpdated);
        }
      });
    };

    fetchLastUpdated();
  }, []);

  return (
    <footer className="p-6 bg-white border-t-[1px] border-black text-black h-full">
      <div className="flex justify-center items-center h-full text-sm text-gray-500">
      {lastUpdated ? (
          <p>Data terupdate terakhir: {lastUpdated}</p>
        ) : (
          <p>Data belum diperbarui.</p> // Pesan default jika tidak ada last updated
        )}
      </div>
    </footer>
  );
};

export default Footer;
