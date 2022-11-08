// const crypto = require('crypto');

// // exports.deterministicPartitionKey = event => {
// //   const TRIVIAL_PARTITION_KEY = '0';
// //   const MAX_PARTITION_KEY_LENGTH = 256;
// //   let candidate;

// //   if (event) {
// //     if (event.partitionKey) {
// //       candidate = event.partitionKey;
// //     } else {
// //       const data = JSON.stringify(event);
// //       candidate = crypto.createHash('sha3-512').update(data).digest('hex');
// //     }
// //   }

// //   if (candidate) {
// //     if (typeof candidate !== 'string') {
// //       candidate = JSON.stringify(candidate);
// //     }
// //   } else {
// //     candidate = TRIVIAL_PARTITION_KEY;
// //   }
// //   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
// //     candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
// //   }
// //   return candidate;
// // };

// // how many hours each Agent worked in a given quarter by summing up every Shift they worked.

// For this function, pass in the input value and use the crypto library to create a hash key
// The reason I create this function is because there are two kinds of situations need to call this hash function
// so I extract it from the original code
const createCandidate = candidate => {
  return crypto.createHash('sha3-512').update(candidate).digest('hex');
};

exports.deterministicPartitionKey = event => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    // Compare to the orginal code, it checks if there is a object contains partitionKey property and assign to it
    // Otherwise assign the whole object as string to the candidate
    // so I use the hasOwnProperty method to check and
    // if-else statement on one line
    candidate = event.hasOwnProperty('partitionKey')
      ? event.partitionKey
      : createCandidate(JSON.stringify(event));
  }

  if (candidate) {
    // remove the typeof candidate !== 'string' here since the candidate is always be string if there is event as input
    // and the if statement never run if candidate is undefined
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      // move the length check inside to see if the candidate is no undefined and it is string
      // then the length of the candidate string needs to be checked and maybe run the hash function if the length is greater than 256
      candidate = createCandidate(candidate);
    }
  } else {
    // no need to assign to candidate and can return immedidately with TRIVIAL_PARTITION_KEY 0
    return TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};
