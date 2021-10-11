const api = require("../../util/api")

const getAPIRequestSample = async({ ...params }) => {
    const { API_URL = null } = await api.getConfig();
    if (!params['name']) return {
        data: null,
        errors: ['Invalid Request']
    };

    console.log('Params data ', params);

    const result = await api.getRequest(API_URL + '?r=' + (new Date()).getTime(), {
        params: {
            otp,
            'Unique-TransactionID': params['UUID'] || '',
        },
        headers: {
            'Unique-TransactionID': params['UUID'] || '',
        },
        timeout: 20000 // 20 seconds request
    }).catch(e => {
        console.log(e.message)
        return {
            data: null,
            errors: ['Invalid Request']
        }
    })
    console.log(JSON.stringify(result.data));
    return result.data;
}


module.exports = {
    getAPIRequestSample
}