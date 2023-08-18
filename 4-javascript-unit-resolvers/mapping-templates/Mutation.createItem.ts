import { util } from '@aws-appsync/utils';

export function request(ctx) {
	const id = util.autoId();
	const { stuff } = ctx.args.input;

	return {
		operation: 'PutItem',
		key: util.dynamodb.toMapValues({ id: id }),
		attributeValues: util.dynamodb.toMapValues({ stuff: stuff }),
	};
}

export function response(ctx) {
	return ctx.result;
}
