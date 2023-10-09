import transactions from "../lib/components/stores/TransactionStore"


const fetch = () => {

    const resInit = {
        data: null,
        error: '',
        success: false,
    }
    let response = resInit

    const fetchBase = (url, method = 'GET', dataObj = {}, actionOnOk = null) => {

        console.log("In fetch base")

        response = resInit
        const requestObject = { method }

        if (method !== 'GET') {

            requestObject.body = JSON.stringify(dataObj)
            requestObject.headers = {
                'Content-Type': 'application/json'
            }
        }

        fetch(`http://localhost:5000${url}`, requestObject)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                response.error = ""
                response.data = data 

                if (actionOnOk) {

                    transactions.update(() => {

                        const sortedTransactions = [...data.transactions].sort((a, b) => {
                            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                        })
                
                        return {
                            listAll: sortedTransactions, 
                            currentBalance: data.balance
                        }
                    })
                }
                return response
            })
            .catch(error => {
                console.log(error)
                response.error = "Oops! Something unexpected went wrong."
                return response
            })


        // try {

        //     console.log("In try")
        //     const res = await fetch(`http://localhost:5000${url}`, requestObject)
        //     const data = await res.json()

        //     console.log(res)
        //     console.log(data)

        //     if (!res.ok) {

        //         response.error = data.error
        //         return response

        //     } else {

        //         response.error = ""
        //         response.data = data

        //         if (actionOnOk) {

        //             Transactions.update(() => {

        //                 const sortedTransactions = [...data.transactions].sort((a, b) => {
        //                     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        //                 })
                
        //                 return {
        //                     listAll: sortedTransactions, 
        //                     currentBalance: data.balance
        //                 }
        //             })
        //         }

        //         return response
        //     }

        // } catch (error) {

        //     console.log("catch")
        //     console.log(error)
        //     response.error = "Oops! Something unexpected went wrong."
        //     return response
        // }
    }

    const fetchGet = async (url, actionOnOk = null) => {
        return await fetchBase(url, 'GET', {}, actionOnOk)   
    }

    const fetchPost = async (url, dataObj, actionOnOk = null) => {
        console.log("In fetch post")
        return await fetchBase(url, 'POST', dataObj, actionOnOk)   
    }

    return { fetchGet, fetchPost }
}

export default fetch