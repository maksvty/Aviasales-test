const API_URL = 'http://localhost:3000/tickets';

export const getData = (onSuccess, onFail) => {
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            onSuccess(data);
        })
        .catch(() => {
            onFail();
        });
};