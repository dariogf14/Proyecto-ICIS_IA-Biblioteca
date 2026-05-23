# Gestion de Biblioteca

Proyecto final full-stack para una web de gestion de biblioteca.

## Tecnologias

- Next.js con App Router
- API REST con rutas `GET`, `POST`, `PUT` y `DELETE`
- MySQL con Sequelize
- MongoDB con Mongoose
- CSS propio sencillo

## Funcionalidades incluidas

- Dashboard con resumen de libros, socios, prestamos y registros.
- CRUD completo de libros en MySQL.
- CRUD completo de socios en MySQL.
- Gestion de prestamos y devoluciones.
- CRUD completo del historial en MongoDB.
- Busqueda y filtros combinados en libros: titulo, categoria, disponibilidad y ano.
- Validacion HTML5 en formularios y validacion en servidor.
- Paginas `error.js` y `not-found.js`.
- Scripts de carga inicial: `scripts/biblioteca.sql` y `scripts/logs.json`.

## Estructura de bases de datos

### MySQL

Tablas principales:

- `authors`: autores.
- `categories`: categorias.
- `members`: socios.
- `books`: libros, con claves foraneas a autores y categorias.
- `loans`: prestamos, con claves foraneas a socios y libros.

### MongoDB

Coleccion `logs` para guardar historial de acciones:

- accion realizada.
- entidad afectada.
- detalle.
- fecha de creacion.

## Instalacion local

### 1. Instalar dependencias

```bash
npm install
```

No se debe subir la carpeta `node_modules` a GitHub. Ya esta incluida en `.gitignore`.

### 2. Crear el archivo de entorno

Copia `.env.example` y renombralo como `.env`.

```bash
cp .env.example .env
```

Ejemplo local:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=biblioteca_db
MYSQL_USER=root
MYSQL_PASSWORD=
MONGODB_URI=mongodb://127.0.0.1:27017/biblioteca_logs
```

### 3. Crear y cargar MySQL

Abre MySQL y ejecuta el script:

```bash
mysql -u root -p < scripts/biblioteca.sql
```

Tambien puedes usar MySQL Workbench: abre `scripts/biblioteca.sql` y pulsa ejecutar.

### 4. Cargar MongoDB

Con MongoDB iniciado, ejecuta:

```bash
npm run seed:mongo
```

### 5. Arrancar el proyecto

```bash
npm run dev
```

Despues abre:

```text
http://localhost:3000
```

## Despliegue en Vercel

### 1. Subir el codigo a GitHub

Antes de subirlo, comprueba que no existe `node_modules` dentro del repositorio.

```bash
git init
git add .
git commit -m "proyecto biblioteca"
git branch -M main
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```

### 2. Preparar MySQL en la nube

Puedes usar un servicio compatible con MySQL. Crea una base de datos y ejecuta el archivo:

```text
scripts/biblioteca.sql
```

Guarda los datos de conexion: host, puerto, usuario, password y nombre de la base de datos.

### 3. Preparar MongoDB Atlas

Crea un cluster, una base de datos y copia la cadena de conexion. Debe quedar parecida a esta:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/biblioteca_logs
```

### 4. Crear proyecto en Vercel

1. Entra en Vercel.
2. Importa el repositorio de GitHub.
3. En `Environment Variables`, anade:

```env
MYSQL_HOST=...
MYSQL_PORT=3306
MYSQL_DATABASE=...
MYSQL_USER=...
MYSQL_PASSWORD=...
MONGODB_URI=...
```

4. Pulsa `Deploy`.

### 5. Comprobar entrega

Revisa estas rutas:

- `/dashboard`: resumen inicial.
- `/books`: CRUD de libros y filtros.
- `/members`: CRUD de socios.
- `/loans`: prestamos y devoluciones.
- `/logs`: CRUD de MongoDB.
- `/ruta-inventada`: prueba de `not-found.js`.

## Rutas API principales

| Metodo | Ruta | Funcion |
|---|---|---|
| GET | `/api/books` | Listar libros con filtros |
| POST | `/api/books` | Crear libro |
| PUT | `/api/books/:id` | Actualizar libro |
| DELETE | `/api/books/:id` | Borrar libro |
| GET | `/api/members` | Listar socios |
| POST | `/api/members` | Crear socio |
| PUT | `/api/members/:id` | Actualizar socio |
| DELETE | `/api/members/:id` | Borrar socio |
| GET | `/api/logs` | Listar historial MongoDB |
| POST | `/api/logs` | Crear historial MongoDB |
| PUT | `/api/logs/:id` | Actualizar historial MongoDB |
| DELETE | `/api/logs/:id` | Borrar historial MongoDB |

## Capturas

![Página principal](./public/capturas/inicio.png)
![Dashboard](./public/capturas/dashboard.png)
![Listado libros con filtros](./public/capturas/libros.png)
![Gestión de socios](./public/capturas/socios.png)
![Gestión prestamos](./public/capturas/prestamos.png)
![Página informativa](./public/capturas/informacion.png)
![Error 404](./public/capturas/error404.png)

![API libros](./public/capturas/APIlibros.png)

![Tablas DB](./public/capturas/DBtablas.png)
![Tabla libros](./public/capturas/DBtablalibros.png)