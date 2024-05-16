import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import api from '../api';  // Import the api instance

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [spendingByCategory, setSpendingByCategory] = useState([]);
  const [incomeVsExpenses, setIncomeVsExpenses] = useState([]);
  const [goalsProgress, setGoalsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching transactions...');
        const transactionsResponse = await api.get('/transactions');
        setTransactions(transactionsResponse.data);
        console.log('Transactions fetched:', transactionsResponse.data);

        console.log('Fetching goals...');
        const goalsResponse = await api.get('/goals');
        setGoals(goalsResponse.data);
        console.log('Goals fetched:', goalsResponse.data);

        console.log('Fetching spending by category...');
        const spendingResponse = await api.get('/insights/spending-by-category');
        setSpendingByCategory(spendingResponse.data);
        console.log('Spending by category fetched:', spendingResponse.data);

        console.log('Fetching income vs expenses...');
        const incomeVsExpensesResponse = await api.get('/insights/income-vs-expenses');
        setIncomeVsExpenses(incomeVsExpensesResponse.data);
        console.log('Income vs expenses fetched:', incomeVsExpensesResponse.data);

        console.log('Fetching goals progress...');
        const goalsProgressResponse = await api.get('/insights/goals-progress');
        setGoalsProgress(goalsProgressResponse.data);
        console.log('Goals progress fetched:', goalsProgressResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <section className="navigation">
        <Link to="/transactions">Manage Transactions</Link>
        <Link to="/goals">Manage Goals</Link>
      </section>
      <section className="transactions">
        <h2>Transactions</h2>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction._id}>
              {transaction.description} - ${transaction.amount} ({transaction.type})
            </li>
          ))}
        </ul>
      </section>
      <section className="goals">
        <h2>Financial Goals</h2>
        <ul>
          {goals.map(goal => (
            <li key={goal._id}>
              {goal.description} - Target: ${goal.targetAmount}, Current: ${goal.currentAmount}
            </li>
          ))}
        </ul>
      </section>
      <section className="insights">
        <h2>Spending by Category</h2>
        <ul>
          {spendingByCategory.map(category => (
            <li key={category._id}>
              {category._id} - ${category.totalSpent}
            </li>
          ))}
        </ul>
        <h2>Income vs Expenses</h2>
        <ul>
          {incomeVsExpenses.map(stat => (
            <li key={`${stat._id.year}-${stat._id.month}-${stat._id.type}`}>
              {stat._id.month}/{stat._id.year} - {stat._id.type}: ${stat.total}
            </li>
          ))}
        </ul>
        <h2>Goals Progress</h2>
        <ul>
          {goalsProgress.map(goal => (
            <li key={goal._id}>
              {goal.description} - Progress: {((goal.currentAmount / goal.targetAmount) * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
