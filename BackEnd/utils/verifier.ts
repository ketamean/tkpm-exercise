import { isContext } from 'vm';
import adminConfigModel, { IAdminConfig } from '../models/adminConfig'
class Verifier {
    async email(email: string): Promise<boolean> {
      const config = (await adminConfigModel.getAdminConfig());
      
      if (config && config.ApplyFlag && config.EmailPattern) {
        return RegExp(config.EmailPattern).test(email);
      }
      // else
      return true
    }
  
    async phoneNumber(phoneNumber: string): Promise<boolean> {
      const config = await adminConfigModel.getAdminConfig();
      if (config && config.ApplyFlag && config.PhoneNumberPattern) {
        return RegExp(config.PhoneNumberPattern).test(phoneNumber);
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