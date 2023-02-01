import { util } from '@aws-appsync/utils';

export function request(ctx) {
	const { id } = ctx.args;
	return {
		operation: 'DeleteItem',
		key: util.dynamodb.toMapValues({ id: id }),
	};
}

export function response(ctx) {
	return ctx.result;
}
