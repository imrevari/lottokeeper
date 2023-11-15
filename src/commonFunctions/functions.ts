

export const generateRandomNumbers = () =>{
    let array = new Array<number>()
    let numbers = Array.from({length: 51}, (_, i) => i + 1);
    while (array.length < 5){
        const index = Math.floor(Math.random()*numbers.length)
        array.push(numbers[index])
        numbers.splice(index, 1);
    }
    return array
}