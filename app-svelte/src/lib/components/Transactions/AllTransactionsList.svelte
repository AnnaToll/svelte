<script>
    import transactions from '../stores/TransactionStore'

    $: newTransactionsList = $transactions.listAll.map(transaction => {

        const isNegativeAmount = transaction.amount < 0

        const newTransaction = { ...transaction }
        newTransaction.displayAmount = isNegativeAmount ? Math.abs(transaction.amount) : transaction.amount
        newTransaction.toOrFrom = isNegativeAmount ? 'from' : 'to'
        newTransaction.minusOrEmpty = isNegativeAmount ? '-' : ''

        return newTransaction
    })

</script>

<div>
    {#each newTransactionsList as transaction, i (transaction.transaction_id)}
        <div 
            data-type="transaction"
            data-account-id={transaction.account_id}
            data-amount={transaction.amount}
            data-balance={$transactions.currentBalance}
            class="list-item"
        >
            Transferred {transaction.minusOrEmpty}${transaction.displayAmount} {transaction.toOrFrom} {transaction.account_id}
            {#if i === 0}
                <div class="list-item-attention">
                    Current account balance: ${$transactions.currentBalance} 
                </div>
                
            {/if}
        </div>
    {/each}
</div>
    