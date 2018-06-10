export const createAction = type => payload => ({type, payload});

export const isEmpty = str => str === '' || str === undefined || str === null;
