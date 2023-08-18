import { util, Context } from '@aws-appsync/utils';
import { GetItemQueryVariables, Item } from '../../graphql/src/API';
export function request(ctx: Context<GetItemQueryVariables>) {
	const { id } = ctx.args;
	return {
		operation: 'GetItem',
		key: util.dynamodb.toMapValues({ id: id }),
		consistentRead: true,
	};
}

export function response(ctx: Context) {
	return ctx.result;
}
