import { test, expect } from '@playwright/test';
import { AuthApi } from '../../src/api/auth.api';
import { ProfileApi } from '../../src/api/profile.api';
import { createProfileData } from '../../src/dto/profile.factory';
import { createSignUpData } from '../../src/dto/sign-up.factory';

test.describe('POST /profile/save/', () => {
  const authApi = new AuthApi();
  const profileApi = new ProfileApi();

  test('updates profile data', async () => {
    const user = createSignUpData();
    const { cookie } = await authApi.signUp(user);
    const profile = createProfileData(user.email);

    const response = await profileApi.save(cookie, profile);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('OK');
  });

  test('returns validation error for empty title', async () => {
    const user = createSignUpData();
    const { cookie } = await authApi.signUp(user);
    const profile = createProfileData(user.email);

    const response = await profileApi.save(cookie, { ...profile, title: '' });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].code).toBe('title');
    expect(response.data.response.errors[0].message).toBe("Вкажіть ім'я");
  });

  test('returns validation error for invalid email', async () => {
    const user = createSignUpData();
    const { cookie } = await authApi.signUp(user);
    const profile = createProfileData(user.email);

    const response = await profileApi.save(cookie, {
      ...profile,
      email: 'not-an-email',
    });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].code).toBe('email');
    expect(response.data.response.errors[0].message).toBe(
      'Некоректна адреса електронної пошти',
    );
  });

  test('returns validation error for duplicate email', async () => {
    const firstUser = createSignUpData();
    const secondUser = createSignUpData();
    await authApi.signUp(firstUser);
    const { cookie } = await authApi.signUp(secondUser);
    const profile = createProfileData(firstUser.email);

    const response = await profileApi.save(cookie, profile);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].code).toBe('email');
    expect(response.data.response.errors[0].message).toBe(
      'Користувач з такою адресою вже зареєстрований',
    );
  });

  test('returns validation error for invalid phone', async () => {
    const user = createSignUpData();
    const { cookie } = await authApi.signUp(user);
    const profile = createProfileData(user.email);

    const response = await profileApi.save(cookie, { ...profile, phone: '123' });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].code).toBe('phone');
    expect(response.data.response.errors[0].message).toBe('Поле заповнено некоректно');
  });

  test('returns validation error for invalid city', async () => {
    const user = createSignUpData();
    const { cookie } = await authApi.signUp(user);
    const profile = createProfileData(user.email);

    const response = await profileApi.save(cookie, {
      ...profile,
      city: 'Харків',
      cityId: '0',
    });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].code).toBe('city');
    expect(response.data.response.errors[0].message).toBe('Виберіть значення зі списку');
  });

  test('returns error for invalid CSRF token', async () => {
    const user = createSignUpData();
    const { cookie } = await authApi.signUp(user);
    const profile = createProfileData(user.email);

    const response = await profileApi.save(cookie, profile, {
      csrfToken: 'invalid-csrf',
    });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].message).toBe(
      'Некорректный CSRF токен. Попробуйте обновить страницу',
    );
  });
});
