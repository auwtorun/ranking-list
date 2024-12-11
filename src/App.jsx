
import React, { useState } from "react";
import HomePage from "./HomePage";
import Footer from "./components/Footer";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
          <p className="text-black text-lg">Loading...</p> {/* Spinner atau animasi bisa ditambahkan di sini */}
        </div>
      )}
      <div className="">
        <HomePage setLoading={setLoading} />
        <Footer />
      </div>
    </>
  );
};

export default App;