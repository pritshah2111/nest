import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

  /**
   * The function generates a random string of a specified length with optional type constraint.
   * @param {number} length - The `length` parameter specifies the length of the random string that will
   * be generated. It determines how many characters the random string will contain.
   * @param {string} [type=null] - The `type` parameter in the `generateRandomString` function allows you
   * to specify the type of characters you want in the random string. If you provide `'number'` as the
   * `type`, the function will generate a random string consisting of only numeric characters (0-9). If
   * you don
   * @returns The `generateRandomString` function returns a Promise that resolves to a randomly generated
   * string of the specified length and character type.
   */

  async generateRandomString(
    length: number,
    type: string = null,
  ): Promise<string> {
    let charSet = '';
    let randomString = '';
    if (type === 'number') {
      charSet = '123456789';
    } else {
      charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    }

    for (let i = 0; i < length; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }
}
