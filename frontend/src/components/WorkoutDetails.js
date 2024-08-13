import React from 'react';
import useWorkoutsContext from '../hooks/useWorkoutsContext';

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Failed to delete workout:', error);
        return;
      }
      
      const json = await response.json();
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (error) {
      console.error('An error occurred while deleting the workout:', error);
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{new Date(workout.createdAt).toLocaleDateString()}</p>
      <span 
        onClick={handleClick} 
        style={{ cursor: 'pointer', color: 'red' }}
      >
        Delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
