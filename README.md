# mascotario-front

Frontend de Mascotario construido con React, TypeScript y Vite.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Scripts útiles

- `npm install` – instala dependencias.
- `npm run dev` – inicia el entorno local en `http://localhost:5173`.
- `npm run build` – genera la build de producción.

## Configuración de EmailJS

El formulario de contacto usa [EmailJS](https://www.emailjs.com/) para enviar correos directamente desde el navegador. Antes de ejecutar el proyecto:

1. Crea una cuenta en EmailJS, conecta tu servicio de correo y crea una plantilla.
2. Copia los identificadores que entrega la plataforma:
   - `SERVICE_ID`
   - `TEMPLATE_ID`
   - `PUBLIC_KEY` (antes llamado *User ID*)
3. En la raíz de `mascotario-front` crea un archivo `.env` con:

```
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

> Recuerda reiniciar `npm run dev` cada vez que modifiques variables `VITE_`. EmailJS expone las peticiones desde el front, así que si necesitas almacenamiento o validaciones adicionales considera reenviar los datos a tu backend.
