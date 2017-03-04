export function getErrorDisplayString(error) {
    if(error.response && error.response.status) {
        const code = parseInt(error.response.status);
        switch(code) {
            case 401: return "You do not have enough permissions to access that";
            case 403: return "You are not allowed to access that";
            case 404: return "No Internet";
            case 409: return "Conflict raised";
            case 422: return "Check the inputs given";
        }
        if(code>500) return "Server Error";
    } else return error.message?error.message.toString():error.toString();
}