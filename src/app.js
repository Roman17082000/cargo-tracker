import {cargoList} from "./services/cargoService.js";
import {createTable} from "./components/table.js";
import {createForm} from "./components/form.js";
import {createFilter} from "./components/filter.js";

const app = document.getElementById("app");
let filteredCargoList = [...cargoList];

function render() {
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(createTable(filteredCargoList, onStatusChange));
}

function onStatusChange(id, newStatus) {
    const cargo = cargoList.find(cargo => cargo.id === id);

    // Проверка: нельзя устанавливать статус "Доставлен" для грузов с будущей датой отправления
    if (newStatus === "Доставлен" && new Date(cargo.departureDate) > new Date()) {
        alert("Нельзя изменить статус на 'Доставлен' для грузов с будущей датой отправления.");
        render();
        return;
    }

    cargo.status = newStatus;
    render();
}

function onFormSubmit(cargo) {
    cargoList.push(cargo);
    filteredCargoList = [...cargoList];
    render();
}

function onFilterChange(status) {
    filteredCargoList = status ? cargoList.filter(cargo => cargo.status === status) : [...cargoList];
    render();
}

document.getElementById("filter-container").appendChild(createFilter(onFilterChange));
document.getElementById("form-container").appendChild(createForm(onFormSubmit));
render();
