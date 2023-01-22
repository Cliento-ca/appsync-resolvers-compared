import { util } from '@aws-appsync/utils';

export function request(ctx) {
	const { id } = ctx.args;
	return {
		operation: 'GetItem',
		key: util.dynamodb.toMapValues({ id: id }),
		consistentRead: true,
	};
}

export function response(ctx) {
	return ctx.result;
}
