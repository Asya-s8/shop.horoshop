export class UrlProvider {
  static readonly baseURL = 'https://shop700415.horoshop.ua';

  static home(): string {
    return `${this.baseURL}/`;
  }

  static electronics(): string {
    return `${this.baseURL}/electronics/`;
  }

  static signUp(): string {
    return `${this.baseURL}/security/sign_up/`;
  }

  static profile(): string {
    return `${this.baseURL}/profile/`;
  }

  static profileSave(): string {
    return `${this.baseURL}/profile/save/`;
  }
}
