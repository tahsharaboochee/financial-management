import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import api from '../../api';
import Transactions from './TransactionDashboard';
import Goals from './GoalDashboard';
import GoalsProgress from './GoalsProgress';
import SpendingByCategory from './SpendingByCategory';
import IncomeVsExpenses from './IncomeVsExpenses';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [spendingByCategory, setSpendingByCategory] = useState([]);
  const [incomeVsExpenses, setIncomeVsExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="content">
        <Transactions transactions={transactions} />
        <div className="goals-container-dashboard">
          <Goals goals={goals} />
          <GoalsProgress goals={goals} />
        </div>
        <div className="charts-container">
          <SpendingByCategory spendingByCategory={spendingByCategory} />
          <IncomeVsExpenses incomeVsExpenses={incomeVsExpenses} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
