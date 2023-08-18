import { Context, util } from '@aws-appsync/utils';
import { DeleteItemMutationVariables } from '../../graphql/src/API';

export function request(ctx: Context<DeleteItemMutationVariables>) {
	const { id } = ctx.args;
	return {
		operation: 'DeleteItem',
		key: util.dynamodb.toMapValues({ id: id }),
	};
}

export function response(ctx: Context) {
	return ctx.result;
}
