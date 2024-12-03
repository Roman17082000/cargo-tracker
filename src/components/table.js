import {statuses} from "../services/cargoService.js";

function getStatusClass(status) {
    switch (status) {
        case "Ожидает отправки":
            return "status-waiting"; // Желтый
        case "В пути":
            return "status-in-transit"; // Синий
        case "Доставлен":
            return "status-delivered"; // Зеленый
        default:
            return "";
    }
}

export function createTable(cargoList, onStatusChange) {
    const table = document.createElement("table");
    table.className = "table table-bordered table-hover";
    table.innerHTML = `
        <thead class="table-light">
            <tr>
                <th>Номер груза</th>
                <th>Название</th>
                <th>Статус</th>
                <th>Пункт отправления</th>
                <th>Пункт назначения</th>
                <th>Дата отправления</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    cargoList.forEach((cargo) => {
        const row = document.createElement("tr");

        const statusClass = getStatusClass(cargo.status);

        row.innerHTML = `
            <td>${cargo.id}</td>
            <td>${cargo.name}</td>
            <td>
                <select class="form-select ${statusClass}" data-id="${cargo.id}">
                    ${statuses.map((status) => `
                        <option value="${status}" ${cargo.status === status ? "selected" : ""}>
                            ${status}
                        </option>
                    `).join("")}
                </select>
            </td>
            <td>${cargo.origin}</td>
            <td>${cargo.destination}</td>
            <td>${cargo.departureDate}</td>
        `;
        tbody.appendChild(row);
    });

    tbody.addEventListener("change", (e) => {
        const select = e.target;
        const id = select.getAttribute("data-id");
        const newStatus = select.value;

        select.className = `form-select ${getStatusClass(newStatus)}`;

        onStatusChange(id, newStatus);
    });

    return table;
}
