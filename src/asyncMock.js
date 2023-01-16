const products = [
    {id: 1, name: "iPhone 14 Pro Max (256 GB) 6 GB RAM - Color Oro", price: 800000, category: "celular", img: "https://http2.mlstatic.com/D_NQ_NP_873385-MLM51559384419_092022-O.webp", stock: 10, description: "El iPhone 14 Pro Max te permite captar detalles increíbles gracias a su cámara gran angular de 48 MP. Además, trae la Dynamic Island y una pantalla siempre activa, para que puedas interactuar con tu iPhone de una forma completamente nueva. Y viene con Detección de Choques, una funcionalidad de seguridad que pide ayuda cuando no estás en condiciones de hacerlo."},
    {id: 2, name: "Macbook 16 GB Disco 512GB SSD I9 11900k - Gris espacial", price: 600000, category: "notebook", img: "https://http2.mlstatic.com/D_NQ_NP_785777-MLA46516504853_062021-O.jpg", stock: 10, description: "La nueva MacBook Pro ofrece a los usuarios más pro un rendimiento revolucionario. Elige entre el chip M1 Pro o el aún más potente M1 Max para resolver las tareas profesionales más exigentes con una excepcional duración de la batería(1). Además, la MacBook Pro trae una espectacular pantalla Liquid Retina XDR de 14 pulgadas y puertos avanzados para sacarle más provecho que nunca(2)."},
    {id: 3, name: "Apple IPad Air 10.9 Wi-Fi 64 GB - Gris espacial", price: 320000, category: "tablet", img: "https://http2.mlstatic.com/D_NQ_NP_612718-MLA52218175587_102022-O.webp", stock: 10, description:"El iPad Air tiene una espectacular pantalla Liquid Retina de 10.9 pulgadas (1) y el superpoderoso chip M1 de Apple para que des rienda suelta a tu creatividad y juegues sin límites dondequiera que vayas. Viene con Touch ID, cámaras avanzadas, USB-C y conexiones Wi-Fi 6. Además, es compatible con el Magic Keyboard y el Apple Pencil (segunda generación)"},
    {id: 4, name: "Motorola Edge 30 128GB gris 8 GB RAM 6.5' 2.5GHZ x8", price: 140000, category: "celular", img: "https://http2.mlstatic.com/D_NQ_NP_988597-MLA50693346006_072022-O.webp", stock: 4, description: "Fotografía profesional en tu bolsilloDescubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados."},
    {id: 5, name: "Notebook gamer Lenovo 15.6 i510300H 16GBRAM 1TB", price: 500000, category: "notebook", img: "https://http2.mlstatic.com/D_NQ_NP_727893-MLA53157673228_012023-O.webp", stock: 0, description:"Notebook gamer Lenovo Legion 15IMH05H phantom black 15.6, Intel Core i5 10300H 16GB de RAM 1TB HDD 128GB SSD, NVIDIA GeForce GTX 1660 Ti 144 Hz 1920x1080px Windows 10 Home"},
    {id: 6, name: "Tablet Samsung Galaxy Tab A8 64GB 4GBRAM", price: 92000, category: "tablet", img: "https://images.fravega.com/f500/c00bd470f07e7f77e832ef11dad3e5c5.jpg", stock: 0, description: "Esta tablet Samsung es la compañera ideal, con capacidad de sobra para cada una de tus actividades. El diseño delgado, compacto y portátil, con facilidad para sostener en una mano, lo convierte en una combinación perfecta de rendimiento y versatilidad."},
]

 export const getProducts = () =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 1000);
    })
  }

  export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 1000)
    })
}

  export const getProductById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === parseInt(id)))
        }, 1000)
    })
}