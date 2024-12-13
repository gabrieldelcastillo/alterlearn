import Recurso from "../models/recurso.js";

export const obtenerRecursoPorFecha = async (req, res) => {
  try {
    const { fecha } = req.query; // Espera recibir la fecha como un query param
    const recursos = await Recurso.find({ fecha_creacion: fecha });
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los recursos por fecha", error });
  }
};

export const obtenerRecursoPorMateria = async (req, res) => {
  try {
    const { materia } = req.query; // Espera recibir la materia como un query param
    const recursos = await Recurso.find({ materia: new RegExp(materia, 'i') });
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los recursos por materia", error });
  }
};

export const obtenerRecursoPorCarrera = async (req, res) => {
  try {
    const { carrera } = req.query; // Espera recibir la carrera como un query param
    const recursos = await Recurso.find({ carrera: new RegExp(carrera, 'i') });
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los recursos por carrera", error });
  }
};

export const obtenerRecursoPorProfesor = async (req, res) => {
  try {
    const { profesor } = req.query; // Espera recibir el profesor como un query param
    const recursos = await Recurso.find({ profesor: new RegExp(profesor, 'i') });
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los recursos por profesor", error });
  }
};

export const obtenerRecursoPorTipo = async (req, res) => {
  try {
    const { tipo } = req.query; // Espera recibir el tipo como un query param
    const recursos = await Recurso.find({ tipo_recurso: tipo });
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los recursos por tipo", error });
  }
};

export const obtenerRecursoPorNombreAsignatura = async (req, res) => {
  try {
    const { nombre_asignatura } = req.query; // Espera recibir el nombre de la asignatura como un query param
    const recursos = await Recurso.find({ nombre_asignatura: new RegExp(nombre_asignatura, 'i') });
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los recursos por nombre de asignatura", error });
  }
};

