import { util } from '@aws-appsync/utils';

export function request(ctx) {
	const { id, stuff } = ctx.args.input;
	return {
		operation: 'UpdateItem',
		key: util.dynamodb.toMapValues({ id: id }),
		update: {
			expression: 'SET #stuff = :stuff',
			expressionNames: {
				'#stuff': 'stuff',
			},
			expressionValues: util.dynamodb.toMapValues({ ':stuff': stuff }),
		},
	};
}

export function response(ctx) {
	return ctx.result;
}
