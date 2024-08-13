const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Obtenir tous les entraînements
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des entraînements" });
  }
};

// Obtenir un seul entraînement
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Aucun entraînement trouvé avec cet ID" });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "Aucun entraînement trouvé avec cet ID" });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'entraînement" });
  }
};

// Créer un nouvel entraînement
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs", emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(201).json({ workout, msg: "Entraînement ajouté" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un entraînement
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Aucun entraînement trouvé avec cet ID" });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ error: "Aucun entraînement trouvé avec cet ID" });
    }
    res.status(200).json({ msg: "Entraînement supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'entraînement" });
  }
};

// Mettre à jour un entraînement
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Aucun entraînement trouvé avec cet ID" });
  }

  try {
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!workout) {
      return res.status(404).json({ error: "Aucun entraînement trouvé avec cet ID" });
    }
    res.status(200).json({ workout, msg: "Entraînement mis à jour" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'entraînement" });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
