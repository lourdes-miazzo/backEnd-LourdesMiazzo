Comandos de inicio

debo agregar el command dentro de package.json, para poder hacer el run del mismo 
("command": "node src/command.js") debajo de "start": "nodemon"

con este comando hago el run y ya agrego un user desde command: 
npm run command -- addUser -e admin@admin.com -fn admin -ln adminMiazzo -p 12345678 -a 32 -ia true -t true

## **Docker Commands**
construir imagen
* docker build -t coder:1 .
//coder es el nombre de la imagen y despues de : viene la version que tamb podria ser :latest1.2 alpine-1.0
// -t significa tag !!importante el punto al final

listar imagenes de docker  
* docker images

mostrar los procesos (contenedores) q se están ejecutando
* docker ps -a

crear contenedor y correrlo en puerto 8081 con el nombre node-coder
* docker run -p 8081:8081 --name node-coder -d coder:1

destruir el contenedor
* docker rm node-coder

parar la ejecucion del container
* docker stop node-coder

comenzar la ejecucion del contenedor creado previamente
* docker start node-coder

mostrar los logs del contenedor, para salir presionar ctrl + c
* docker logs -f node-coder