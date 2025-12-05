import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const initialForm = { nombre: '', email: '', mensaje: '' };
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const fallbackToEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL;
  const isConfigured = Boolean(serviceId && templateId && publicKey);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isConfigured) {
      setStatus('error');
      setErrorMsg('El servicio de correo no está configurado. Inténtalo más tarde.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const templateParams = {
        nombre: form.nombre,
        email: form.email,
        mensaje: form.mensaje,
        telefono: 'No proporcionado',
        asunto: 'Consulta desde Mascotario',
        to_email: fallbackToEmail,
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });
      setForm(initialForm);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Error enviando mensaje con EmailJS', error);
      setErrorMsg('No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos.');
      setStatus('error');
    }
  };

  return (
    <section className="contact-section">
      <h1>Contacto</h1>
      <p>¿Tienes dudas, quieres cotizar o dejarnos un mensaje?</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="mensaje"
          placeholder="Tu mensaje..."
          value={form.mensaje}
          onChange={handleChange}
          rows={5}
          required
        />
        <button
          type="submit"
          className="buy-btn"
          disabled={status === 'loading' || !isConfigured}
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {status === 'success' && (
        <div className="contact-success" role="status">
          ¡Gracias por tu mensaje! Te responderemos pronto.
        </div>
      )}
      {status === 'error' && errorMsg && (
        <div className="contact-error" role="alert">
          {errorMsg}
        </div>
      )}
      {!isConfigured && (
        <p className="contact-error" role="alert">
          El formulario está temporalmente inhabilitado por falta de configuración.
        </p>
      )}
    </section>
  );
}
