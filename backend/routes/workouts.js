const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workoutController'); // Assurez-vous que le chemin est correct

const router = express.Router();

// Obtenir tous les entraînements
router.get('/', getWorkouts);

// Obtenir un seul entraînement
router.get('/:id', getWorkout);

// Créer un nouvel entraînement
router.post('/', createWorkout);

// Supprimer un entraînement
router.delete('/:id', deleteWorkout);

// Mettre à jour un entraînement
router.patch('/:id', updateWorkout);

module.exports = router;
