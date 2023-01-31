import given from '../../steps/given';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import init from '../../steps/init';

const template = fs.readFileSync(
	'./2-vtl-resolvers/mapping-templates/Mutation.createItem.request.vtl',
	'utf8',
);

jest.setTimeout(10000);

beforeAll(async () => {
	init();
});

test('Should compile correctly', async () => {
	const context = {
		arguments: {
			input: {
				stuff: 'stuff',
			},
		},
	};

	const result = await given.an_evaluated_appsync_template(template, context);

	expect(result).toMatchObject({
		attributeValues: {
			stuff: {
				S: context.arguments.input.stuff,
			},
		},
	});
});
