import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.ITEMS_TABLE_NAME;
export const handler = async (event: any) => {
	const { id } = event;
	const params = {
		TableName: tableName,
		Key: {
			id: id,
		},
	};

	try {
		const result = await dynamoDb.get(params).promise();
		return { statusCode: 200, body: JSON.stringify(result.Item) };
	} catch (error) {
		return {
			statusCode: error.statusCode || 501,
			headers: { 'Content-Type': 'text/plain' },
			body: "Couldn't fetch the item.",
		};
	}
};
