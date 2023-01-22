import * as AWS from 'aws-sdk';

const an_item = async (id: string) => {
	const dynamoDb = new AWS.DynamoDB.DocumentClient();
	const tableName = process.env.ITEMS_TABLE_NAME;

	const params = {
		TableName: tableName,
		Key: {
			id: id,
		},
	};
	await dynamoDb.delete(params).promise();

	console.log(`[${id}] - item is deleted`);

	return {
		id,
	};
};

const teardown = {
	an_item,
};

export default teardown;
