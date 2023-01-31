const APP_ROOT = '../../';
import gql from 'graphql-tag';

require('isomorphic-fetch');
import { AWSAppSyncClient, AUTH_TYPE } from 'aws-appsync';

const appSyncConfig = () => ({
	url: process.env.APPSYNC_API_URL,
	region: process.env.AWS_REGION,
	auth: {
		type: 'API_KEY' as AUTH_TYPE.API_KEY,
		apiKey: process.env.APPSYNC_API_KEY,
	},
	disableOffline: true,
});

const initAppSyncClient = () => {
	const config = appSyncConfig();
	return new AWSAppSyncClient(config);
};

const viaHandler = async (event, functionName) => {
	const handler = require(`${APP_ROOT}/1-lambda-resolvers/functions/${functionName}`).handler;
	return await handler(event, {});
};

const we_invoke_create_item = async (stuff: string) => {
	switch (process.env.TEST_MODE) {
		case 'integration':
			return await viaHandler({ arguments: { input: { stuff: stuff } } }, 'create-item');

		case 'e2e':
			const client = initAppSyncClient();
			const response = await client.mutate<{ createItem: any }>({
				mutation: gql`
					mutation createItem($input: CreateItemInput) {
						createItem(input: $input) {
							id
							stuff
						}
					}
				`,
				variables: {
					input: { stuff },
				},
			});
			return response.data.createItem;

		default:
			break;
	}
};
const we_invoke_get_item = async (id) => {
	switch (process.env.TEST_MODE) {
		case 'integration':
			return await viaHandler({ arguments: { id: id } }, 'get-item');
		case 'e2e': {
			const client = initAppSyncClient();
			const response = await client.query<{ getItem: any }>({
				query: gql`
					query getItem($id: ID!) {
						getItem(id: $id) {
							id
						}
					}
				`,
				variables: {
					id,
				},
			});
			return response.data.getItem;
		}
		default:
			break;
	}
};

const we_invoke_update_item = async (id, stuff) => {
	switch (process.env.TEST_MODE) {
		case 'integration':
			return await viaHandler(
				{ arguments: { input: { id: id, stuff: stuff } } },
				'update-item',
			);
		case 'e2e':
			const client = initAppSyncClient();
			const response = await client.mutate<{ updateItem: any }>({
				mutation: gql`
					mutation updateItem($input: UpdateItemInput) {
						updateItem(input: $input) {
							id
							stuff
						}
					}
				`,
				variables: {
					input: { id, stuff },
				},
			});
			return response.data.updateItem;
		default:
			break;
	}
};
const we_invoke_delete_item = async (id) => {
	switch (process.env.TEST_MODE) {
		case 'integration':
			return await viaHandler({ arguments: { id: id } }, 'delete-item');
		case 'e2e':
			const client = initAppSyncClient();
			const response = await client.mutate<{ deleteItem: any }>({
				mutation: gql`
					mutation deleteItem($id: ID!) {
						deleteItem(id: $id) {
							id
						}
					}
				`,
				variables: {
					id,
				},
			});
			return response.data.deleteItem;
		default:
			break;
	}
};

const when = {
	we_invoke_create_item,
	we_invoke_get_item,
	we_invoke_update_item,
	we_invoke_delete_item,
};
export default when;
