import init from '../steps/init';
import given from '../steps/given';
import when from '../steps/when';
import teardown from '../steps/teardown';

describe('Given an item', () => {
	let item;

	beforeAll(async () => {
		await init();
		item = await given.an_item();
	});
	afterAll(async () => {
		await teardown.an_item(item.id);
	});

	describe(`When we invoke the get item query with an id`, () => {
		it(`Should return the item for that id`, async () => {
			const event = { id: item.id };
			const res = await when.we_invoke_get_item(event);

			expect(res.statusCode).toEqual(200);
			expect(res.body).toBeDefined();
		});
	});
});
