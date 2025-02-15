class Verifier {
    email(email: string): boolean {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  
    phoneNumber(phoneNumber: string): boolean {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
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