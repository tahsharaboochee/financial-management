import React from 'react';
import './Dashboard.css';

function GoalDashboard({ goals }) {
  return (
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
  );
}

export default GoalDashboard;
