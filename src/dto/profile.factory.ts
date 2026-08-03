import Chance from 'chance';
import type { ProfileData } from './profile.dto';

const chance = new Chance();

export function createProfileData(email: string): ProfileData {
  return {
    title: chance.name(),
    email,
    phone: `+38 (099) ${chance.string({ length: 3, pool: '0123456789' })}-${chance.string({ length: 2, pool: '0123456789' })}-${chance.string({ length: 2, pool: '0123456789' })}`,
    city: 'Харків',
    cityId: '35630',
    address: chance.address(),
  };
}
