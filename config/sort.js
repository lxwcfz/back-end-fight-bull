function sortCard(cards) {
    let score = 0;
    if (isFiveFlowerBull(cards)) { // 五花牛
        score = 11;
        return;
    }
    if (isFiveTinyBull(cards)) {
        score = 0.5;
        return;
    }
    score = getScore(cards);
    
    return score;
}
function getScore(list) {
    const res = [];
    list.forEach(item => {
        list.filter(fil => fil != item).forEach(ware => {
            list.filter(filter => filter != item && filter != ware).forEach(third => {
                const result = getItemScore(item) + getItemScore(ware) + getItemScore(third);
                let resEnd = 0;
                list.forEach(tar => {
                    if (tar != item && tar != ware && tar != third) {
                        resEnd += getItemScore(tar);
                    }
                });
                if (res.findIndex(item => {
                    return item.result == result && item.resEnd == resEnd;
                }) == -1) {
                    res.push({
                        resEnd,
                        result
                    });
                }
            });
        });
    });
    // console.log(res);
    let bull = 0;
    res.filter(item => item.result % 10 == 0).forEach(ware => {
        if (ware.resEnd > bull) {
            bull = ware.resEnd;
        }
    });
    bull > 10 && (bull = bull % 10);
    // console.log(`牛${bull}`);
    return bull;
}
function getItemScore(number) {
    const result = Math.ceil(number / 4);
    return result > 10 ? 10 : result;
}
function isFiveFlowerBull(list) {
    return list.every(item => getItemScore(item) > 10);
}
function isFiveTinyBull(list) {
    let res = 0;
    list.forEach(item => {
        res += getItemScore(item);
    });
    return res < 10;
}
module.exports = {
    sortCard
};
// sortCard([
//     {
//         name: 'player1',
//         score: 0,
//         cards: [11,29,52,51,50]
//     },
//     {
//         name: 'player2',
//         score: 0,
//         cards: [1,2,3,4,5]
//     },
//     {
//         name: 'player2',
//         score: 0,
//         cards: [24,45,44,32,18]
//     }
// ])