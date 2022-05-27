const ticketsContainer = document.querySelector('.tickets')

const checkForZeroAdding = (number) => {
    if (number < 10) {
        return `0${number}`;
    }
    return number;
}

const createTime = (segment, item) => {
    const departureDate = new Date(Date.parse(segment.date))
    const arrivalDate = new Date(departureDate.getTime() + segment.duration*60000)

    const departureHours = checkForZeroAdding(departureDate.getUTCHours())
    const departureMinutes = checkForZeroAdding(departureDate.getUTCMinutes())

    const arrivalHours = checkForZeroAdding(arrivalDate.getUTCHours())
    const arrivalMinutes = checkForZeroAdding(arrivalDate.getUTCMinutes())

    item.textContent = `${departureHours}:${departureMinutes} - ${arrivalHours}:${arrivalMinutes}`;
}

const createTravelTime = (duration, item) => {
    const integer = (duration - duration % 60) / 60;
    const remainder = checkForZeroAdding(duration % 60);
    const travelTime = `${integer}ч ${remainder}м`;

    item.textContent = travelTime;
}

const createTransferString = (stops, item) => {
    if (stops.length === 0) {
        item.textContent = 'Без пересадок';
    }
    if (stops.length === 1) {
        item.textContent = `${stops.length} пересадка`;
    }
    if (stops.length > 1 && stops.length < 5) {
        item.textContent = `${stops.length} пересадки`;
    }
    if (stops.length > 4) {
        item.textContent = `${stops.length} пересадок`;
    }
}

const createTicket = (data) => {
    const ticketTemplate = document.querySelector('#ticket').content.querySelector('.ticket');

    const ticket = ticketTemplate.cloneNode(true);

    ticket.querySelector('.ticket__airline-logo').src = `http://pics.avs.io/99/36/${data.carrier}.png`;

    const price = data.price.toLocaleString();
    ticket.querySelector('.ticket__price').textContent = price;

    ticket.querySelectorAll('.ticket__cities').forEach((item, i) => {
        item.textContent = `${data.segments[i].origin} - ${data.segments[i].destination}`
    })

    ticket.querySelectorAll('.ticket__time').forEach((item, i) => {
        createTime(data.segments[i], item);
    })

    ticket.querySelectorAll('.ticket__travel-time').forEach((item, i) => {
        createTravelTime(data.segments[i].duration, item);
    })

    ticket.querySelectorAll('.ticket__transfer').forEach((item, i) => {
        createTransferString(data.segments[i].stops, item);
    })

    ticket.querySelectorAll('.ticket__transfer-cities').forEach((item, i) => {
        item.textContent = data.segments[i].stops.join(', ');
    })

    ticketsContainer.append(ticket);
}

export const createTickets = (data) => {
    ticketsContainer.innerHTML = '';
    data.slice(0, 5).forEach((item) => {
        createTicket(item);
    })
}