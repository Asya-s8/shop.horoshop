export class UrlProvider {
  static readonly baseURL = 'https://shop700415.horoshop.ua';

  static home(): string {
    return `${this.baseURL}/`;
  }

  static electronics(): string {
    return `${this.baseURL}/electronics/`;
  }
}
