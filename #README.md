###
PASOS PARA CORRER EL PROYECTO LOCALMENTE: 
1) Clonar el repositorio.
2) En la carpeta del repositorio, correr: npm install
3) Para correr local el proyecto: npm start
4) Para correr local en modo desarrollo: npm run dev
5) Con la aplicacion corriendo, para ejecutar los tests: npm test

###
Api doc (endpoints):  
1  
(URL)/api/users   
(GET) para obtener los ususarios guardados en la base de datos.  
(GET) /id para obtener los datos de un usuario guardado en la base de datos.  
(POST) para crear un usuario, donde se debe proveer como cuerpo de la peticion: name,lastname,username,password(8 caracteres como minimo, alfanumerica),currency,facryptos(opcional)  
(PUT) permite actualizar las criptomonedas favoritas de un usuario y su moneda. se debe proveer favcryptos(array de ids de criptomonedas) y currency  
(DELETE) /id permite borrar un usuario de la base de datos.  

2   
(URL)/api/login  
(POST) enviado username y password, el usuario obtendra su token de autenticacion.  

3  
(URL)/api/cryptos  
(GET) Obtiene todo el listado de criptomonedas.  
(GET) /avaiablefav Permite conocer los ids de las criptomonedas disponibles para agregar a favoritas y hacer un seguimiento (ids requeridos en el array favcryptos)  
(GET) /top/n permite obtener informacion especifica de las criptomonedas seguidas por el usuario. Puede enviarse un parametro order con el valor asc o desc para ordenar este ranking de manera ascendente o descendente.  
    valor maximo de n=25
