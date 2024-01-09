// DESAFÍO ENTREGABLE 3 Matias Delorenzini
// Importamos la dependencia de express
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
// Definimos el puerto a usar (8080)
const port = 8080;
// Importamos la clase productmanager
const ProductManager = require("./ProductManager");
// Creamos una instancia de productmanager
const productManager = new ProductManager();

// Definimos el endpoint que lee el archivo de productos y los devuelve dentro de un objeto.
app.get("/products", async (req, res) => {
    try {
        // Usamos limit para definir el limite de producots que se devuelven
        const limit = req.query.limit;
        // Usamos el método getProducts() de productManager para obtener los productos
        const products = await productManager.getProducts();
        // Verifica si hay un valor para limit en la URL que ingresamos
        if (limit) {
            // Si se recibe un límite, sólo devolver el número de productos solicitados
            res.json(products.slice(0, parseInt(limit)));
          } else {
            // Si no se recibe query de límite, se devolverán todos los productos
            res.json(products);
          }
          } catch (error) {
            // Si algo sale mal usamos un error 500 para mostrar que hubo un problema interno del servidor
            res.status(500).json({ error: "Error, no se pudieron encontrar los productos" });
          }
          
});

// Definimos el endpoint que recibe por req.params el Id y devuelve sólo el producto solicitado
app.get("/products/:pid", async (req, res) => {
    try {
        // Obtenemos el id solicitado
        const productId = parseInt(req.params.pid);
        // Usamos el método getProductById de la clase productManager para buscar el producto específico
        const product = await productManager.getProductById(productId);
        if (product) {
            // Si existe lo devolvemos
            res.json(product);
        } else {
            // Si no existe, devolver un código de error http “404 not found”
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        // Si algo sale mal usamos un error 500 para mostrar que hubo un problema interno del servidor
        res.status(500).json({ error: "Error, no se pudieron encontrar los productos" }); 
    }
});

// Con esto, levantamos el servidor en el puerto determinado por la variable port, y avisamos que lo hicimos por consola
app.listen(port, () => {
    console.log(`¡Servidor arriba y escuchando en el puerto ${port}!`);}
);

// NOTA: productos.txt se crea desde ProductManager al inicializar este servidor