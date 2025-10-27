// src/pages/MinumanPage.jsx
import { useState, useEffect } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';

export default function MinumanPage({ onSelectRecipe }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // 🔹 Ambil semua data minuman
  const allMinuman = Object.values(ResepMinuman.resep);

  // 🔹 Filter data sesuai pencarian
  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered =
      searchQuery.trim() === ''
        ? allMinuman
        : allMinuman.filter((recipe) =>
            recipe.name.toLowerCase().includes(lowerQuery)
          );

    setFilteredRecipes(filtered);
  }, [searchQuery, allMinuman]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* 🔹 Search Bar */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Cari resep minuman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-green-200 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-green-400 outline-none transition"
          />
        </div>

        {/* 🔹 Grid resep minuman */}
        <RecipeGrid recipes={filteredRecipes} onSelectRecipe={onSelectRecipe} />
      </main>
    </div>
  );
}
