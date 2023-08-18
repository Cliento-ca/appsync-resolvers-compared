import { Context, util } from '@aws-appsync/utils';
import { UpdateItemMutationVariables } from '../../graphql/src/API';

export function request(ctx: Context<UpdateItemMutationVariables>) {
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

export function response(ctx: Context) {
	return ctx.result;
}
