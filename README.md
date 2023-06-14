# Prueba Front End #1

Esta es una aplicación desarrollada utilizando Angular y Bootstrap. La aplicación permite obtener una lista de usuarios y mostrar la información de sus perfiles utilizando la API pública de GitHub.

## Requisitos generales

1. **Requisitos funcionales:**

   - La aplicación incluye un campo de entrada de texto y un botón para capturar el nombre de usuario y recuperar la información utilizando el API de GitHub.
   - Se muestran los primeros 10 usuarios del resultado de búsqueda, incluyendo su nombre de usuario y su ID.
   - Cada perfil de usuario se convierte en un enlace que redirige a una ruta que incluye el nombre de usuario como parámetro.
   - Se crea un componente independiente para leer el parámetro de la URL y obtener los datos del usuario utilizando la API de GitHub.
   - En el componente de perfil de usuario se muestra la imagen del usuario y otra información relevante.
   - Se incluye un validador que verifica que el texto de búsqueda de usuarios tenga un mínimo de 4 caracteres y no permita buscar la palabra "doublevpartners".
   - Se integra una librería de gráficos (por ejemplo, ChartJS) para mostrar un gráfico de barras que representa el número de seguidores de los 10 primeros usuarios.
   - Se incluye un componente para mostrar mensajes de error en toda la aplicación.
   - Se agrega un método en el servicio que obtiene los datos del API para utilizar tanto Observables como Promises.
   - Se agrega un Guard que no permite consultar el perfil de usuarios con un 'score' menor a 30.0.

## Instalación y configuración

Sigue estos pasos para instalar y configurar la aplicación:

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura el TOKEN en el environment.ts para el correcto uso de la aplicación
4. Ejecuta `ng serve` para iniciar la aplicación en modo de desarrollo.
5. Abre tu navegador web y accede a `http://localhost:4200` para ver la aplicación en funcionamiento.

¡Listo! Ahora puedes explorar la aplicación y realizar búsquedas de usuarios en GitHub, ver sus perfiles y visualizar el gráfico de seguidores.

## Tecnologías utilizadas

- Angular
- Ng Zorro
- ChartJS
