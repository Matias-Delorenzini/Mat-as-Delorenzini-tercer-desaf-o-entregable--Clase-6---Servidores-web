// DESAFÍO ENTREGABLE 3 Matias Delorenzini
// Llamamos a FileSystem
const fs = require("fs");

// Definimos la clase ProductManager
class ProductManager{
    constructor(){
        // Variable que contiene la ruta del archivo a utilizar
        this.path = "./productos.txt"
        // Array vacio (por ahora) de productos
        this.products = []
        // Esto crea el archivo ./productos.txt al crear una instancia de ProductManager
        if (!fs.existsSync(this.path)) {
            fs.promises.writeFile(this.path, JSON.stringify([]));
          }
          
    }
    // Esto será nuestro id autoincrementable
    static id = 0
    //Este método asincrónico añade un producto al archivo
    addProduct = async (productData) => {
        try{
        // Aumentamos en 1 el id
        ProductManager.id++;
        // Creamos un objeto usando los datos del producto ingresado y el id
        let newProduct = { id: ProductManager.id, ...productData };
        // Lo añadimos al array products
        this.products.push(newProduct);
        // Y registramos el nuevo products en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(this.products), (err) => err && console.error(err));
        }catch(error){
            // En caso de que algo salga mal mostramos un mensaje de error
            console.error("Error al añadir el producto:", error);
        }
    }
    // Este método asincrónico muestra todos los productos en el archivo
    getProducts = async () => {
        try {
            // Leemos lo que está en productos.txt
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            // Parseamos para que sea utilizable
            const productos = JSON.parse(contenido);
            // Devolvemos los productos
            return productos;
        } catch (error) {
            // En caso de que algo salga mal, mostramos un mensaje de error
            console.error("Error al obtener los productos:", error);
            throw error; // Puedes decidir lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
        }
    }
    // Este método asincrónico nos muestra un producto específico, que tenga el id proporcionado
    getProductById = async (id) => {
        try {
            // Obtenemos lo que esté en el archivo
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            // Lo parseamos
            let productos = JSON.parse(contenido);
            // Filtramos el producto con el id proporcionado (del array de productos que leimos)
            let productFound = productos.find(product => product.id === id);
            // Si nos retorna null significa que no existe un producto con ese id único
            if (!productFound) {
                console.log("Producto no encontrado");
            } else {
                // En otro caso, si nos retorna un producto, lo mostramos
                return productFound
            }
        } catch (error) {
            // En caso de que algo salga mal mostramos un mensaje de error
            console.error("Error al leer el archivo:", error);
        }
    }
    // Este método asincrónico actualiza un producto (definido por el id especificado), cambiando los campos modificados en el objeto proporcionado
    async updateProduct(id, updatedProduct) {
        try {
            // Leemos el archivo
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            // Lo parseamos
            let products = JSON.parse(contenido);
            // Buscamos el índice del producto que tiene el mismo ID que el proporcionado
            const indexToUpdate = products.findIndex((product) => product.id === id);
            // Verificamos si se encontró el producto
            if (indexToUpdate !== -1) {
                // Si encontramos el producto, actualizamos sus propiedades.
                // Usamos la propagación (...) para copiar todas las propiedades existentes y luego sobrescribimos con las nuevas
                products[indexToUpdate] = { ...products[indexToUpdate], ...updatedProduct };
                // Escribimos el array actualizado de productos de nuevo en el archivo
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                // Imprimimos un mensaje de éxito en la consola
                console.log("Producto actualizado correctamente.");
            } else {
                // Si el producto no fue encontrado, lo informamos en consola
                console.error("Producto no encontrado para actualizar");
            }
        } catch (error) {
            // En caso de que algo más salga mal mostramos un mensaje de error
            console.error("Error al actualizar el producto:", error);
        }
    }
    // Este método asincrónico elimina el producto con el id ingresado
    deleteProduct = async (id) => {
        try {
            // Leemos el archivo
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            // Lo parseamos
            let productos = JSON.parse(contenido);
            // Filtramos el producto que tenga el id que queremos
            let productFilter = productos.filter(product => product.id != id);
            // Si el largo del array original es el mismo que el del nuevo array con el producto (supuestamente) filtrado, significa que no se eliminó ninguno, porque no existía un producto con ese id
            if (productFilter.length === productos.length) {
                console.log("No existe un producto con el ID proporcionado: " + id);
                return;
            }
            else{
                // En otro caso, significa que si se  filtró correctamente, por lo que actualizamos el archivo:
                await fs.promises.writeFile(this.path, JSON.stringify(productFilter), "utf-8");
                console.log("Se ha eliminado el producto con ID " + id);
            }
        } catch (error) {
            // En caso de que algo salga mal mostramos un mensaje de error
            console.error("Error al leer o escribir en el archivo:", error);
        }
    }
}

async function addTenProducts() {
    const manageProducts = new ProductManager();

    await manageProducts.addProduct({
        title: "producto 1", description: "Primer producto", price: 100, thumbnail: "Sin imagen", code: "aaa000", stock: 10
    });
    await manageProducts.addProduct({
        title: "producto 2", description: "Segundo producto", price: 200, thumbnail: "Sin imagen", code: "aaa001", stock: 12
    });
    await manageProducts.addProduct({
        title: "producto 3", description: "Tercer producto", price: 300, thumbnail: "Sin imagen", code: "aaa002", stock: 13
    });
    await manageProducts.addProduct({
        title: "producto 4", description: "Cuarto producto", price: 400, thumbnail: "Sin imagen", code: "aaa003", stock: 14
    });
    await manageProducts.addProduct({
        title: "producto 5", description: "Quinto producto", price: 500, thumbnail: "Sin imagen", code: "aaa004", stock: 25
    });
    await manageProducts.addProduct({
        title: "producto 6", description: "Sexto producto", price: 600, thumbnail: "Sin imagen", code: "aaa005", stock: 26
    });
    await manageProducts.addProduct({
        title: "producto 7", description: "Séptimo producto", price: 700, thumbnail: "Sin imagen", code: "aaa006", stock: 27
    });
    await manageProducts.addProduct({
        title: "producto 8", description: "Octavo producto", price: 800, thumbnail: "Sin imagen", code: "aaa007", stock: 28
    });
    await manageProducts.addProduct({
        title: "producto 9", description: "Noveno producto", price: 900, thumbnail: "Sin imagen", code: "aaa008", stock: 29
    });
    await manageProducts.addProduct({
        title: "producto 10", description: "Décimo producto", price: 10000, thumbnail: "Sin imagen", code: "aaa009", stock: 30
    });

    const allProducts = await manageProducts.getProducts();
    return allProducts;
}

addTenProducts();

module.exports = ProductManager;