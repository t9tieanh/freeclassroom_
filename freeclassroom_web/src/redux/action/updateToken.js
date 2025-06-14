export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export const doUpdateToken = (data) => {
    return {
        type: UPDATE_TOKEN,
        payload: data
    };
};