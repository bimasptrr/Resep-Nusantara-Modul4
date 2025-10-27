import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function ResepPage({ onSelectRecipe }) {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // maksimal 3 resep per halaman

  // 🔹 Gabungkan semua resep (makanan + minuman)
  const allRecipes = [
    ...Object.values(ResepMakanan.resep).map((r) => ({ ...r, type: 'makanan' })),
    ...Object.values(ResepMinuman.resep).map((r) => ({ ...r, type: 'minuman' })),
  ];

  // 🔹 Filter berdasarkan kata kunci
  useEffect(() => {
    const query = search.trim().toLowerCase();
    const filtered = query
      ? allRecipes.filter((r) => r.name.toLowerCase().includes(query))
      : allRecipes;

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search]);

  // 🔹 Pagination logic (max 3 per halaman)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* 🔍 Search Bar */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Cari resep makanan atau minuman..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-blue-200 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
        </div>

        {/* 🧩 Grid Resep */}
        <RecipeGrid
          recipes={currentRecipes}
          onSelectRecipe={(id, type) => onSelectRecipe(id, type)}
        />

        {/* 🔢 Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Sebelumnya
            </button>

            <span className="text-gray-700 font-medium">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Berikutnya
            </button>
          </div>
        )}

        {/* 🚫 Pesan jika hasil kosong */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">
              Tidak ada resep ditemukan. Coba kata kunci lain.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
