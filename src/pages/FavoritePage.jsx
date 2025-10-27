import { useEffect, useState } from 'react';

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Resep Favorit</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">Belum ada resep favorit.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4">
              <img src={item.image} alt={item.name} className="rounded-lg mb-3" />
              <h2 className="font-semibold text-lg mb-2">{item.name}</h2>
              <button
                onClick={() => removeFavorite(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
