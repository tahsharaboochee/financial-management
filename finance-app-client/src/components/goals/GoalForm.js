import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoalForm.css';  // Import the CSS file

function GoalForm({ goalId, setGoals, isEditing, setIsEditing }) {
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
      const fetchGoal = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/goals/${goalId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          setFormData({ ...response.data });
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
      const response = await axios[method](url, formData, config);

      if (isEditing) {
        setGoals(prev => prev.map(goal => goal._id === goalId ? { ...goal, ...formData } : goal));
        setIsEditing(false);
      } else {
        setGoals(prev => [...prev, response.data]);
      }

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
    <div>
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
            required
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
