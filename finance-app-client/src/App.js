import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import TransactionsList from './components/transactions/TransactionsList';
// import GoalsList from './components/goals/GoalsList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/transactions" element={<TransactionsList />} />
          <Route path="/goals" element={<GoalsList />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
