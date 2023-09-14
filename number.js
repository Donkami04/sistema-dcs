const pingAvg = '1.908 msec';
const number = parseFloat(pingAvg.replace('.', ''));
console.log(typeof(number));
console.log(number);
if (number > 2) console.log('Si')
