
import './App.css';
import Header from './Header/Header'; 
import Nav from './nav/Nav';
import Section1 from './Sections1/Section1';
import Section2 from './Sections2/Section2';
import Section3 from './Sections3/Section3';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Section1 />} />
          <Route path='/second' element={<Section2 />} />
          <Route path='/third' element={<Section3 />} />
        </Routes>
      </main>
      <Nav />
    </div>
  );
}

export default App;
