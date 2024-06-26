import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoalForm.css';

function GoalForm({ goalId, setGoals, isEditing, setIsEditing, setCurrentGoalId }) {
  const [formData, setFormData] = useState({
    description: '',
    targetAmount: '',
    currentAmount: '',
    deadline: ''
  });
  const [error, setError] = useState('');

  const { description, targetAmount, currentAmount, deadline } = formData;

  useEffect(() => {
    if (isEditing && goalId) {
      // Fetch the goal data for editing
      const fetchGoal = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/goals/${goalId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          const { description, targetAmount, currentAmount, deadline } = response.data;
          setFormData({ description, targetAmount, currentAmount, deadline: deadline.split('T')[0] }); // format date
        } catch (err) {
          setError('Failed to fetch goal data');
        }
      };

      fetchGoal();
    }
  }, [goalId, isEditing]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      };
      const method = isEditing ? 'patch' : 'post';
      const url = isEditing ? `http://localhost:3000/goals/${goalId}` : 'http://localhost:3000/goals';
      const payload = { description, targetAmount, currentAmount, deadline };
      const response = await axios[method](url, payload, config);

      if (isEditing) {
        // Update the UI optimistically
        setGoals(prev => prev.map(goal => goal._id === goalId ? { ...goal, ...payload } : goal));
        setIsEditing(false);
        setCurrentGoalId(null);
      } else {
        // Append to the list of goals
        setGoals(prev => [...prev, response.data]);
      }

      // Clear form or handle next steps
      setFormData({
        description: '',
        targetAmount: '',
        currentAmount: '',
        deadline: ''
      });
    } catch (err) {
      setError('Failed to submit goal');
    }
  };

  return (
    <div className="goal-form-container">
      <h2>{isEditing ? 'Edit Goal' : 'Add Goal'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Target Amount:
          <input
            type="number"
            name="targetAmount"
            value={targetAmount}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Current Amount:
          <input
            type="number"
            name="currentAmount"
            value={currentAmount}
            onChange={onChange}
          />
        </label>
        <label>
          Deadline:
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={onChange}
            required
          />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default GoalForm;
