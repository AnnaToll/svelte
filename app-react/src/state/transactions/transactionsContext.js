import { createContext, useReducer } from "react";
import { transactionReducer, initState } from "./transactionsReducer";

export const TransactionsContext = createContext(initState)

export const TransactionsProvider = ({ children }) => {

    const [state, dispatch] = useReducer(transactionReducer, initState)

    const toDispatch = (dispatchObj) => {
        dispatch(dispatchObj)
    }
      

    return (
        <TransactionsContext.Provider value={{ state, toDispatch }}>
            { children }
        </TransactionsContext.Provider>
    )
}