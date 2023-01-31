import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (event: any) => {
	const { id, stuff } = event.arguments.input;
	const params = {
		TableName: process.env.ITEMS_TABLE_NAME,
		Key: {
			id: id,
		},
		UpdateExpression: 'set stuff = :s',
		ExpressionAttributeValues: {
			':s': stuff,
		},
	};

	const client = new DynamoDBClient({});
	await client.send(new UpdateCommand(params));
	return { id, stuff };
};
