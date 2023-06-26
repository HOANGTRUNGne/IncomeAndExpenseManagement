import React from 'react';

export const parseAmount = (value) => {
    const integerPart = Math.floor(value)
    const decimalPart = (value - integerPart).toFixed(2).substring(1)
    return {integerPart, decimalPart}
};


export const calcTotalAmount = (data) => {
    return data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
}

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
