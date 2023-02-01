/**
 * create-item test
 *
 * @group integration
 * @group e2e
 */

import when from '../steps/when';
import then from '../steps/then';
import teardown from '../steps/teardown';
import init from '../steps/init';

let item: { id: string; stuff: string };

beforeAll(async () => {
	init();
});

afterAll(async () => {
	await teardown.an_item(item.id);
});

describe(`When we invoke the create item mutation`, () => {
	it(`Should return the item for that id`, async () => {
		const stuff = 'stuff';
		item = await when.we_invoke_create_item(stuff);

		expect(item).toBeDefined();
		expect(item.id).toBeDefined();
		expect(item.stuff).toBe(stuff);

		await then.item_exists_in_dynamodb(item.id);
	});
});
