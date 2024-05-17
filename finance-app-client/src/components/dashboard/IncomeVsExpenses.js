import React from 'react';
import { Bar } from 'react-chartjs-2';

function IncomeVsExpenses({ incomeVsExpenses }) {
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

  return (
    <div className="chart">
      <h2>Income vs Expenses</h2>
      <Bar data={barData} />
    </div>
  );
}

export default IncomeVsExpenses;
