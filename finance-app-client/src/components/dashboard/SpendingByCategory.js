import React from 'react';
import { Pie } from 'react-chartjs-2';

function SpendingByCategory({ spendingByCategory }) {
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

  return (
    <div className="chart">
      <h2>Spending by Category</h2>
      <Pie data={pieData} />
    </div>
  );
}

export default SpendingByCategory;
