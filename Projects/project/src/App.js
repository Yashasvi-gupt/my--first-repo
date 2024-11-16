
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
     <Header/>
    
     <Routes>
      <Route path='/' element={ <Section1/>}/>
      <Route path='/Second' element={ <Section2/> }/>
      <Route path='/Third' element={ <Section3/> }/>
     </Routes> 

     <Nav/>
    </div>
  );
}

export default App;
