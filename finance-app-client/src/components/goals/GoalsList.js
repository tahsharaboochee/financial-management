import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoalForm from './GoalForm';
import './GoalsList.css';
import { Link } from 'react-router-dom';

function GoalsList() {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentGoalId, setCurrentGoalId] = useState(null);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:3000/goals', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGoals(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('Failed to fetch goals. Please try again later.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/goals/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGoals(goals.filter(goal => goal._id !== id));
    } catch (err) {
      setError('Failed to delete goal');
    }
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    setCurrentGoalId(id);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="goals-container">
      <h2>Goals</h2>
      <div className="navigation">
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
      {error && <div className="error">{error}</div>}
      <ul className="goals-list">
        {goals.map(goal => (
          <li key={goal._id}>
            {goal.description} - Target: ${goal.targetAmount} - Current: ${goal.currentAmount} - Deadline: {goal.deadline}
            <button className="edit" onClick={() => handleEdit(goal._id)}>Edit</button>
            <button onClick={() => handleDelete(goal._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <GoalForm
        goalId={currentGoalId}
        setGoals={setGoals}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setCurrentGoalId={setCurrentGoalId}
      />
    </div>
  );
}

export default GoalsList;
