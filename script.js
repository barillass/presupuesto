const ingresosTable = document.getElementById('ingresos-table');
const egresosTable = document.getElementById('egresos-table');
const totalElement = document.getElementById('total');
const tipoSelect = document.getElementById('tipo');
const cantidadInput = document.getElementById('cantidad');
const detalleInput = document.getElementById('detalle');

function agregarMovimiento() {
    const tipo = tipoSelect.value;
    const cantidad = parseFloat(cantidadInput.value);
    const detalle = detalleInput.value.trim();

    if (isNaN(cantidad) || detalle === '') {
        alert('Por favor, ingresa una cantidad válida y un detalle.');
        return;
    }

    const movimiento = {
        tipo,
        cantidad,
        detalle
    };

    if (movimiento.tipo === 'ingreso') {
        mostrarMovimiento(movimiento, ingresosTable);
    } else {
        mostrarMovimiento(movimiento, egresosTable);
    }

    actualizarBalance();
    limpiarInputs();
}

function mostrarMovimiento(movimiento, table) {
    const row = table.insertRow();
    const detalleCell = row.insertCell(0);
    const cantidadCell = row.insertCell(1);
    const deleteCell = row.insertCell(2);

    detalleCell.textContent = movimiento.detalle;
    cantidadCell.textContent = movimiento.cantidad.toFixed(2);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = () => eliminarMovimiento(row, movimiento.cantidad, movimiento.tipo);

    deleteCell.appendChild(deleteButton);
}

function eliminarMovimiento(row, cantidad, tipo) {
    const table = row.parentElement;
    table.removeChild(row);

    if (tipo === 'ingreso') {
        actualizarBalance({ tipo: 'ingreso', cantidad: -cantidad });
    } else {
        actualizarBalance({ tipo: 'egreso', cantidad: -cantidad });
    }
}

function actualizarBalance() {
    let totalIngresos = 0;
    let totalEgresos = 0;

    for (let i = 1; i < ingresosTable.rows.length; i++) {
        totalIngresos += parseFloat(ingresosTable.rows[i].cells[1].textContent);
    }

    for (let i = 1; i < egresosTable.rows.length; i++) {
        totalEgresos += parseFloat(egresosTable.rows[i].cells[1].textContent);
    }

    const total = totalIngresos - totalEgresos;
    totalElement.textContent = total.toFixed(2);
}

function limpiarInputs() {
    cantidadInput.value = '';
    detalleInput.value = '';
}