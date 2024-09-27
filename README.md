## Como usar este proyecto

Primero entrar a la carpeta de pokemon-combat-back-end y ejecutar la migración usando

`npm run migration:run`

Este proceso creará la base de datos y cargara los pokemones que hayan en el archivo pokemon.json
Ante cualquier cosa está el comando para revertir la migración

`npm run migration:revert`

las tablas son pokemons y combat_tracker

## Levantar Los Servidores

lo siguiente que hay que hacer es levantar el BackEnd, simplemente hay que ejecutar en el directorio del BackEnd:

`npm run start:dev`

en el directorio del FrontEnd con:

`npm run dev`

Para el Front decidí usar Vite por gusto personal

## Página y funcionamiento

Una vez elegido el pokemon, va a salir un detalle con las estadísticas. Al dar al botón de pelea se buscará un rival de forma aleatoria y el BackEnd guardará y devolvera el resultado

## Extras: Agregar Pokemones y cambiar dirección del BackEnd

Hay un .env en el Front para apuntar a otra dirección del servidor

Se pueden agregar nuevos pokemones, respetando la estructura actual del JSON.
Esto se debe hacer antes de la migración para que se carguen

-   Consideraciones
    Por favor mantener el mismo orden de llave valor que ya hay con el resto de pokemones.


---
Muchas gracias!