import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { v4 as uuidv4 } from 'uuid';

export const handler = async (event: any) => {
	const item = { id: uuidv4(), stuff: event.arguments.input.stuff };
	const params = {
		TableName: process.env.ITEMS_TABLE_NAME,
		Item: item,
	};

	const client = new DynamoDBClient({});
	await client.send(new PutCommand(params));
	return item;
};
