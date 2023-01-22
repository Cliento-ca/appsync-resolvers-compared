import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.ITEMS_TABLE_NAME;
export const handler = async (event: any) => {
	const id = uuidv4();
	const params = {
		TableName: tableName,
		Item: { id: id },
	};
	try {
		await dynamoDb.put(params).promise();
		return { statusCode: 200, body: JSON.stringify({ message: 'Item inserted successfully' }) };
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Error inserting item', error: error.message }),
		};
	}
};
