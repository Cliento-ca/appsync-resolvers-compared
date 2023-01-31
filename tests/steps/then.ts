import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

const item_exists_in_dynamodb = async (id) => {
	const params = {
		TableName: process.env.ITEMS_TABLE_NAME,
		Key: {
			id,
		},
	};

	const client = new DynamoDBClient({});
	const response = await client.send(new GetCommand(params));
	expect(response.Item).not.toBeNull();

	return response.Item;
};

const item_does_not_exists_in_dynamodb = async (id) => {
	const params = {
		TableName: process.env.ITEMS_TABLE_NAME,
		Key: {
			id,
		},
	};

	const client = new DynamoDBClient({});
	const response = await client.send(new GetCommand(params));
	expect(response.Item).toBeUndefined();

	return response.Item;
};

const then = {
	item_exists_in_dynamodb,
	item_does_not_exists_in_dynamodb,
};
export default then;
