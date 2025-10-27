// src/main.jsx
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import ResepPage from './pages/ResepPage';
import FavoritePage from './pages/FavoritePage';
import DetailPage from './pages/DetailPage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css';
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 🔹 Saat Splash selesai
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // 🔹 Navigasi antar halaman
  const handleNavigation = (page) => {
    setSelectedRecipe(null); // reset detail jika sedang di halaman detail
    setCurrentPage(page);
  };

  // 🔹 Saat user klik resep di RecipeGrid
  const handleSelectRecipe = (id, type) => {
    setSelectedRecipe({ id, type });
    setCurrentPage('detail');
  };

  // 🔹 Render halaman aktif
  const renderCurrentPage = () => {
    // Jika sedang melihat detail resep
    if (selectedRecipe) {
      return (
        <DetailPage
          recipe={selectedRecipe}
          onBack={() => handleNavigation('resep')}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'makanan':
        return <MakananPage onSelectRecipe={handleSelectRecipe} />;
      case 'minuman':
        return <MinumanPage onSelectRecipe={handleSelectRecipe} />;
      case 'resep':
        return <ResepPage onSelectRecipe={handleSelectRecipe} />;
      case 'favorite':
        return <FavoritePage onSelectRecipe={handleSelectRecipe} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  // 🔹 Splash screen tampil di awal
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // 🔹 Tampilan utama
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Navbar Desktop */}
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* 🔹 Konten utama */}
      <main className="min-h-screen">{renderCurrentPage()}</main>

      {/* 🔹 Navbar Mobile */}
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* 🔹 Badge PWA */}
      <PWABadge />
    </div>
  );
}

// 🔹 Render ke root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>
);
