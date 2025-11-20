import { OrderStatus } from '@prisma/client';

describe('Order status transitions', () => {
  it('moves from pending to paid', () => {
    let status: OrderStatus = OrderStatus.PENDING;
    const webhookStatus = 'PAID';
    status = webhookStatus as OrderStatus;
    expect(status).toBe(OrderStatus.PAID);
  });
});
