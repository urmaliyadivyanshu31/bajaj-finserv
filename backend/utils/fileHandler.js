const validateFile = (file) => {
    if (!file) {
      return { file_valid: false, file_mime_type: null, file_size_kb: null };
    }
  
    return {
      file_valid: true,
      file_mime_type: file.mimetype,
      file_size_kb: (file.size / 1024).toFixed(2),
    };
  };
  
  module.exports = { validateFile };
  