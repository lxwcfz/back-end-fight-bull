function getRandomCardNumber(existNumber = []) {
	let init = false;
	// console.log('random');
	let number = Math.random().toFixed(2)*100;
	number > 52 && (number -= 52);
	number == 0 && (number += 1);
	number = Math.floor(number);

	return getNoRepeatNumber(number);

	function getNoRepeatNumber(num) {
		if (existNumber.findIndex(item => item == num) > -1) { // 有重复的数字
			// return getRandomCardNumber(existNumber); // 效率低下
			if (!init) {  // 第一次执行
				init = true;
				return getNoRepeatNumber(1);
			}
			return getNoRepeatNumber(num + 1 );
		}
		return num;
	}
}
// function getArray() {
// 	const list = [];
// 	let a = 1;
// 	for (let i = 1; i < 52; i ++) {
// 		list.push(a);
// 		a += 1;
// 	}
// 	return list;
// }
// console.log(getArray());
// console.time();
// console.log(getRandomCardNumber());
// console.timeEnd();

module.exports = {
	getRandomCardNumber
};