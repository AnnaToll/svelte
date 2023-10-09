import '../Forms/forms.css'
import { useState, useEffect } from "react"
import InputValidation from "../Forms/InputValidation"
import { validateAndSetErrors, toSingleErrorArray } from "../Forms/utils/formsUtils"
import useFetch from "../../utils/hooks/useFetch"
import { actions } from "../../state/transactions/actions"
import Status from '../lib/status/Status'


const TransactionForm = () => {

    const { response, error, fetchPost } = useFetch({})
    const { fetchGet } = useFetch({})
    const [errorMessages, setErrorMessages] = useState([])
    const [successMessages, setSuccessMessages] = useState([])
    const [accountId, setAccountId] = useState('')

    const transactionInit = {
        accountId: {
            value: '',
            errors: ['Please provide Accound ID.'],
        },
        amount: {
            value: '',
            errors: ['Please provide amount.'],
        }
    }

    const [transactionDetails, setTransactionDetails] = useState(transactionInit)


    const handleChange = (e, type) => {

        const value = e.target.value
        setErrorMessages([])
        const newTransactionDetails = { ...transactionDetails }
        newTransactionDetails[type].value = value

        setTransactionDetails(validateAndSetErrors(newTransactionDetails, type, value))
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = toSingleErrorArray(transactionDetails)

        if (newErrors.length !== 0) {
            setErrorMessages(newErrors)
            return
        } 

        fetchPost('/transactions', transactionDetails)
        
        setAccountId(transactionDetails.accountId.value)
        setErrorMessages([])
        setTransactionDetails(transactionInit)
    }


    useEffect(() => {

        if (response?.success) {
            fetchGet(`/transactions/${accountId}`, actions.GET_ALL)
            setSuccessMessages(['Amount has successfully been transferred.'])
        }

        setErrorMessages(error ? [error] : [])

    }, [response, error])


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Account ID
                <InputValidation 
                    format={"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}
                    hasError={transactionDetails.accountId.errors.length !== 0}
                />
                <input 
                    type="text"
                    value={transactionDetails.accountId.value}
                    onChange={(e) => handleChange(e, 'accountId')}
                    data-type="account-id"
                />
            </label>
            <label>Amount
                <InputValidation 
                    format={"Only numbers"}
                    hasError={transactionDetails.amount.errors.length !== 0}
                />
                <input 
                    type="number"
                    value={transactionDetails.amount.value}
                    onChange={(e) => handleChange(e, 'amount')}
                    data-type="amount"
                />
            </label>
            <Status
                messages={errorMessages}
                type="error"
            />
            <Status
                messages={successMessages} 
                type="success"
                MSUntilClose={3000}
                setMessagesToClose={() => setSuccessMessages([])}
            />
            <input data-type="transaction-submit" type="submit" value="Submit transaction" />
        </form>
    )
}

export default TransactionForm