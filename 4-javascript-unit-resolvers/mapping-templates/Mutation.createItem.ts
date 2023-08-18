import { util, Context } from '@aws-appsync/utils';
import { CreateItemMutationVariables } from '../../graphql/src/API';

export function request(ctx: Context<CreateItemMutationVariables>) {
	const id = util.autoId();
	const { stuff } = ctx.args.input;

	return {
		operation: 'PutItem',
		key: util.dynamodb.toMapValues({ id: id }),
		attributeValues: util.dynamodb.toMapValues({ stuff: stuff }),
	};
}

export function response(ctx: Context) {
	return ctx.result;
}
