import {createTickets} from "./tickets.js";
import {filter} from "./filter.js";

export const compareTicketsByCost = (adA, adB) => {
    const priceA = adA.price;
    const priceB = adB.price;
    return priceA - priceB;
};

export const sortByCost = (data) => {
    const filterData = filter(data);
    filterData.sort(compareTicketsByCost);
    createTickets(filterData);
}

const compareTicketsBySpeed = (adA, adB) => {
    const speedA = adA.segments[0].duration + adA.segments[1].duration;
    const speedB = adB.segments[0].duration + adB.segments[1].duration;
    return speedA - speedB;
};

const sortBySpeed = (data) => {
    const filterData = filter(data);
    filterData.sort(compareTicketsBySpeed);
    createTickets(filterData);
}

export const updateTickets = (data) => {
    const sortingButtons = document.querySelectorAll('.sorting__radio')
    sortingButtons.forEach(button => {
        if (button.checked) {
            button.parentNode.classList.add('sorting__label--active')
        } else {
            button.parentNode.classList.remove('sorting__label--active')
        }
    })

    const checkedSortingButton = document.querySelector('.sorting__radio:checked');
    if (checkedSortingButton.value === 'cost') {
        sortByCost(data);
    } else {
        sortBySpeed(data);
    }
}

const sortingForm = document.querySelector('.sorting__form')
export const setSortingListener = (cb) => sortingForm.addEventListener('change', () => cb())


