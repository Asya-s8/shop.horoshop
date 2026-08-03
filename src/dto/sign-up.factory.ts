import Chance from 'chance';
import type { SignUpData } from './sign-up.dto';

const chance = new Chance();

export function createSignUpData(): SignUpData {
  return {
    title: chance.name(),
    email: chance.email({ domain: 'example.com' }),
    password: chance.string({ length: 12, alpha: true, numeric: true }),
  };
}
