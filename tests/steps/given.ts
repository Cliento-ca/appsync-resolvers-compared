import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { v4 as uuidv4 } from 'uuid';

const an_item = async () => {
	const id = uuidv4();
	const params = {
		TableName: process.env.ITEMS_TABLE_NAME,
		Item: { id: id },
	};

	const client = new DynamoDBClient({});
	await client.send(new PutCommand(params));
	console.log(`[${id}] - item is created`);

	return {
		id,
	};
};

const given = {
	an_item,
};
export default given;
