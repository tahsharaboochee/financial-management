import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TransactionsList from './components/transactions/TransactionsList';
import GoalsList from './components/goals/GoalsList';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/transactions" component={TransactionsList} />
          <Route path="/goals" component={GoalsList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
