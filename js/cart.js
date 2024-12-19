document.addEventListener("DOMContentLoaded", function () {
    const cartTable = document.getElementById('cart-table');
    const totalPriceElement = document.getElementById('total-price');
    const products = [
        { id: 1, name: "PC Gamer", price: "S/ 500", image: "/img/product-1.jpg" },
        { id: 2, name: "Audifonos", price: "S/ 500", image: "/img/audifonos.png" },
        { id: 4, name: "Batidora", price: "S/ 500", image: "/img/batidora.png" },
        { id: 5, name: "Licuadora Oster", price: "S/ 500", image: "/img/licuadora oster.png" },
        { id: 6, name: "Drone", price: "S/ 500", image: "/img/product-5.jpg" },
        { id: 7, name: "Reloj", price: "S/ 500", image: "/img/product-6.jpg" },
        { id: 8, name: "Memoria ram", price: "S/ 500", image: "/img/memoria ram.png" },
        { id: 9, name: "ventilador", price: "S/ 500", image: "/img/ventilador.png" },
    ];

    // Función para seleccionar productos aleatorios
    function getRandomProducts() {
        let cart = [];
        for (let i = 0; i < 3; i++) { // Puedes ajustar el número de productos que quieres agregar al carrito
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            cart.push({
                ...randomProduct,
                quantity: Math.floor(Math.random() * 3) + 1,  // Genera una cantidad aleatoria entre 1 y 3
                total: parseFloat(randomProduct.price.replace('S/ ', '').replace(',', '')) * (Math.floor(Math.random() * 3) + 1)  // Total es el precio * cantidad
            });
        }
        return cart;
    }

    const cart = getRandomProducts(); // Llamamos a la función para obtener productos aleatorios

    // Mostrar los productos en la tabla
    let totalPrice = 0;
    cartTable.innerHTML = '';  // Limpiamos la tabla antes de agregar los productos

    cart.forEach(product => {
        totalPrice += product.total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>S/ ${product.total.toFixed(2)}</td>
        `;
        cartTable.appendChild(row);
    });

    totalPriceElement.textContent = `S/ ${totalPrice.toFixed(2)}`;

    // Función de validación para los campos del formulario
    function validateForm() {
        const nombre = document.getElementById("nombre").value;
        const dni = document.getElementById("dni").value;
        const direccion = document.getElementById("direccion").value;
        const celular = document.getElementById("celular").value;
        const email = document.getElementById("email").value;

        clearErrorMessages();

        if (!nombre || !direccion || !email || !dni || !celular) {
            showError("Todos los campos son obligatorios.");
            return false;
        }

        if (!/^\d+$/.test(dni)) {
            showError("El DNI debe contener solo números.");
            return false;
        }

        if (!/^\d{9}$/.test(celular)) {
            showError("El teléfono debe contener exactamente 9 dígitos.");
            return false;
        }

        if (!/^\d{8}$/.test(dni)) {
            showError("El DNI debe contener exactamente 8 dígitos.");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            showError("Por favor ingresa un correo electrónico válido.");
            return false;
        }

        return true;
    }

    // Mostrar el mensaje de error
    function showError(message) {
        const errorContainer = document.getElementById("error-messages");
        errorContainer.textContent = message;
        errorContainer.classList.remove("d-none");
    }

    // Limpiar los mensajes de error
    function clearErrorMessages() {
        const errorContainer = document.getElementById("error-messages");
        errorContainer.textContent = "";
        errorContainer.classList.add("d-none");
    }

    // Mostrar mensaje interactivo al hacer clic en "Pagar Ahora"
    document.getElementById("payment-form").addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validateForm()) {
            return; // Si no pasa la validación, no se envía el formulario
        }

        const nombre = document.getElementById("nombre").value;
        const dni = document.getElementById("dni").value;
        const direccion = document.getElementById("direccion").value;
        const celular = document.getElementById("celular").value;
        const email = document.getElementById("email").value;

        // Calcula la cantidad total de productos
        let cantidad = 0;
        cart.forEach(item => cantidad += item.quantity); 

        // Muestra el mensaje en un cuadro de texto
        const mensaje = `
            <h4>¡Gracias por tu compra, ${nombre}!</h4>
            <p><strong>Detalles del pedido:</strong></p>
            <ul>
                <li><strong>Cantidad de productos:</strong> ${cantidad}</li>
                <li><strong>Total a pagar:</strong> S/ ${totalPriceElement.textContent.replace('S/ ', '')}</li>
            </ul>
            <p><strong>Información de contacto:</strong></p>
            <ul>
                <li><strong>DNI:</strong> ${dni}</li>
                <li><strong>Dirección:</strong> ${direccion}</li>
                <li><strong>Celular:</strong> ${celular}</li>
                <li><strong>Correo Electrónico:</strong> ${email}</li>
            </ul>
            <p>Procesaremos tu pedido en breve. ¡Gracias por confiar en Scott Shop!</p>
        `;

        // Mostrar el mensaje en el contenedor de pago
        const paymentInfoContainer = document.getElementById("payment-info");
        paymentInfoContainer.innerHTML = mensaje; // Inserta el mensaje en el contenedor
        paymentInfoContainer.classList.remove('d-none'); // Asegura que el contenedor sea visible
    });
});
