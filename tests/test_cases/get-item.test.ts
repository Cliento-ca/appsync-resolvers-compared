/**
 * get-item test
 *
 * @group integration
 * @group e2e
 */

import given from '../steps/given';
import when from '../steps/when';
import teardown from '../steps/teardown';
import init from '../steps/init';

describe('Given an item', () => {
	let item: { id: any };

	beforeAll(async () => {
		await init();
		item = await given.an_item();
	});
	afterAll(async () => {
		await teardown.an_item(item.id);
	});

	describe(`When we invoke the get item query with an id`, () => {
		it(`Should return the item for that id`, async () => {
			const res = await when.we_invoke_get_item(item.id);
			expect(res).toBeDefined();
			expect(res.id).toBe(item.id);
		});
	});
});
