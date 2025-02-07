  function nuevoRegistro() {
    const tabla = document.getElementById("tablaSalarios");
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><input type="text" placeholder="Nombre"></td>
      <td><input type="text" placeholder="Apellido"></td>
      <td><input type="text" placeholder="Cargo"></td>
      <td><input type="number" class="input-salario" oninput="calcularSalario(this.parentNode.parentNode)" placeholder="0.00"></td>
      <td class="isss">$0.00</td>
      <td class="afp">$0.00</td>
      <td class="renta">$0.00</td>
      <td class="isr">$0.00</td>
      <td class="neto">$0.00</td>
      <td><button class="btn-remove" onclick="eliminarFila(this)">Eliminar</button></td>
    `;
    tabla.appendChild(fila);
  }

  function eliminarFila(boton) {
    boton.closest("tr").remove();
  }

  function calcularSalario(fila) {
    const salario = parseFloat(fila.querySelector(".input-salario").value) || 0;
    const isss = salario > 1000 ? 30 : salario * 0.03;
    const afp = salario * 0.0725;
    const baseImponible = salario - isss - afp;
    let isr = 0;

    if (baseImponible > 472) {
      if (baseImponible <= 895.24) isr = (baseImponible - 472) * 0.1 + 17.67;
      else if (baseImponible <= 2038.10) isr = (baseImponible - 895.24) * 0.2 + 60;
      else isr = (baseImponible - 2038.10) * 0.3 + 288.57;
    }

    const salarioNeto = baseImponible - isr;

    fila.querySelector(".isss").innerText = `$${isss.toFixed(2)}`;
    fila.querySelector(".afp").innerText = `$${afp.toFixed(2)}`;
    fila.querySelector(".renta").innerText = `$${baseImponible.toFixed(2)}`;
    fila.querySelector(".isr").innerText = `$${isr.toFixed(2)}`;
    fila.querySelector(".neto").innerText = `$${salarioNeto.toFixed(2)}`;
  }