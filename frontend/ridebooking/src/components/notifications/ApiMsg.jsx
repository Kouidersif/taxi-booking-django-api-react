import { useContext, useEffect } from "react"
import AppContext from "../../../context/useAppContext"


const ApiMsg = () => {
    const { errorAPI, successMsgAPI, setErrorAPI, setSuccessMsgAPI } = useContext(AppContext);

    useEffect(() => {
    const hideMessages = () => {
        setErrorAPI('');
        setSuccessMsgAPI('');
    };

    if (errorAPI || successMsgAPI) {
        // Set a timeout to hide the messages after 4 seconds
        const timeout = setTimeout(hideMessages, 4000);

        // Clear the timeout if either success or error messages change
        return () => clearTimeout(timeout);
    }
    }, [errorAPI, successMsgAPI]);

    return (
        <div
            id="alert-border-1"
            className={`fixed right-4 z-30 items-center p-4 mb-4 text-white rounded-sm ${errorAPI ? "bg-red-800 flex" : successMsgAPI ? "bg-green-800 flex" : "hidden"}`}
            role="alert"
        >
            <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ml-3 text-sm font-medium">
                {
                    successMsgAPI ? successMsgAPI : errorAPI ? errorAPI : ""
                }
            </div>
        </div>

    )
}

export default ApiMsg