export const fetchPostJson = async (endPoint, obj) => {

    const response = {
        error: '',
        data: null
    }

    try {
        const res = await fetch(`http://localhost:5000/${endPoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await res.json()
    
        if (!res.ok) {
    
            response.error = data.error
    
        } else {
    
            response.data = data
        }

    } catch(error) {
        response.error = "Oops! Something unexpected went wrong."
    }

    return response
}


export const fetchGet = async (endPoint) => {

    const response = {
        error: '',
        data: null
    }

    try {
        const res = await fetch(`http://localhost:5000/${endPoint}`)
        const data = await res.json()
    
        if (!res.ok) {
    
            response.error = data.error
    
        } else {
    
            response.data = data
        }

    } catch(error) {
        response.error = "Oops! Something unexpected went wrong."
    }

    return response

}