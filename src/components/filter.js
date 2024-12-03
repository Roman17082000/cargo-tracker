import {statuses} from "../services/cargoService.js";

export function createFilter(onFilterChange) {
    const filter = document.createElement("div");
    filter.className = "mb-3";

    filter.innerHTML = `
        <label for="statusFilter" class="form-label">Фильтр по статусу</label>
        <select id="statusFilter" class="form-select">
            <option value="">Все</option>
            ${statuses.map(status => `<option value="${status}">${status}</option>`).join("")}
        </select>
    `;

    filter.querySelector("#statusFilter").addEventListener("change", (e) => {
        onFilterChange(e.target.value);
    });

    return filter;
}
