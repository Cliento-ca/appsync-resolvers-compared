import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (event: any) => {
	const { id } = event.arguments;
	const params = {
		TableName: process.env.ITEMS_TABLE_NAME,
		Key: {
			id: id,
		},
	};

	const client = new DynamoDBClient({});
	await client.send(new DeleteCommand(params));
	return { id };
};
