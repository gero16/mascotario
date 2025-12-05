import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setForm({ nombre: '', email: '', mensaje: '' });
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
        <button type="submit" className="buy-btn">Enviar</button>
      </form>
      {enviado && <div className="contact-success">¡Gracias por tu mensaje!</div>}
    </section>
  );
}
