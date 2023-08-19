document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("kalkulator-form");
  const hasilKalori = document.getElementById("hasil-kalori");
  const penurunanInfo = document.getElementById("penurunan-berat-badan");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hitungKalori();
    tampilkanInformasiPenurunanBeratBadan();
  });

  document.getElementById("hitung-btn").addEventListener("click", function () {
    hitungKalori();
    tampilkanInformasiPenurunanBeratBadan();
  });

  function hitungKalori() {
    const jenisKelamin = form["jenis-kelamin"].value;
    const tinggiBadan = parseFloat(form["tinggi-badan"].value);
    const beratBadan = parseFloat(form["berat-badan"].value);
    const usia = parseFloat(form["usia"].value);
    const jenisAktivitas = form["jenis-aktivitas"].value;
    const jenisRumus = form["jenis-rumus"].value;

    let rumus;
    if (jenisRumus === "harris-benedict") {
      if (jenisKelamin === "pria") {
        rumus =
          88.362 + 13.397 * beratBadan + 4.799 * tinggiBadan - 5.677 * usia;
      } else {
        rumus =
          447.593 + 9.247 * beratBadan + 3.098 * tinggiBadan - 4.33 * usia;
      }
    } else if (jenisRumus === "mifflin-st-jeor") {
      if (jenisKelamin === "pria") {
        rumus = 10 * beratBadan + 6.25 * tinggiBadan - 5 * usia + 5;
      } else {
        rumus = 10 * beratBadan + 6.25 * tinggiBadan - 5 * usia - 161;
      }
    }

    let faktorAktivitas;
    switch (jenisAktivitas) {
      case "menetap":
        faktorAktivitas = 1.2;
        break;
      case "aktif-ringan":
        faktorAktivitas = 1.375;
        break;
      case "cukup-aktif":
        faktorAktivitas = 1.55;
        break;
      case "sangat-aktif":
        faktorAktivitas = 1.725;
        break;
      case "sangat-aktif-berat":
        faktorAktivitas = 1.9;
        break;
      default:
        faktorAktivitas = 1.2;
    }

    const kaloriHarian = rumus * faktorAktivitas;
    hasilKalori.textContent = kaloriHarian.toFixed(2);
  }

  function tampilkanInformasiPenurunanBeratBadan() {
    const kaloriHarian = parseFloat(hasilKalori.textContent);
    const penurunanRingan = `Penurunan Berat Badan Ringan : Kurangi kalori sekitar ${(
      kaloriHarian - 250
    ).toFixed(2)} per hari.`;
    const penurunanNormal = `Penurunan Berat Badan Normal : Kurangi kalori sekitar ${(
      kaloriHarian - 500
    ).toFixed(2)} per hari.`;
     const penurunanEkstrem = `Penurunan Berat Badan Ekstrem : Kurangi kalori sekitar ${(
       kaloriHarian - 1000
     ).toFixed(
       2
     )} per hari. Atau lebih baiknya berkonsultasilah dengan profesional medis sebelum mengurangi kalori secara ekstrem.`;
  

    penurunanInfo.innerHTML = `<h2>Informasi Penurunan Berat Badan</h2><p>${penurunanRingan}</p><p>${penurunanNormal}</p><p>${penurunanEkstrem}</p>`;
    penurunanInfo.style.display = "block";
  }
});
