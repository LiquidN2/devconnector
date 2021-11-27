import jwt_decode from 'jwt-decode';

const tokenIsValid = token => {
    try {
        const decodedData = jwt_decode(token);
        if (decodedData.exp > (Date.now()/1000)) {
            return true;
        } 
        return false;
    } 
    catch(err) {
        return false;
    }
}

export default tokenIsValid;