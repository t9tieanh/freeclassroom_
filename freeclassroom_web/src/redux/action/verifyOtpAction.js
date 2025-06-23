export const PENDING_USERNAME = 'PENDING_USERNAME';

export const doSavePendingUserName = (data) => {
    return {
        type: PENDING_USERNAME,
        payload: data
    };
};