import { testMapZohoItem } from '../lib/zohoInventory';

describe('Zoho mapping', () => {
  it('maps Zoho item to product shape', () => {
    const product = testMapZohoItem({
      item_id: '123',
      name: 'Brake Disc',
      description: 'Front disc',
      rate: 1200,
      sku: 'BR-001',
      stock_on_hand: 5,
      custom_fields: [
        { label: 'Used', value: 'false' },
        { label: 'Class', value: 'C-Class' },
        { label: 'Engine', value: 'M274' },
        { label: 'Category', value: 'Brakes' }
      ],
      image_url: 'https://example.com/image.jpg'
    } as any);

    expect(product.externalId).toBe('123');
    expect(product.isUsed).toBe(false);
    expect(product.modelClass).toBe('C-Class');
    expect(product.engineCode).toBe('M274');
    expect(product.category).toBe('Brakes');
    expect(product.images[0]).toContain('image.jpg');
  });
});
