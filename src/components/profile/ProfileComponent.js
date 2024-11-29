import React, { useState } from "react";
import styles from "./Profile.module.css";

const ProfileComponent = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Apuntes de Matemáticas" },
    { id: 2, name: "Control 1 de Física" },
  ]);

  const [history, setHistory] = useState([
    { id: 1, name: "Certamen 1 de Química", date: "2024-01-15", price: "CLP$1000" },
    { id: 2, name: "Tarea 2 de Programación", date: "2024-02-20", price: "CLP$250" },
  ]);

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const handleDownload = (name) => {
    alert(`Descargando: ${name}`);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.infoSection}>
        <p><strong>Nombre de usuario:</strong> Juan Pérez</p>
        <p><strong>Correo electrónico:</strong> juan.perez@alumnos.uv.cl</p>
      </div>

      <div className={styles.section}>
        <h3>Historial de Compras</h3>
        {history.length > 0 ? (
          <ul className={styles.list}>
            {history.map((item) => (
              <li key={item.id} className={styles.item}>
                <span>{item.name}</span>
                <span>{item.date}</span>
                <span>{item.price}</span>
                <button
                  className={styles.downloadButton}
                  onClick={() => handleDownload(item.name)}
                >
                  Descargar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No has realizado compras aún.</p>
        )}
      </div>

      <div className={styles.section}>
        <h3>Favoritos y Guardados</h3>
        {favorites.length > 0 ? (
          <ul className={styles.list}>
            {favorites.map((item) => (
              <li key={item.id} className={styles.item}>
                <span>{item.name}</span>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFavorite(item.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes recursos guardados.</p>
        )}
      </div>

      <div className={styles.section}>
        <h3>Configuración de la Cuenta</h3>
        <ul className={styles.configList}>
          <li>
            <button className={styles.configButton}>Cambiar contraseña</button>
          </li>
          <li>
            <button className={styles.configButton}>Actualizar correo electrónico</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileComponent;
