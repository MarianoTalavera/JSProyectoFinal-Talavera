const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')



if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCarrito();

  if (activarFuncion) {
    document.querySelector("#activarFuncion").click(procesarPedido);
  }
}
);

if (formulario) {
  formulario.addEventListener('submit', enviarCompra)
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  }
  )
};

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "Tu carrito de tés está vacío!",
        text: "Añade algún té para continuar comprando",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      location.href = "compra.html";
      procesarPedido()
    }
  }
  )
};


const fetchProducts = async () => {
  const productsApi = await fetch('tes.json')
  const productsJSON = await productsApi.json()
  return productsJSON
}

const renderProducts = async () => {
  const stockProductos = await fetchProducts()
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
     <img class="card-img-top" src="${img}" alt="Card image cap">
      <div class="card-body">
       <h5 class="card-title">${nombre}</h5>
       <p class="card-text">Precio: ${precio.toFixed(2)}</p>
       <p class="card-text">Descripción: ${desc}</p>
       <p class="card-text">Cant.: ${cantidad}</p>
       <button class="btn btn-dark" onclick="agregarProducto(${id})">Añadir</button>
      </div>
    </div>
     `;
    }
  })
};

renderProducts()
let carrito = [];

const agregarProducto = async (id) => {
  const stockProductos = await fetchProducts(id)
  const item = stockProductos.find((prod) => prod.id === id);
  carrito.push(item);
  console.log(carrito);

  mostrarCarrito();
};


const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
          <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
          <p>Producto: ${nombre}</p>
          <p>Precio: ${precio.toFixed(2)}</p>
          <p>Cantidad :${cantidad}</p>
          <button class="btn btn-danger" onclick="eliminarProducto(${id})">Quitar té</button>
        </div>
      </div>
      
      `;
    })
  };


  if (carrito.length === 0) {
    console.log("Sin tés comprados");
    modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">Aún no agregaste tés ;)</p>
      `;
  } else {
  }

  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio, 0
    )
  };

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const teId = id;
  carrito = carrito.filter((juego) => juego.id !== teId);
  mostrarCarrito();
}

function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
                <td><img class="img-fluid img-carrito" src="${img}"/></td>
                <td>${nombre}</td>
                <td>${precio.toFixed(2)}</td>
                <td>${cantidad}</td>
                <td>${precio.toFixed(2) * cantidad}</td>
              `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e) {
  e.preventDefault()
  const cliente = document.querySelector('#cliente').value
  const correo = document.querySelector('#correo').value

  if (correo === '' || cliente == '') {
    Swal.fire({
      title: "Debes completar tu nombre de usuario y correo!",
      text: "Completa por favor el formulario",
      icon: "error",
      confirmButtonText: "OK",
    })
  } else {
    console.log("Usuario: " + cliente + " | " + "Correo: " + correo);
  }

  localStorage.clear()

  const alertExito = document.createElement('p')
  alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'fs-1', 'mt-2', 'alert-info')
  alertExito.textContent = 'Namasté! Muchas gracias! Nos contactaremos contigo dentro de las 24 hs para concretar el pago y la entrega'
  formulario.appendChild(alertExito)

  setTimeout(() => {
    alertExito.remove()
  },
    5000)



}