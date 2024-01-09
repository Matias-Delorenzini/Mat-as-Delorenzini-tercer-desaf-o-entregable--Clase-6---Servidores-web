app.js:
- Importa y configura Express
- Establece el "port" en 8080
- Importa la clase ProductManager y crea una instancia
- Define los endpoints:
  * el GET /products lee el archivo de productos.txt y devuelve un objeto. Se le da un parámetro "limit" para limitar la cantidad de productos devueltos
  * el segundo es GET /products/:pid que Recibe el ID del producto como parámetro de ruta y devuelve solo el producto solicitado
- Inicia el servidor en el puerto definido con port

ProductManager.js:
- Importa el módulo FileSystem (fs)
- Define la clase ProductManager, que gestiona la lógica de los productos
- El constructor crea "./productos.txt" si no existe y lo inicializa con un array vacío de productos
- Define métodos asincrónicos para añadir, leer, actualizar y eliminar productos
- Con el método addTenProducts se añaden diez productos cuano se inicializa el servidor con app.js
