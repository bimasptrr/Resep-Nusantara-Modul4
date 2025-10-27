import { useState, useEffect } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';

export default function MinumanPage({ onSelectRecipe }) {
  const allMinuman = Object.values(ResepMinuman.resep);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(allMinuman);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // 🔍 Filter berdasarkan kata kunci
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    const filtered = allMinuman.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [searchQuery]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* 🔍 Search Bar */}
        <div className="text-center mb-6">
          <input
            type="text"
            placeholder="Cari resep minuman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-green-200 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-green-400 outline-none transition"
          />
        </div>

        {/* 🧩 Grid Resep */}
        <RecipeGrid recipes={currentRecipes} onSelectRecipe={onSelectRecipe} />

        {/* 🔢 Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
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
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Berikutnya
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
