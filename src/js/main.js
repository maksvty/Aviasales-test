import {getData} from "./api.js";
import {createTickets} from "./tickets.js";
import "./sorting.js"
import {compareTicketsByCost, setSortingListener, updateTickets} from "./sorting.js";
import {filter, setFilterListener} from "./filter.js";
import {debounce} from "./util.js";

getData((data) => {
    const filterData = filter(data);
    filterData.sort(compareTicketsByCost);
    createTickets(filterData);

    setSortingListener(() => updateTickets(data));
    setFilterListener(debounce(() => updateTickets(data)));
});

