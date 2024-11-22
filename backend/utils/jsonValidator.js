const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  const validateJSON = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercase = [];
    let isPrimeFound = false;
  
    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
        if (isPrime(Number(item))) isPrimeFound = true;
      } else if (typeof item === "string") {
        alphabets.push(item);
        if (item === item.toLowerCase() && /^[a-z]$/.test(item)) {
          highestLowercase.push(item);
        }
      }
    });
  
    highestLowercase.sort();
    return {
      isValid: true,
      numbers,
      alphabets,
      isPrimeFound,
      highestLowercase: highestLowercase.slice(-1),
    };
  };
  
  module.exports = { validateJSON };
  