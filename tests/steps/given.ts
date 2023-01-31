import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { AppSyncClient, EvaluateMappingTemplateCommand } from '@aws-sdk/client-appsync';
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

const an_evaluated_appsync_template = async (template, context) => {
	const client = new AppSyncClient({});
	const command = new EvaluateMappingTemplateCommand({
		template,
		context: JSON.stringify(context),
	});
	const response = await client.send(command);

	if (response.error) {
		throw new Error(response.error.message);
	}

	return JSON.parse(response.evaluationResult);
};

const given = {
	an_item,
	an_evaluated_appsync_template,
};
export default given;
