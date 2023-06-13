Comandos de inicio

debo agregar el command dentro de package.json, para poder hacer el run del mismo 
("command": "node src/command.js") debajo de "start": "nodemon"

con este comando hago el run y ya agrego un user desde command: 
npm run command -- addUser -e admin@admin.com -fn admin -ln adminMiazzo -p 12345678 -a 32 -ia true