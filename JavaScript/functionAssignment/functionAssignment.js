//Write a program to demonstrate how a function can be passed as a parameter to another function.


function sum(...arguments){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return [sum, arguments.length];
}

function average(sum){
    return sum[0]/sum[1];
}

console.log(average(sum(1,2,3,4,5,6,7,8,9,10)));

/*An arrow function takes two arguments firstName and lastName and returns a 2 letter string that represents the first letter of both the arguments. For the arguments Roger and Waters, the function returns ‘RW’. Write this function.
Submit the github link to the code*/

const combiner = (firstName , lastName) => {
    let fName = firstName[0];
    let lName = lastName[0];
    return fName + lName;
}

console.log(combiner("Shaik","Majahar"));

// another way

const combiner2 = (firstName, lastName) => firstName[0] + lastName[0];
console.log(combiner2("Shaik","Majahar"));