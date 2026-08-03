import Chance from 'chance';
import type { CheckoutData } from './checkout.dto';

const chance = new Chance();

export function createCheckoutData(): CheckoutData {
  return {
    name: chance.name(),
    phone: `50${chance.string({ length: 7, pool: '0123456789' })}`,
    email: chance.email({ domain: 'example.com' }),
    city: 'Харків',
  };
}
