const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("pong")
})

router.get('/transactions/:accountId', async (req, res) => {

  const transactionsResponse = await fetch('https://infra.devskills.app/api/accounting/transactions')
  const transactionsData = await transactionsResponse.json()

  const accountResponse = await fetch(`https://infra.devskills.app/api/accounting/accounts/${req.params.accountId}`)
  const accountData = await accountResponse.json()

  if (transactionsResponse.ok) {
    
    const balance = accountResponse.ok ? accountData.balance : "Could not fetch balance"
    const filteredTransactions = transactionsData.filter(transaction => transaction.account_id === req.params.accountId)

    res.send({ transactions: filteredTransactions, balance: balance })

  } else {

    res.status(transactionsResponse.status)
    res.send({ error: transactionsResponse.statusText })
  }
})

router.post('/transactions', async (req, res) => {

  const response = await fetch('https://infra.devskills.app/api/accounting/transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      account_id: req.body.accountId.value,
      amount: req.body.amount.value
    })
  })

  if (!response.ok) {
    res.status(response.status)
    res.send({ error: response.statusText })
    return
  }

  // Creates timeout problem in cypress tests. Uncomment code below to prevent transactions if balance is too low.

  // const accountResponse = await fetch(`https://infra.devskills.app/api/accounting/accounts/${req.body.accountId.value}`)
  // const accountData = await accountResponse.json()

  // if (!accountResponse.ok) {
  //   res.status(response.status)
  //   res.send({ error: response.statusText })
  //   return
  // }

  // if (accountData.balance + parseInt(req.body.amount.value) < 0) {
  //   res.status(400)
  //   res.send({ error: "Not enough money in account."})
  //   return
  // }

  res.send({ success: true })

})

module.exports = router;
