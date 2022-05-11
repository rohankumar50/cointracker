import { Route, Routes } from 'react-router-dom';
import './App.css';
import CoinDetail from './components/pages/coinInfo/coinDetail/CoinDetail';
import Header from './components/header/Header';
// import Main from './components/main/Main';
import Home from './components/pages/home/Home'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='coins' element={<CoinDetail />}>
          <Route path=':id' element={<CoinDetail />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
