const readline = require('readline');

// Fungsi untuk masing-masing operasi
function tambah(a, b) {
  return a + b;
}

function kurang(a, b) {
  return a - b;
}

function kali(a, b) {
  return a * b;
}

function bagi(a, b) {
  if (b === 0) {
    return "Tidak bisa dibagi dengan 0";
  }
  return a / b;
}

// Buat interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Tampilkan menu
console.log("Pilih operasi:");
console.log("1. Penjumlahan");
console.log("2. Pengurangan");
console.log("3. Perkalian");
console.log("4. Pembagian");

// Mulai input dari user
rl.question("Masukkan Pilihan Operasi: ", (menu) => {
  rl.question("Masukkan Angka Pertama: ", (angka1) => {
    rl.question("Masukkan Angka Kedua: ", (angka2) => {
      const a = parseFloat(angka1);
      const b = parseFloat(angka2);
      let hasil;
      let operasi;

      switch (menu) {
        case "1":
          hasil = tambah(a, b);
          operasi = "Penjumlahan";
          break;
        case "2":
          hasil = kurang(a, b);
          operasi = "Pengurangan";
          break;
        case "3":
          hasil = kali(a, b);
          operasi = "Perkalian";
          break;
        case "4":
          hasil = bagi(a, b);
          operasi = "Pembagian";
          break;
        default:
          console.log("Pilihan tidak valid.");
          rl.close();
          return;
      }

      console.log(`\nOperasi: ${operasi}`);
      console.log(`Angka 1: ${a}`);
      console.log(`Angka 2: ${b}`);
      console.log(`Hasil: ${hasil}`);
      rl.close();
    });
  });
});
