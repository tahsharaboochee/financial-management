import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import api from '../api';
import { Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Dashboard({ onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [spendingByCategory, setSpendingByCategory] = useState([]);
  const [incomeVsExpenses, setIncomeVsExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await api.get('/transactions');
        setTransactions(transactionsResponse.data);

        const goalsResponse = await api.get('/goals');
        setGoals(goalsResponse.data);

        const spendingResponse = await api.get('/insights/spending-by-category');
        setSpendingByCategory(spendingResponse.data);

        const incomeVsExpensesResponse = await api.get('/insights/income-vs-expenses');
        setIncomeVsExpenses(incomeVsExpensesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const pieData = {
    labels: spendingByCategory.map(item => item._id),
    datasets: [
      {
        label: 'Spending by Category',
        data: spendingByCategory.map(item => item.totalSpent),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
      }
    ]
  };

  const barData = {
    labels: incomeVsExpenses.map(item => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: 'Income',
        data: incomeVsExpenses.filter(item => item._id.type === 'income').map(item => item.total),
        backgroundColor: '#36A2EB'
      },
      {
        label: 'Expenses',
        data: incomeVsExpenses.filter(item => item._id.type === 'expense').map(item => item.total),
        backgroundColor: '#FF6384'
      }
    ]
  };

  const bulletData = {
    labels: goals.map(goal => goal.description),
    datasets: [
      {
        label: 'Progress',
        data: goals.map(goal => (goal.currentAmount / goal.targetAmount) * 100),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="header-right">
          <Link to="/transactions">Manage Transactions</Link>
          <Link to="/goals">Manage Goals</Link>
          <button onClick={handleLogout} className="logout">Logout</button>
        </div>
      </div>
      <div className="content">
        <section className="section">
          <h2>Transactions</h2>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction._id}>
                {transaction.date} - {transaction.type}: ${transaction.amount} - {transaction.category} ({transaction.description})
              </li>
            ))}
          </ul>
        </section>
        <div className="goals-container">
          <section className="section">
            <h2>Financial Goals</h2>
            <ul>
              {goals.map(goal => (
                <li key={goal._id}>
                  {goal.description} - Target: ${goal.targetAmount} - Current: ${goal.currentAmount}
                </li>
              ))}
            </ul>
          </section>
          <section className="section">
            <h2>Goals Progress</h2>
            <Bar data={bulletData} options={{
              indexAxis: 'y',
              elements: {
                bar: {
                  borderWidth: 1,
                },
              },
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }} />
          </section>
        </div>
        <div className="charts-container">
          <div className="chart">
            <h2>Spending by Category</h2>
            <Pie data={pieData} />
          </div>
          <div className="chart">
            <h2>Income vs Expenses</h2>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
