import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingWidget from './components/BookingWidget';
import ReviewsSection from './components/ReviewsSection';
import PortfolioPage from './components/PortfolioPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';

const getInitialPage = (): 'book' | 'portfolio' | 'privacy' | 'terms' | '404' => {
  return 'book';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'book' | 'portfolio' | 'privacy' | 'terms' | '404'>(getInitialPage());

  const handleCalculateClick = () => {
    // If we're not on the book page, change page then scroll
    if (currentPage !== 'book') {
      setCurrentPage('book');
    }
    window.dispatchEvent(new Event('reset-booking-step'));
    setTimeout(() => {
      const el = document.getElementById('square-footage-calculator-anchor');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handlePortfolioClick = () => {
    setCurrentPage('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Visual ambient light graphics */}
      <div className="absolute top-24 right-10 w-72 h-72 bg-[#EAECE8] blur-3xl rounded-full opacity-60 pointer-events-none" />
      <div className="absolute top-[40vh] left-5 w-60 h-60 bg-[#FAF9F5] blur-[120px] rounded-full opacity-50 pointer-events-none" />

      {/* FIXED NAVIGATION BAR */}
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* DYNAMIC PAGES ENGINE */}
      <main className="flex-grow pt-24">
        {currentPage === 'book' && (
          <>
            {/* FIRST PAGE: INTRO & LOGO WELCOME BLOCK */}
            <Hero 
              onCalculateClick={handleCalculateClick}
            />

            {/* THREE-STEPPED PRICING SCHEDULER */}
            <BookingWidget />

            {/* INSTANT ACCESS CONCIERGE ACCESS PORTAL */}
            <ContactSection />

            {/* INTEGRATED CUSTOMER VERIFIED REFERENCES */}
            <ReviewsSection />
          </>
        )}

        {currentPage === 'portfolio' && (
          /* SECOND PAGE: DYNAMIC PORTFOLIO SHOWCASE */
          <PortfolioPage />
        )}

        {currentPage === 'privacy' && (
          /* THIRD PAGE: PRIVACY POLICY PAGE */
          <PrivacyPolicy onBackToHome={() => setCurrentPage('book')} />
        )}

        {currentPage === 'terms' && (
          /* FIFTH PAGE: TERMS OF SERVICE PAGE */
          <TermsOfService onBackToHome={() => setCurrentPage('book')} />
        )}

        {currentPage === '404' && (
          /* SEVENTH PAGE: BEAUTIFUL CUSTOM 404 NOT FOUND PAGE */
          <NotFound onBackToHome={() => setCurrentPage('book')} />
        )}

      </main>

      {/* FOOTER ACTIONS */}
      <Footer onPageChange={setCurrentPage} />
    </div>
  );
}
