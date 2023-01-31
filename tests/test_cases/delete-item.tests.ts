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

	describe(`When we invoke the delete item mutation with an id`, () => {
		it(`Should return the item for that id`, async () => {
			item = await when.we_invoke_delete_item(item.id);

			expect(item).toBeDefined();

			await then.item_does_not_exists_in_dynamodb(item.id);
		});
	});
});
