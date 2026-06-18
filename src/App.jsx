import React, { useState } from 'react';
import { StudyProvider, useStudy } from './context/StudyContext';
import Onboarding from './components/Onboarding.jsx';
import Dashboard from './components/Dashboard.jsx';
import MemoryCards from './components/MemoryCards.jsx';
import QuizEngine from './components/QuizEngine.jsx';
import ContestArena from './components/ContestArena.jsx';
import Analytics from './components/Analytics.jsx';
import FlashCards from './components/FlashCards.jsx'
import StudyMaterials from './components/StudyMaterials.jsx'

function NavigationWrapper() {
  const { user, login, logout } = useStudy();
  const [view, setView] = useState('landing');
  const [usernameInput, setUsernameInput] = useState('');

  const navigateTo = (targetView) => {
    const publicViews = ['landing', 'login'];
    if (!user && !publicViews.includes(targetView)) {
      setView('login');
    } else {
      setView(targetView);
    }
  };
  

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    login(usernameInput.trim());
    setView('onboarding');
  };

  const handleLogoutClick = () => {
    logout();
    setView('landing');
  };

  const renderCurrentView = () => {
    switch (view) {
      case 'landing':
        return (
          <div className="text-center animate-fade-in" style={{ padding: '5rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
            <svg className="icon-lg text-primary mb-4" style={{ margin: '0 auto 1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <h1 className="main-title">SYNERGY</h1>
            <p className="text-muted mb-6" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              An engineering-grade peer platform designed to synchronize crowdsourced active recall structures and verify knowledge trees.
            </p>
            <button onClick={() => navigateTo('login')} className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Initialize Session
            </button>
          </div>
        );
      case 'login':
        return (
          <div className="card-container max-w-sm animate-fade-in" style={{ margin: '4rem auto' }}>
            <h2 className="section-title text-center">Authenticate Session</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="input-label">Student Identification</label>
                <input 
                  type="text" 
                  value={usernameInput}
                  onChange={e => setUsernameInput(e.target.value)}
                  placeholder="Enter username..." 
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full flex-center gap-2">
                <svg className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Continue
              </button>
            </form>
          </div>
        );
      case 'onboarding':
        return <Onboarding onComplete={() => setView('dashboard')} />;
      case 'dashboard':
        return <Dashboard setView={navigateTo} />;
      case 'cards':
        return <MemoryCards />;
      case 'quiz':
        return <QuizEngine />;
      case 'contest':
        return <ContestArena onQuit={() => setView('dashboard')} />;
      case 'analytics':
        return <Analytics />;
      case 'flashcards':
        return <FlashCards />;
      case 'studymaterials':
        return <StudyMaterials />;
      default:
        return <div className="text-center" style={{ color: 'var(--red)' }}>Fatal Node Exception Error</div>;
    }
  };

  return (
    <div className="app-layout">
      {/* App Header */}
      <header className="app-header">
        <div onClick={() => navigateTo('landing')} className="header-logo">
          <svg className="icon text-primary animate-hover-rot" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          <span className="logo-text">SYNERGY</span>
        </div>
        
        <nav className="header-nav">
          {user && (
            <>
              <button onClick={() => navigateTo('dashboard')} className="nav-link-btn flex-center gap-1">
                <svg className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                Dashboard
              </button>
              <button onClick={handleLogoutClick} className="btn-secondary btn-sm flex-center gap-1">
                <svg className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Log Out
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Main Surface Content Body Workspace */}
      <main className="main-content flex-center">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <StudyProvider>
      <NavigationWrapper />
    </StudyProvider>
  );
}