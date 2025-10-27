// src/pages/MakananPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function MakananPage({ onSelectRecipe }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // 🔹 Ambil semua data resep makanan
  const allMakanan = Object.values(ResepMakanan.resep);

  // 🔹 Filter berdasarkan pencarian
  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered =
      searchQuery.trim() === ''
        ? allMakanan
        : allMakanan.filter((recipe) =>
            recipe.name.toLowerCase().includes(lowerQuery)
          );
    setFilteredRecipes(filtered);
  }, [searchQuery, allMakanan]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* 🔹 Search Bar */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Cari resep makanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-blue-200 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
        </div>

        {/* 🔹 Grid Resep */}
        <RecipeGrid recipes={filteredRecipes} onSelectRecipe={onSelectRecipe} />
      </main>
    </div>
  );
}
