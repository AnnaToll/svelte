import { actions } from "./actions"

export const initState = { 
    listAll: [], 
    balance: '' 
}


export const transactionReducer = (state = initState, action) => {

    if (action.type === actions.GET_ALL) {

        const sortedTransactions = [...action.data.transactions].sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })

        return {
            listAll: sortedTransactions, 
            currentBalance: action.data.balance
        }
    }


    return initState
}