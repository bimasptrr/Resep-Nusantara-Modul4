// src/pages/DetailPage.jsx
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, ChefHat, List } from 'lucide-react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';

export default function DetailPage({ recipe, onBack }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!recipe) return;

    // Ambil data dari sumber sesuai tipe (makanan / minuman)
    const dataSource =
      recipe.type === 'makanan' ? ResepMakanan.resep : ResepMinuman.resep;

    const found = Object.values(dataSource).find((r) => r.id === recipe.id);
    setDetail(found);
  }, [recipe]);

  if (!detail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 mb-4">Memuat detail resep...</p>
        <button
          onClick={onBack}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 md:p-12">
      {/* Tombol kembali */}
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Kembali
      </button>

      {/* Gambar dan nama resep */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={detail.image_url}
          alt={detail.name}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {detail.name}
          </h1>

          {/* Info ringkas */}
          <div className="flex flex-wrap gap-4 mb-6 text-slate-600">
            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              <span>{detail.ingredients.length} bahan</span>
            </div>
            <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
              <ChefHat className="w-4 h-4 mr-2 text-green-500" />
              <span>{detail.steps.length} langkah</span>
            </div>
          </div>

          {/* Daftar bahan */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 flex items-center mb-2">
              <List className="w-5 h-5 mr-2" />
              Bahan-bahan
            </h2>
            <ul className="list-disc list-inside text-slate-700 space-y-1">
              {detail.ingredients.map((bahan, idx) => (
                <li key={idx}>{bahan}</li>
              ))}
            </ul>
          </section>

          {/* Langkah memasak */}
          <section>
            <h2 className="text-2xl font-semibold text-green-700 flex items-center mb-2">
              <ChefHat className="w-5 h-5 mr-2" />
              Langkah-langkah
            </h2>
            <ol className="list-decimal list-inside text-slate-700 space-y-2">
              {detail.steps.map((langkah, idx) => (
                <li key={idx}>{langkah}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
