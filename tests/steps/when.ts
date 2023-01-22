const APP_ROOT = '../../';
import { get } from 'lodash';
const viaHandler = async (event, functionName) => {
	const handler = require(`${APP_ROOT}/lambda-resolvers/functions/${functionName}`).handler;

	const context = {};
	const response = await handler(event, context);
	const contentType = get(response, 'headers.Content-Type', 'application/json');
	if (response.body && contentType === 'application/json') {
		response.body = JSON.parse(response.body);
	}
	return response;
};

const we_invoke_get_item = (event) => viaHandler(event, 'get-item');

const when = {
	we_invoke_get_item,
};
export default when;
