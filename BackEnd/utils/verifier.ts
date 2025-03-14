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
}

export default new Verifier();