const api = require("../../util/api")
// const mockData = require("../__mock_data__/menuData.json");

const getAllPosts = async () => {
    
    console.log('Started api request');
    const { API_URL = null, IS_MOCK = false } = process.env;

    // return mock data
    if(IS_MOCK)
        return [];

    const result = await api.getRequest(API_URL + '?r=' + (new Date()).getTime(), {
        params: {},
        headers: {},
        timeout: 20000
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

// const getAllPosts = () => {
//   return users;
// }


module.exports = {
  getAllPosts
}
