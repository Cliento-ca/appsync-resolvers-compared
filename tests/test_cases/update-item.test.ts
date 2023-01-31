/**
 * create-item test
 *
 * @group integration
 * @group e2e
 */

import given from '../steps/given';
import when from '../steps/when';
import teardown from '../steps/teardown';
import init from '../steps/init';
import then from '../steps/then';

describe('Given an item', () => {
	let item;

	beforeAll(async () => {
		init();
		item = await given.an_item();
	});
	afterAll(async () => {
		await teardown.an_item(item.id);
	});

	describe(`When we invoke the update item mutation with an id`, () => {
		it(`Should update the item for that id`, async () => {
			item.stuff = 'stuff2';
			await when.we_invoke_update_item(item.id, item.stuff);
			const fromDB = await then.item_exists_in_dynamodb(item.id);
			expect(fromDB.stuff).toBe(item.stuff);
		});
	});
});
