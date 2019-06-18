const HttpStatus = require('http-status-code');

const httpResponse = {
    success:( response , data )=>{
        response.status(200).json(data);
    },
    error:( response , error )=>{
        response.status( error.status || 500 ).json(error)
    }
};

module.exports = httpResponse;