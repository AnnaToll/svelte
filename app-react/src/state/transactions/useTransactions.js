import { useContext } from "react"
import { TransactionsContext } from "./transactionsContext"

const useTransactions = () => {

    const data = useContext(TransactionsContext)
    const { state: transactions, toDispatch } = data

    return { transactions, toDispatch  }

}

export default useTransactions