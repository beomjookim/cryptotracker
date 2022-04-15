import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
