// import modules from "../../ui/src/modules";

const ApiSingleton = require("./singleton");

/**
 * Create a new instance of axios if not exists.
 * This usually happens on app load
 */
const initRequestObj = async () => {
	const apiSingleton = ApiSingleton;
	if (!apiSingleton.isAxiosReady()) {
		apiSingleton.init();
	}
	return apiSingleton;
};

const initWithConfig = async config => {
	const request = await initRequestObj();
	if (request) {
		return request.addConfig(config);
	}
};

const getConfig = async () => {
	const request = await initRequestObj();
	if (request) {
		return request.getConfig();
	}
};

const getRequest = async (url, options = {}) => {
	const request = await initRequestObj();
	if (request) {
		return request.get(url, options);
	}
};

const postRequest = async (url, data, options = {}) => {
	const request = await initRequestObj();
	if (request) {
		return request.post(url, data, options);
	}
};

const putRequest = async (url, data, options = {}) => {
	const request = await initRequestObj();
	if (request) {
		return request.put(url, data, options);
	}
};

const deleteRequest = async (url, data = {}) => {
	const request = await initRequestObj();
	if (request) {
		return request.delete(url, data);
	}
};

const customRequest = async (options = {}) => {
	const request = await initRequestObj();
	if (request) {
		return request.create(options);
	}
};

module.exports = {
	initWithConfig,
	getConfig,
	getRequest,
	postRequest,
	putRequest,
	deleteRequest,
	customRequest
}