// A simple file validation (you can extend this to check file type or size)
const validateFile = (file) => {
    if (!file) {
      return { file_valid: false, message: "No file uploaded" };
    }
  
    // Example: Check if the file type is an image
    if (!file.mimetype.startsWith("image/")) {
      return { file_valid: false, message: "Invalid file type. Only images are allowed." };
    }
  
    return { file_valid: true, file_name: file.originalname };
  };
  
  module.exports = { validateFile };
  