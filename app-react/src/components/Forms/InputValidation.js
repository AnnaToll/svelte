// Props:
// format = String, ex. "YYYY-MM-DD-XXX"
// hasError = Boolean, decides icons, ex. example.length === 0

const InputValidation = ({ format, hasError}) => {

    return (
        <div className="input-validation-container small-faded-text">
            {   hasError ?
                    <i className="bi bi-exclamation-circle-fill" />
                    :
                    <i className="bi bi-check-circle-fill success-color" />
            }
            {format}
        </div>
    )
}

export default InputValidation