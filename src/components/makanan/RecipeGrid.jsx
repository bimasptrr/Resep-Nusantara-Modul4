// src/components/makanan/RecipeGrid.jsx
import { Clock, Star, ChefHat, Heart, BookOpen } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function RecipeGrid({ recipes = [], onSelectRecipe }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);
  const [favorites, setFavorites] = useState([]);

  // 🔹 Ambil data favorit dari localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  // 🔹 Simpan / hapus favorit
  const toggleFavorite = (recipe) => {
    const exists = favorites.find((f) => f.id === recipe.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // 🔹 Animasi muncul tiap kartu (Intersection Observer)
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, recipes.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(index));
            }, (index % 3) * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [recipes]);

  return (
    <section>
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
        Jelajahi Resep Makanan
      </h1>
      <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
        Temukan inspirasi masakan Nusantara favoritmu. Dari hidangan utama hingga camilan, semua ada di sini.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {recipes.map((recipe, index) => {
          const isFavorite = favorites.some((f) => f.id === recipe.id);
          return (
            <div
              key={recipe.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group transform transition-all duration-700 ${
                visibleCards.has(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 group-hover:scale-105 group-hover:bg-white/20">

                {/* 🔹 Klik gambar = buka detail */}
                <div
                  className="relative h-32 md:h-56 overflow-hidden cursor-pointer"
                  onClick={() => onSelectRecipe && onSelectRecipe(recipe.id, 'makanan')}
                >
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* 🔹 Konten utama kartu */}
                <div className="relative z-10 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100/90 px-2 py-1 rounded-full">
                      Makanan
                    </span>
                    <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-semibold text-slate-700">4.8</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 mb-3 text-base md:text-lg group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs md:text-sm text-slate-600 mb-3">
                    <div className="flex items-center space-x-1 bg-white/70 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">{recipe.ingredients.length} bahan</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-white/70 px-2 py-1 rounded-full">
                      <ChefHat className="w-3 h-3" />
                      <span className="font-medium">{recipe.steps.length} langkah</span>
                    </div>
                  </div>

                  {/* 🔹 Tombol Aksi */}
                  <div className="flex justify-between mt-2">
                    {/* Favorite */}
                    <button
                      onClick={() => toggleFavorite(recipe)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isFavorite
                          ? 'bg-pink-500 text-white hover:bg-pink-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite ? 'fill-current text-white' : ''
                        }`}
                      />
                      {isFavorite ? 'Favorit' : 'Simpan'}
                    </button>

                    {/* Detail */}
                    <button
                      onClick={() => onSelectRecipe && onSelectRecipe(recipe.id, 'makanan')}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                    >
                      <BookOpen className="w-4 h-4" />
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 Pesan jika tidak ada data */}
      {recipes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500">Resep tidak ditemukan. Coba kata kunci lain.</p>
        </div>
      )}
    </section>
  );
}
