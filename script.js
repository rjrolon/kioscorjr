// --- Ventas ---
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];

function agregarVenta() {
    const descripcion = document.getElementById('venta-descripcion').value;
    const monto = parseFloat(document.getElementById('venta-monto').value);
    const metodoPago = document.getElementById('venta-metodo').value;
    const fecha = new Date().toLocaleString();

    if (!isNaN(monto)) {
        ventas.push({ descripcion, monto, metodoPago, fecha });
        localStorage.setItem('ventas', JSON.stringify(ventas));
        mostrarVentas();
        document.getElementById('venta-form').reset();
    } else {
        alert('Por favor, ingresa un monto válido para la venta.');
    }
}

function mostrarVentas() {
    const tablaVentas = document.getElementById('tabla-ventas');
    tablaVentas.innerHTML = `
        <thead>
            <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Método de Pago</th>
                <th>Fecha y Hora</th>
            </tr>
        </thead>
        <tbody>
            ${ventas.map(venta => `
                <tr>
                    <td>${venta.descripcion || '-'}</td>
                    <td>${venta.monto}</td>
                    <td>${venta.metodoPago}</td>
                    <td>${venta.fecha}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
}

function exportarVentasCSV() {
    if (ventas.length === 0) {
        alert('No hay ventas para exportar.');
        return;
    }

    const encabezados = Object.keys(ventas[0]).join(',');
    const filas = ventas.map(venta => Object.values(venta).join(',')).join('\n');
    const csvData = encabezados + '\n' + filas;

    descargarArchivoCSV(csvData, 'ventas.csv');
}

// --- Egresos ---
let egresos = JSON.parse(localStorage.getItem('egresos')) || [];

function agregarEgreso() {
    const descripcion = document.getElementById('egreso-descripcion').value;
    const monto = parseFloat(document.getElementById('egreso-monto').value);
    const fecha = new Date().toLocaleString();

    if (!isNaN(monto)) {
        egresos.push({ descripcion, monto, fecha });
        localStorage.setItem('egresos', JSON.stringify(egresos));
        mostrarEgresos();
        document.getElementById('egreso-form').reset();
    } else {
        alert('Por favor, ingresa un monto válido para el egreso.');
    }
}

function mostrarEgresos() {
    const tablaEgresos = document.getElementById('tabla-egresos');
    tablaEgresos.innerHTML = `
        <thead>
            <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha y Hora</th>
            </tr>
        </thead>
        <tbody>
            ${egresos.map(egreso => `
                <tr>
                    <td>${egreso.descripcion}</td>
                    <td>${egreso.monto}</td>
                    <td>${egreso.fecha}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
}

function exportarEgresosCSV() {
    if (egresos.length === 0) {
        alert('No hay egresos para exportar.');
        return;
    }

    const encabezados = Object.keys(egresos[0]).join(',');
    const filas = egresos.map(egreso => Object.values(egreso).join(',')).join('\n');
    const csvData = encabezados + '\n' + filas;

    descargarArchivoCSV(csvData, 'egresos.csv');
}

// --- Función de utilidad para descargar CSV ---
function descargarArchivoCSV(csvData, nombreArchivo) {
    const archivoCSV = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const urlDescarga = URL.createObjectURL(archivoCSV);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = urlDescarga;
    enlaceDescarga.download = nombreArchivo;
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    document.body.removeChild(enlaceDescarga);
    URL.revokeObjectURL(urlDescarga);
}

// Cargar los datos al cargar la página
mostrarVentas();
mostrarEgresos();
