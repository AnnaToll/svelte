import { TransactionsProvider } from "./transactions/transactionsContext"

const AppProvider = ({ children }) => {

    return (
        <TransactionsProvider>
            {children}
        </TransactionsProvider>
    )
}

export default AppProvider