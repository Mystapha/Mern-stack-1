import React, { createContext, useReducer } from 'react';

// Création du contexte
export const WorkoutsContext = createContext();

// Définition du reducer pour gérer les différentes actions
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        ...state,
        workouts: action.payload,
      };
      
    case "CREATE_WORKOUT":
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
      };

    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter(workout => workout._id !== action.payload._id),
      };

    default:
      return state;
  }
};

// Fournisseur de contexte pour envelopper l'application
function WorkoutsContextProvider({ children }) {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: [], // Initialiser avec un tableau vide
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export default WorkoutsContextProvider;
