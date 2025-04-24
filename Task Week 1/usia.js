// Fungsi untuk menentukan kategori usia
function getKategoriUsia(usia) {
    if (usia >= 0 && usia <= 12) {
      return "Anak-anak";
    } else if (usia >= 13 && usia <= 17) {
      return "Remaja";
    } else if (usia >= 18 && usia <= 59) {
      return "Dewasa";
    } else if (usia >= 60) {
      return "Lansia";
    } else {
      return "Usia tidak valid";
    }
  }
  
  // Object untuk menyimpan jumlah orang per kategori
  let kategoriJumlah = {
    "Anak-anak": 0,
    "Remaja": 0,
    "Dewasa": 0,
    "Lansia": 0,
  };
  
  // Contoh array input usia beberapa orang
  let daftarUsia = [10, 15, 25, 22, 30, 65, 7];
  
  // Loop untuk memproses setiap usia
  for (let i = 0; i < daftarUsia.length; i++) {
    let kategori = getKategoriUsia(daftarUsia[i]);
    if (kategoriJumlah.hasOwnProperty(kategori)) {
      kategoriJumlah[kategori]++;
    }
  }
  
  // Menampilkan hasil
  for (let kategori in kategoriJumlah) {
    console.log(`${kategori} ${kategoriJumlah[kategori]} orang`);
  }
  