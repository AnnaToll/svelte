// Props:
// headline = String, ex. "Hello world"
// headlineTagName = String, ex. "h1"


const SectionWrapper = ({ headline, headlineTagName, children }) => {

    const createHeadlineElement = () => {

        if (headlineTagName === "h1") {
            return <h1>{headline}</h1>
        }

        if (headlineTagName === "h2") {
            return <h2>{headline}</h2>
        }

        return <h1>Error. Please enter valid headLineTag ("h1" or "h2").</h1>
    }


    return (
        <div>
            {createHeadlineElement()}
            { children }
        </div>
    )
}

export default SectionWrapper