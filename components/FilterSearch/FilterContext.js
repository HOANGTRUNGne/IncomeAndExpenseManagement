import React, {createContext, useRef, useState} from 'react';

const FilterContext = createContext()

const FilterProvider = ({children}) => {
    const [filterOption, setFilterOption] = useState({})
    const [dataIncome, setDataIncome] = useState([])
    const [dataSpending, setDataSpending] = useState([])
    const [isTotal, setIsTotal] = useState(false)


    const handleFilter = (values, isBoolean) => {
        setFilterOption(values)
        setIsTotal(isBoolean)
    }
    const handleDataIncomes = (values) => {
        setDataIncome(values)
    }
    const handleDataSpending = (values) => {
        setDataSpending(values)
    }

    const actionRefIncomes = useRef()
    const actionRefSpendings = useRef()

    const value = {
        filterOption, handleFilter, isTotal,
        actionRefIncomes, actionRefSpendings,
        dataIncome, dataSpending,
        handleDataIncomes, handleDataSpending
    }
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export {FilterContext, FilterProvider}

