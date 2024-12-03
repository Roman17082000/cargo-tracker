// form.js
// Форма добавления нового груза

import {cities, statuses} from "../services/cargoService.js";

export function createForm(onSubmit) {
    const form = document.createElement("form");
    form.className = "row g-3";

    form.innerHTML = `
        <div class="col-md-4">
            <label for="cargoName" class="form-label">Название груза</label>
            <input type="text" id="cargoName" class="form-control" required>
        </div>
        <div class="col-md-4">
            <label for="origin" class="form-label">Пункт отправления</label>
            <select id="origin" class="form-select" required>
                <option value="" disabled selected>Выберите город</option>
                ${cities.map(city => `<option value="${city}">${city}</option>`).join("")}
            </select>
        </div>
        <div class="col-md-4">
            <label for="destination" class="form-label">Пункт назначения</label>
            <select id="destination" class="form-select" required>
                <option value="" disabled selected>Выберите город</option>
                ${cities.map(city => `<option value="${city}">${city}</option>`).join("")}
            </select>
        </div>
        <div class="col-md-4">
            <label for="departureDate" class="form-label">Дата отправления</label>
            <input type="date" id="departureDate" class="form-control" required>
        </div>
        <div class="col-md-4">
            <label for="status" class="form-label">Статус</label>
            <select id="status" class="form-select" required>
                ${statuses.map(status => `<option value="${status}">${status}</option>`).join("")}
            </select>
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-primary">Добавить груз</button>
        </div>
    `;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const cargo = {
            id: `CARGO${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            name: form.querySelector("#cargoName").value,
            origin: form.querySelector("#origin").value,
            destination: form.querySelector("#destination").value,
            departureDate: form.querySelector("#departureDate").value,
            status: form.querySelector("#status").value
        };

        onSubmit(cargo);
        form.reset();
    });

    return form;
}
