import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const an_item = async () => {
	const dynamoDb = new AWS.DynamoDB.DocumentClient();
	const tableName = process.env.ITEMS_TABLE_NAME;
	const id = uuidv4();
	const params = {
		TableName: tableName,
		Item: { id: id },
	};
	await dynamoDb.put(params).promise();

	console.log(`[${id}] - item is created`);

	return {
		id,
	};
};

const given = {
	an_item,
};
export default given;
