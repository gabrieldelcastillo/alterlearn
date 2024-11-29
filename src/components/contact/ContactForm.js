import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import styles from './Contact.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    "Consulta General",
    "Problema de Compra",
    "Soporte Técnico",
    "Retroalimentación",
    "Otro"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Se necesita un correo válido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de correo inválido";
    }
    if (formData.subject.length < 3) {
      newErrors.subject = "El asunto debe tener al menos 3 caracteres";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Se necesita un mensaje";
    }
    if (!formData.inquiryType) {
      newErrors.inquiryType = "Selecciona un tipo de consulta";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Envío exitoso");
        setFormData({
          email: "",
          inquiryType: "",
          subject: "",
          message: "",
        });
      } catch (error) {
        alert("Ocurrió un error, inténtalo de nuevo");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className="text-center mb-8">
          <IoMdMail className={styles.icon} />
          <h2 className={styles.heading}>Contáctanos</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className={styles.grid}>
            <div>
              <label htmlFor="email" className={styles.label}>Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className={styles.error} role="alert">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="inquiryType" className={styles.label}>Tipo de consulta</label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className={`${styles.input} ${errors.inquiryType ? styles.errorInput : ''}`}
              aria-invalid={errors.inquiryType ? "true" : "false"}
            >
              <option value="">Selecciona el tipo de consulta</option>
              {inquiryTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.inquiryType && (
              <p className={styles.error} role="alert">{errors.inquiryType}</p>
            )}
          </div>
              
          <div>
            <label htmlFor="subject" className={styles.label}>Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`${styles.input} ${errors.subject ? styles.errorInput : ''}`}
              aria-invalid={errors.subject ? "true" : "false"}
            />
            {errors.subject && (
              <p className={styles.error} role="alert">{errors.subject}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className={styles.label}>Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.input} ${errors.message ? styles.errorInput : ''}`}
              aria-invalid={errors.message ? "true" : "false"}
            ></textarea>
            {errors.message && (
              <p className={styles.error} role="alert">{errors.message}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
