import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function GoalsProgress({ goals }) {
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
  );
}

export default GoalsProgress;
