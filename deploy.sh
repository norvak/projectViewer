#!/bin/bash

echo "Iniciar Deploy"
echo "";
echo -e "Desplegando en entorno de producción en servidor";
echo "";

ng build  --base-href="./" --prod

#ssh
sshpass -p 'Zaga_123_sys@' ssh -o StrictHostKeyChecking=no robnetti@148.72.23.0 "sudo rm -R /var/www/html/frontend/dist; sudo mkdir /var/www/html/frontend/dist/; sudo chmod 777 -R /var/www/html/frontend/dist/"

#se sube el build nuevo

sshpass -p 'Zaga_123_sys@' scp -r /dist/* robnetti@148.72.23.0:/var/www/html/frontend/dist

echo "";
echo -e "Despliegue completo";
echo "";