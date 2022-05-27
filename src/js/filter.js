const filterForm = document.querySelector('.filter__form');;
const filterAll = filterForm.querySelector('.filter__checkbox--all');
const filters  = filterForm.querySelectorAll('.filter__checkbox--transfer');

const onFilterAllClick = () => {
    filters.forEach(filter => {
        if (filterAll.checked) {
            filter.checked = true;
        } else {
            filter.checked = false;
        }
    })
}

const filterTransfer = (ticket) => {
    const checkedFilters = Array.from(document.querySelectorAll('.filter__checkbox--transfer:checked')).map((ticket) => Number(ticket.value))

    return ticket.segments.every(segment => checkedFilters.includes(segment.stops.length))
        || checkedFilters.length === 0;
}

export const filter = (tickets) => tickets.filter((ticket) => filterTransfer(ticket));

export const setFilterListener = (cb) => {
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filterAll.checked = false;
            cb();
        })
    })
    filterAll.addEventListener('click', () => {
        onFilterAllClick();
        cb();
    })
}