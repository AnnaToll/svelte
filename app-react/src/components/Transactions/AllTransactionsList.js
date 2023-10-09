import useTransactions from "../../state/transactions/useTransactions"

const AllTransactionsList = () => {

    const { transactions } = useTransactions()
    
    return (
        <div>
            {transactions.listAll.map((transaction, index) => {

                const isNegativeAmount = transaction.amount < 0
                const amount = isNegativeAmount ? Math.abs(transaction.amount) : transaction.amount
                const toOrFrom = isNegativeAmount ? 'from' : 'to'
                const minusOrEmpty = isNegativeAmount ? '-' : ''

                return (
                    <div 
                        key={transaction.transaction_id}
                        data-type="transaction"
                        data-account-id={`${transaction.account_id}`}
                        data-amount={`${transaction.amount}`}
                        data-balance={`${transactions.currentBalance}`}
                        className="list-item"
                    >
                        {`Transferred ${minusOrEmpty}$${amount} ${toOrFrom} ${transaction.account_id}`}
                        {index === 0 && (
                            <div className="list-item-attention">
                                Current account balance: ${transactions.currentBalance} 
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default AllTransactionsList