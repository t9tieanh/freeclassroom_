export const UPDATE_USER = 'UPDATE_USER';
export const DeleteUser = 'DELETE_USER';

export const doUpdateUser = (data) => {
    return {
        type: UPDATE_USER,
        payload: data
    };
};

export const doDeleteUser = () => {
    return {
        type: DeleteUser
    };
};
