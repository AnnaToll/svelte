import { useEffect } from "react"

// Props:
// messages = String[], if empty component will hide, ex. ["Form was succesfully sent."]
// type = "success" or "error", sets color.
// MSUntilClose = Number, if added setMessagesToClose runs after specified time has ellapsed, ex. 3000
// setMessagesToClose = function, runs after timeout if MSUntilClose is specified, ex. setMessages([])


const Status = ({ messages, type, MSUntilClose = null, setMessagesToClose = () => {} }) => {

    useEffect(() => {

        if (MSUntilClose && messages.length !== 0) {

            setTimeout(() => {

                setMessagesToClose()

            }, MSUntilClose)
        }

    }, [messages])
    

    if (messages.length === 0) {
        return null
    }


    return (
        <div 
            className={`${type === "error" ? 'error-color' : 'success-color'} info-container`}
            data-testid="status"
        >
            {
                messages.map((message, index) => (
                    <div key={index}>
                        <span>•</span>
                        <span>{message}</span> 
                    </div>
                ))
            }
        </div>
    )
}

export default Status