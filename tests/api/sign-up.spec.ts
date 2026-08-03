import { test, expect } from '@playwright/test';
import { AuthApi } from '../../src/api/auth.api';
import { createSignUpData } from '../../src/dto/sign-up.factory';

test.describe('POST /security/sign_up/', () => {
  const authApi = new AuthApi();

  test('registers a new user', async () => {
    const user = createSignUpData();

    const { response } = await authApi.signUp(user);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('OK');
    expect(response.data.response.user.email).toBe(user.email);
    expect(response.data.response.user.title).toBe(user.title);
  });

  test('returns validation error for duplicate email', async () => {
    const user = createSignUpData();
    await authApi.signUp(user);

    const { response } = await authApi.signUp(user);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].code).toBe('email');
    expect(response.data.response.errors[0].message).toBe(
      'Користувач з такою адресою вже зареєстрований',
    );
  });

  test('returns validation error for invalid email', async () => {
    const user = createSignUpData();

    const { response } = await authApi.signUp({
      ...user,
      email: 'not-an-email',
    });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].code).toBe('email');
    expect(response.data.response.errors[0].message).toBe(
      'Некоректна адреса електронної пошти',
    );
  });

  test('returns validation error for short password', async () => {
    const user = createSignUpData();

    const { response } = await authApi.signUp({
      ...user,
      password: '123',
    });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('VALIDATION_ERROR');
    expect(response.data.response.errors[0].code).toBe('pass');
    expect(response.data.response.errors[0].message).toBe(
      'Довжина пароля повинна бути не менше 8 і не більше 15 символів.',
    );
  });

  test('returns 400 for empty body', async () => {
    const { response } = await authApi.signUp({});

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('HTTP_ERROR');
    expect(response.data.response.code).toBe(400);
  });

  test('returns 400 for invalid CSRF token', async () => {
    const user = createSignUpData();

    const { response } = await authApi.signUp(user, { csrfToken: 'invalid-csrf' });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('HTTP_ERROR');
    expect(response.data.response.code).toBe(400);
    expect(response.data.response.message).toBe(
      'Некорректный CSRF токен. Попробуйте обновить страницу',
    );
  });
});
