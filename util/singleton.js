const axios = require("axios");

const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * This is a singleton instance for axios.
 * Use this file to define global config like
 *  - Setting BASE URL for the api or
 *  - Use interceptors, on before request or after request (track success and error responses)
 */
class ApiSingleton {
    session;
    isReady;
    config;

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error("Cannot construct Singleton");
        }

        this.session = null;
        this.isReady = false;
        this.config = null;
    }

    static get instance() {
        // Try to get singleton
        if (!this[singleton]) {
            this[singleton] = new ApiSingleton(singletonEnforcer);
        }
        return this[singleton];
    }

    isAxiosReady = () => {
        return this.isReady;
    }

    init = () => {
        this.isReady = true;
        // Use intercetors for any pre request operations. Like defining the API keys

        this.session = axios.create({
            // baseURL: API_BASE_URL,
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Expires": 0,
                "Pragma": "no-cache",
            },
        });

        // this.session.defaults.timeout = 2500

        this.session.interceptors.request.use((request) => {
            /** Use intercetors for any pre request operations. Like defining the API keys */
            // request.headers['Correlation-Id'] = UUID;
            return request;
        });

        this.session.interceptors.response.use(
            (response) => {
                /** Track complete response */
                return response;
            },
            (error) => {
                /** Track error response */
                return Promise.reject(error);
            },
        );
    }

    addConfig = config => this.config = config;

    getConfig = () => this.config;

    get = (url, options) => {
        return this.session.get(url, options);
    }
    post = (url, data, options) => {
        return this.session.post(url, data, options);
    }
    put = (url, data, options) => {
        return this.session.put(url, data, options);
    }

    delete = (url, data) => this.session.delete(url, data);
}

// export default ApiSingleton.instance;

module.exports = ApiSingleton.instance;