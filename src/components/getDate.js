const getDate = () => {
    const days = [
      "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
    ];
    
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
  
    const now = new Date();
    const day = days[now.getDay()]; // Mendapatkan hari
    const date = now.getDate(); // Mendapatkan tanggal
    const month = months[now.getMonth()]; // Mendapatkan bulan
    const year = now.getFullYear(); // Mendapatkan tahun
  
    return `${day}, ${date} ${month} ${year}`;
  };
  
  export default getDate;