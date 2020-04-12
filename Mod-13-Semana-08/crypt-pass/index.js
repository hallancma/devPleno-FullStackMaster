const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('devpleno', salt);
console.log(hash);
console.log('br');
console.log(salt);
console.log(bcrypt.compareSync('devpleno', hash));
