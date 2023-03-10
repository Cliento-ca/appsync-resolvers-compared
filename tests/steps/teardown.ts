import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

const an_item = async (id: string) => {
	const params = {
		TableName: process.env.ITEMS_TABLE_NAME,
		Key: {
			id: id,
		},
	};
	const client = new DynamoDBClient({});
	await client.send(new DeleteCommand(params));

	console.log(`[${id}] - item is deleted`);

	return {
		id,
	};
};

const teardown = {
	an_item,
};

export default teardown;
