<script>
    import InputValidation from "../Forms/InputValidation.svelte";
    import Status from "../shared/status/Status.svelte";
    import { validateAndSetErrors, toSingleErrorArray } from '../Forms/utils/formsUtils'
    import transactions from "../stores/TransactionStore";
    import { fetchPostJson, fetchGet } from '../../api/api'

    let errorMessages = []
    let successMessages = []

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

    let transactionDetails = JSON.parse(JSON.stringify(transactionInit))

    const handleChange = (type) => {

        errorMessages = []
        const newTransactionDetails = { ...transactionDetails }
        transactionDetails = validateAndSetErrors(newTransactionDetails, type)
    }

    const handleSubmit = async () => {

        const newErrors = toSingleErrorArray(transactionDetails)

        if (newErrors.length !== 0) {
            errorMessages = newErrors
            return
        }

        const postRes = await fetchPostJson('transactions', transactionDetails)

        if (postRes.error) {

            errorMessages = [postRes.error]
            return
        }

        const accountId = transactionDetails.accountId.value
        transactionDetails = JSON.parse(JSON.stringify(transactionInit))
        errorMessages = []
        successMessages = ['Amount has successfully been transferred.']

        const allTransactions = await fetchGet(`transactions/${accountId}`)

        if (allTransactions.error) {

            return
        }

        const sortedTransactions = [...allTransactions.data.transactions].sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })

        transactions.set({
            listAll: sortedTransactions, 
            currentBalance: allTransactions.data.balance
        })
    }

</script>


<form on:submit|preventDefault={handleSubmit}>
    <label>Account ID
        <InputValidation 
            format={"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}
            hasError={transactionDetails.accountId.errors.length !== 0}
        />
        <input 
            type="text"
            on:keyup={() => handleChange('accountId')}
            bind:value={transactionDetails.accountId.value}
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
            on:keyup={() => handleChange('amount')}
            bind:value={transactionDetails.amount.value}
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
        on:close={() => { successMessages = [] }}
    />
    <input data-type="transaction-submit" type="submit" value="Submit transaction" />
</form>


<style>

    label {
        font-size: 17px;
    }

    input[type="text"], input[type="number"] {
        display: block;
        width: 100%;
        margin-bottom: 24px;
        padding: 7px 10px;
    }

    input[type="submit"] {
        border: none;
        padding: 10px 16px;
        margin-top: 23px;
        border-radius: 2px;
        background-color: rgb(43, 94, 79);
        color: white;
    }   

</style>