// src/pages/ResepPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function ResepPage({ onSelectRecipe }) {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🔹 Gabungkan semua resep dengan penanda jenisnya
  const allRecipes = [
    ...Object.values(ResepMakanan.resep).map((r) => ({ ...r, type: 'makanan' })),
    ...Object.values(ResepMinuman.resep).map((r) => ({ ...r, type: 'minuman' })),
  ];

  // 🔹 Filter ketat berdasarkan pencarian
  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (query.length === 0) {
      // Jika search kosong → tampilkan semua resep
      setFilteredData(allRecipes);
    } else {
      // Jika search diisi → tampilkan hanya yang cocok
      const filtered = allRecipes.filter((r) =>
        r.name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }

    setCurrentPage(1); // reset pagination ke halaman 1 saat search berubah
  }, [search]);

  // 🔹 Pagination
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

        {/* 🧩 Hasil Filter */}
        <RecipeGrid
          recipes={currentRecipes}
          onSelectRecipe={(id, type) => onSelectRecipe(id, type)}
        />

        {/* 📄 Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* 🚫 Tidak ada hasil */}
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
