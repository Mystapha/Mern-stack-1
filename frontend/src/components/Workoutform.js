import React, { useState } from 'react';
import useWorkoutsContext from '../hooks/useWorkoutsContext';

function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {
      title,
      load: parseFloat(load),  
      reps: parseInt(reps, 10)  
    };

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []); // Gestion de la valeur undefined
      } else {
        setTitle('');
        setReps('');
        setLoad('');
        setError(null);
        setEmptyFields([]);
        console.log('New workout added:', json);
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>

        <label>Exercise Title:</label>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Load (kg):</label>
        <input
          type='number'
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes('load') ? 'error' : ''}
        />

        <label>Reps:</label>
        <input
          type='number'
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <button type='submit'>Add Workout</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
}

export default WorkoutForm;
