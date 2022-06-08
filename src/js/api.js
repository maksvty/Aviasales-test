const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/'
})

export const getData = (onSuccess) => {
    instance.get('tickets')
        .then((responce) => {
            onSuccess(responce.data);
        })
};