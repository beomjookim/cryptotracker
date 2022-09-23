import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper, {})({
  backgroundColor: '#14161a',
  color: 'white',
  minHeight: '100vh'
});

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <StyledPaper>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
      </StyledPaper>
    </Router>
  );
}

export default App;
