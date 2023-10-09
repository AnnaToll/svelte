import { useState } from "react"
import useTransactions from "../../state/transactions/useTransactions"

const useFetch = (resInit) => {

    const { toDispatch } = useTransactions()
    const [response, setResponse] = useState(resInit)
    const [error, setError] = useState('')

    const fetchBase = async (url, method = 'GET', dataObj = {}, actionOnOk = null) => {

        setError('')
        setResponse(resInit)
        const requestObject = { method }

        if (method !== 'GET') {

            requestObject.body = JSON.stringify(dataObj)
            requestObject.headers = {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await fetch(`http://localhost:5000${url}`, requestObject)
            const data = await res.json()

            if (!res.ok) {

                setError(data.error)
                setResponse(data)

            } else {

                setError('')
                setResponse(data)

                if (actionOnOk) {

                    toDispatch({
                        type: actionOnOk,
                        data
                    })
                }
            }

        } catch (error) {
            setError('Oops! Something unexpected went wrong.')
        }
    }

    const fetchGet = (url, actionOnOk = null) => {
        fetchBase(url, 'GET', {}, actionOnOk)   
    }

    const fetchPost = (url, dataObj, actionOnOk = null) => {
        fetchBase(url, 'POST', dataObj, actionOnOk)   
    }

    return { response, error, fetchGet, fetchPost }
}

export default useFetch