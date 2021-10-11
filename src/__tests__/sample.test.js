const request = require('supertest')
const app = request('http://localhost:8080');

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })

    // Sample API Request using supertest
    /* 
    it('should be successful response', async () => {
        const res = await app
          .post('/searchTemplate')
          .send({
            searchstr: 'sample'
          })
        const result = res.body.data;
        console.log(result)
        expect(res.statusCode).toEqual(200)
        expect(result).toHaveProperty('Items')
    })
    */

})
