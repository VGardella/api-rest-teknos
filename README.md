<h1>Teknos Backend Challenge v2</h1>

Se replicaron un conjunto de APIs de manipulación de mensajes para una aplicación de correo. Esta se realizó en Node.Js, utilizando la biblioteca Express.

Requerimientos:

* Se necesita tener instalado Node.js. El instalador esta disponible en https://nodejs.org/en.

* Se necesita tener instalada la biblioteca express para poder correr la aplicación. En caso de no tenerlo instalado se tiene que correr en la terminal el comando <code>yarn add express</code>.

* Se requiere la biblioteca Mongoose para permitir la coneccion a la base de datos correspondiente. Lo instalaremos usando el comando <code>yarn add mongoose</code>.

También puede usarse el comando <code>yarn install</code> para instalar directamente todas las dependencias necesarias, definidas en package.json.

* Para poder testear APIs localmente se necesitará instalar el Desktop Agent de la plataforma Postman, disponible en https://www.postman.com/downloads/postman-agent/.

Funcionamiento:

Se debe clonar el repositorio e instalar los componentes indicados anteriormente. Se podrá correr la aplicación al usar en la terminal el comando:
<code>node index.js</code>
Si la aplicación se encuentra corriendo debidamente se recibirá el mensaje 'Escuchando puerto: 3000'; también veremos el mensaje 'Conexion exitosa a la base de datos', que nos indicará que pudimos conectarnos a nuestra base de MongoDB.

Para poder acceder a las funcionalidades de nuestra API tendremos que abrir el Agente de Escritorio de Postman, donde podremos usar las siguientes URLs:

* <b>Acceso a listado de carpetas (Método GET):</b> localhost:3000/api/folders.
* <b>Acceso y filtrado de mensajes (Método GET):</b> localhost:3000/api/messages?from=valor&to=valor&subject=valor. 
En caso de que queramos obtener todos los mensajes disponibles solamente usaremos localhost:3000/api/messages.
* <b>Creación de mensajes (Método POST):</b> localhost:3000/api/messages/
En este caso, se adjuntará el mensaje a publicar en la pestaña Body. En cada mensaje se deberán definir los campos 'from', 'to', 'subject', 'message', 'time', 'read', 'starred', 'important', 'hasAttachments' y 'labels'. El campo 'id' se completa automaticamente.
* <b>Borrado de mensajes (Método DELETE):</b> localhost:3000/api/messages/:id
El parámetro 'id' corresponde al código de identificación provisto para cada mensaje.
* <b>Actualización de mensajes (Método PATCH):</b> localhost:3000/api/messages/:id. 
Usaremos el parámetro id para identificar el mensaje a actualizar y escribiremos en la pestaña Body los campos que queramos cambiar. El formato en el que se escriben los nuevos valores es igual al usado en las queries de MongoDB: los conjuntos de clave:valor se escribiran dentro de un mismo conjunto de llaves ({}); en caso de que estemos editando un valor dentro de un subdocumento

Para poder utilizar la API se utilizará el usuario 'teknos' (definido como el parámetro ':user' en las URLs). El parámetro 'name' corresponderá al nombre del archivo que contenga los mensajes con los que queramos trabajar (por ejemplo: sent, starred e important).