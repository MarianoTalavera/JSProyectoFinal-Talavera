export function procesarPedido() {
    carrito.forEach((prod) => {
      const contenedorCompra = document.querySelector('#contenedorCompra')
      const {id, nombre, precio, desc, img, cantidad} = prod;
      const div = document.createElement("div");
      div.innerHTML += `
            <div class="modal-contenedor">
              <div>
                <img class="img-fluid img-carrito" src="${img}"/>
              </div>
              <div>
                <p>${nombre}</p>
                <p>Precio: ${precio.toFixed(2)}</p>
                <p>Cantidad :${cantidad}</p>
                <button class="btn btn-danger" onclick="eliminarProducto(${id})">Quitar producto</button>
              </div>
            </div>
            `;

      contenedorCompra.appendChild(div);
      console.log(contenedorCompra);
    });
  }