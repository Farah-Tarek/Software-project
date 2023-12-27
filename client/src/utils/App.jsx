// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KnowledgeBaseInsertion from './pages/KnowledgeBaseInsertion';
import KBCat from './pages/KBCat';
import KBAll from './pages/KBAll';
import KBgetByBaseId from './pages/KBgetByBaseId';
import KBDelete from './pages/KBDelete';

// import other pages

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/KBgetByBaseId" element={<KBgetByBaseId />} />
      <Route path="/KBDelete" element={<KBDelete />} />
      <Route path="/KBAll" element={<KBAll />} />
        <Route path="/KBInsert" element={<KnowledgeBaseInsertion />} />
        <Route path="/KBCat" element={<KBCat />} />   
      </Routes>
    </Router>
  );
}

export default App;
