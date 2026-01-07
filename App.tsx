import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import NetworkPage from './pages/NetworkPage';
import DataAnalysisPage from './pages/DataAnalysisPage';
import AlgorithmPage from './pages/AlgorithmPage';
import SocialImpactPage from './pages/SocialImpactPage';
import PLBPage from './pages/PLBPage';
import MindfulnessWidget from './components/MindfulnessWidget';
import { MainPageRoute } from './types';

function App() {
  const [activePage, setActivePage] = useState<MainPageRoute>(1);

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case 1:
        return <Home onStart={() => setActivePage(2)} />;
      case 2:
        return <NetworkPage />;
      case 3:
        return <AlgorithmPage />;
      case 4:
        return <SocialImpactPage />;
      case 5:
        return <DataAnalysisPage />;
      case 6:
        return <PLBPage />;
      default:
        return <Home onStart={() => setActivePage(2)} />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderContent()}
      <MindfulnessWidget />
    </Layout>
  );
}

export default App;