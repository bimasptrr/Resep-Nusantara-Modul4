// src/pages/ProfilePage.jsx
export default function ProfilePage() {
  const anggotaKelompok = [
    { nama: "Bima Saputra Aji", nim: "21120123130104" },
    { nama: "Yudha Indra Praja", nim: "21120123140055" },
    { nama: "A Faidhullah Farros B", nim: "21120123140171" },
    { nama: "Jibran Analata Putra", nim: "21120123140137" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        {/* Judul Halaman */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 mb-8">
          Profil Kelompok Praktikum
        </h1>

        {/* Kartu Kelompok */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-blue-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">
              Kelompok 29 - Praktikum Pemrograman Perangkat Bergerak
            </h2>
            <p className="text-gray-600 mt-1">
              Universitas Diponegoro • Tahun 2025
            </p>
          </div>

          {/* Daftar Anggota */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">No</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nama Lengkap</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">NIM</th>
                </tr>
              </thead>
              <tbody>
                {anggotaKelompok.map((anggota, index) => (
                  <tr
                    key={anggota.nim}
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="border border-gray-200 px-4 py-2 font-medium text-gray-700">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-800">
                      {anggota.nama}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-700">
                      {anggota.nim}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Dibuat dengan ❤️ oleh Kelompok 29</p>
            <p className="mt-1">
              Praktikum Pemrograman Perangkat Bergerak — Resep Nusantara App 🍴
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
