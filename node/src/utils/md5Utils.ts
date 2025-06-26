import * as crypto from "crypto";
export class MD5Utils {
  /**
   * Generate MD5 hash from string
   * @param str Input string
   * @returns MD5 hashed string
   */
  public static encrypt(str: string): string {
    const hash = crypto.createHash("md5");
    hash.update(str);
    return hash.digest("hex");
  }

  /**
   * Generate salted MD5 hash
   * @param str Input string
   * @param salt Salt string
   * @returns Salted MD5 hashed string
   */
  public static encryptWithSalt(str: string, salt: string): string {
    const hash = crypto.createHash("md5");
    hash.update(str + salt);
    return hash.digest("hex");
  }
}
