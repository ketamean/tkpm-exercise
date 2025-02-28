import { isContext } from 'vm';
import { getAdminConfig } from '../config/adminConfig/adminConfig'

class Verifier {
    async email(email: string): Promise<boolean> {
      const config = await getAdminConfig();
      if (config && config.applyFlag && config.emailPatterns) {
        (config.emailPatterns as Array<RegExp>).forEach((regex: RegExp) => {
          if (regex.test(email)) {
            console.log(regex)
            return true
          }
        })
        return false
      }
      // else
      return true
    }
  
    async phoneNumber(phoneNumber: string): Promise<boolean> {
      const config = await getAdminConfig();
      if (config && config.applyFlag && config.phonenumberPattern) {
        return (config.phonenumberPattern as RegExp).test(phoneNumber);
      }
      // else
      return true
    }
  
    // facultyName(facultyName: string): boolean {
    //   const facultyOptions = /^(Luật|Tiếng Anh thương mại|Tiếng Nhật|Tiếng Pháp)$/;
    //   return facultyOptions.test(facultyName);
    // }
  
    // studentStatus(studentStatus: string): boolean {
    //   const statusOptions = /^(Undergraduate|Graduated|Dropped|Pause)$/;
    //   return statusOptions.test(studentStatus);
    // }
}

export default new Verifier();