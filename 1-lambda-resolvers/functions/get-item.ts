import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (event: any) => {
	const { id } = event.arguments;
	const params = {
		TableName: process.env.ITEMS_TABLE_NAME,
		Key: {
			id: id,
		},
	};

	const client = new DynamoDBClient({});
	const response = await client.send(new GetCommand(params));
	return response.Item;
};
