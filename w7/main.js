
//1
// Create ages array
let ages = [3, 9, 23, 64, 2, 8, 28, 93]
//1.1
ages[ages.length - 1] = ages[ages.length - 1] - ages[0]
console.log('1.1: ' +ages)
//1.2
ages.push(0)
ages[ages.length - 1] = ages[ages.length - 1] - ages[0]
console.log('1.2: '+ ages)
//1.3
let avg = 0
for (let a of ages) {
    avg += a / ages.length
}
console.log('1.3: ' + avg)

//2
let names = ['Sam', 'Tommy', 'Tim', 'Sally', 'Buck', 'Bob']
// 2.1 and 2.2 are done here with one loop because it's faster for me to code.
let megaName = ''
for (let n of names) {
    megaName += n + ' '
}
megaName = megaName.trim() // trim trailing whitespace
let avgLetters = (megaName.length + 1 - names.length) / names.length
console.log('2.1: ' + avgLetters)
console.log('2.2: ' + megaName)

//3
console.log('3: myArray[myArray.length-1]') // subtract one because arrays are zero-indexed

//4
console.log('4: myArray[0]')

//5
let nameLengths = Array(names.length) // declare array with allocated memory
for (let i = 0; i < names.length; i ++) {
    nameLengths[i] = names[i].length
}
console.log('5: ' + nameLengths)

//6
let sum = 0
// We reuse code badly, because programmers were created to be lazy
for (let i = 0; i < names.length; i ++) {
    sum += nameLengths[i]
}
console.log('6: ' + sum)

//7
function frozenKeyboard(word, n) {
    let out = ''
    for (const x of Array(n).keys()) { // I miss Python
        out += word
    }
    return out
}
console.log('7: ' + frozenKeyboard('the cake is a lie', 5))

//8 
function fullName(first, last) {
    return first + ' ' + last
}
console.log('8: ' + fullName('God', 'Zilla'))

//9
function trueIf101(arr) {
    let sum = 0 
    for (const n of arr) {
        sum += n
        if (sum > 100) {
            return true
        }
    }
    return false // we reach here if the whole loop ends <=100
}
console.log('9: ' + trueIf101([101]))
console.log('9: ' + trueIf101([100]))

//10
function average(nums) {
    const avg = nums.reduce((avg ,num) => {
        return avg += num / nums.length;
    }, 0)
    return avg
}
console.log('10: ' + average([7, 9]))

//11
function avgLarger(a, b) {
    return average(a) > average(b)
}
console.log('11: ' + avgLarger([1],[2]))

//12
function willBuyDrink(isHotOutside, moneyInPocket) {
    return isHotOutside && moneyInPocket > 10.50
}
console.log('12: ' + willBuyDrink())

//13
// This function takes two arrays and makes identical value swaps in both such that the first array is sorted
// We use insertion sort because I don't have the time to implement and debug anything better.

function stickySort(a, b) {
    let i = 0
    while (i < a.length - 1) {
        if (a[i] > a[i + 1]) {
            swap(a, b, i, i+1)
            i --
        } else {
            i ++
        }
    }
}

function swap(a, b, i, j) {
    let temp = a[i]
    a[i] = a[j]
    a[j] = temp
    temp = b[i]
    b[i] = b[j]
    b[j] = temp
}


let a = [5,4,3,2,1]
let b = [1,2,3,4,5]
console.log('13: ', a, b)
stickySort(a,b)
console.log('13: ', a, b)