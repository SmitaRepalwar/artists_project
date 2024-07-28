// import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {TransactionTable} from "./pages/transactionTable"
import Transaction from "./pages/transaction"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransactionTable/>}/>
        <Route path="/add" element={<Transaction/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
