/*
 * File: script.js
 * Created: Sunday, 10th January 2021 12:57:41 pm
 * Author: Aquib Mujtaba (aquib.pust13@gmail.com)
 * -----
 * Last Modified: Tuesday, 2nd February 2021 9:05:51 pm
 * Modified By: Aquib Mujtaba (aquib.pust13@gmail.com)
 * -----
 * Copyright (c) 2021 @quib_self
 */

//Define elements of HTML
let button = document.querySelector('#check_button');
let fromInputField = document.querySelector('#from_input');
let toInputField = document.querySelector('#to_input');
let numberInputField = document.querySelector('#number_input');
let startButton = document.querySelector('#play_game');

let count = 0;
let randomNumber;


// Class definations

class UI {

    static showAlert(message, className,time) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('#main_container');
        let form = document.querySelector('#body_container');

        container.insertBefore(div, form);

        time = parseInt(time);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, time);
    }
}


//Add event listener of these elements
button.addEventListener('click', mainFunction);

startButton.addEventListener('click', function (e) {

    document.querySelector('#main_div').style.display = 'none';
    document.querySelector('#replacing_div').style.display = 'block';

    UI.showAlert(`You have only 3 chances to try . . !`, "warning", "2000");
    let max = parseInt(toInputField.value);
    let min = parseInt(fromInputField.value);

    getRandomNumber(max,min);

    e.preventDefault();
});


//Define Functions
function mainFunction(e) {

    if (fromInputField.value === '' || toInputField.value === '' || numberInputField.value === '') {
        //show alert.
        //alert("Fill the range...");
        UI.showAlert("Fill-up the fields carefully.", "error","2000");
    } else {
        let result = false;
        let guess = parseInt(numberInputField.value);


        if (guess === randomNumber) {
            result = true;
            numberInputField.value = "";
            endGame(result);
        } else if (guess > randomNumber) {
            if (count < 2) {
                numberInputField.value = "";
                //Show alert message
                //alert('Check again the guess id greater than actual number');
                UI.showAlert(`${guess} is Greater, You have ${2 - count} chance.`,"error","2000");
                numberInputField.value = "";
            } else {
                endGame(result);
            }
        } else {
            if (count < 2) {
                //alert('Check again the guess id smaller than actual number');
                UI.showAlert(`${guess} is Smaller, You have ${2-count} chance.`,"error","2000");
                numberInputField.value = "";
            } else {
                endGame(result);
            }
        }
        count++;
        console.log(result);
        console.log(count);
    }
e.preventDefault();
}

// Random number generate.
function getRandomNumber(max, min) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;


    console.log(randomNumber);

    count = 0;
}

function endGame(result) {

    if (result === false) {
        document.querySelector('#main_div').style.display = 'block';
        document.querySelector('#replacing_div').style.display = 'none';
        numberInputField.value = "";
        UI.showAlert(`Lost the game. ${randomNumber} is the actual number.`, "error","4000");
    } else {
        document.querySelector('#main_div').style.display = 'block';
        document.querySelector('#replacing_div').style.display = 'none';
        numberInputField.value = "";
        UI.showAlert(`Congratulations..! You won the game. You tried ${++count} times.`, "success","4000");
    }
}
