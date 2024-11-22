// A simple JSON validation function to process the 'data' field
const validateJSON = (data) => {
    try {
      const parsedData = JSON.parse(data);
      const numbers = parsedData.filter(item => !isNaN(item)); // Extract numbers
      const alphabets = parsedData.filter(item => /^[a-zA-Z]+$/.test(item)); // Extract alphabets
      const isPrimeFound = numbers.some(num => isPrime(num)); // Check if any prime number
      const highestLowercase = alphabets.filter(char => char === char.toLowerCase())
                                          .sort().pop(); // Find the highest lowercase letter
  
      return { isValid: true, numbers, alphabets, isPrimeFound, highestLowercase };
    } catch (e) {
      return { isValid: false };
    }
  };
  
  // Prime number check function
  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  module.exports = { validateJSON };
  