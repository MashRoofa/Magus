//Get Elements
var startButton = document.getElementById('start-button');
var canvas = document.getElementById('icons-canvas');
var startContainer = document.getElementById('start-container');
var gameContainer = document.getElementById('game-container');
var card = document.getElementById('card');
var cardArea = document.getElementById('card-area');
var resultContainer = document.getElementById('result-container');
var resultImage = document.getElementById('result-image');
var resultMessage = document.getElementById('result-message');

startButton.addEventListener('click',function(){
    hideElement(canvas, () => canvas.parentNode.removeChild(canvas));
    hideElement(startContainer,() => startContainer.parentNode.removeChild(startContainer));
    showElement(gameContainer);
    buildCards();
});

function showElement(element){
    element.style.display="block";
    element.classList.remove('visually-hidden');
}

function hideElement(element,callback){
    element.classList.add('visually-hidden');
    element.addEventListener('transitionend',callback);
}

//Game logic
var cardNumber = 0;
var numberGuessed = 0;

//Create object containing the image that correcponds to a number
var images =[];

for(let i = 1; i <= numberOfSvg; i++){
    images.push({
        file:svgFiles[i-1],
        number:i
    });
}

function updateEffect(element,callback){
    element.classList.add('visually-hidden');
    element.addEventListener('transitionend',() => {
        element.classList.remove('visually-hidden');
        callback();
    });
}

function buildCards(answer){

    if(answer == "yes" && cardNumber < 6){
        numberGuessed += cards[cardNumber]['binary'];
        console.log("Adding: "+ cards[cardNumber]['binary']);
    }

    if(answer != undefined){
        cardNumber += 1;
    }
    
    

    if(cardNumber >= 6){

        console.log('Card Showing: ' + (cardNumber+1) + " Number Guessed: "+ numberGuessed);
        showResult();
        return;
    }

    var content = '';

    for(let i = 0; i < cards[cardNumber]['numbers'].length; i++){
        let image = images.filter((image) => image.number == cards[cardNumber]['numbers'][i]);
        let size = window.innerWidth > 400 ? 45 : 30;
        size = window.innerWidth > 700 ? 70 : size;
        content +=  `<div class="col p-1"><img src="svg/`+image[0]['file']+`" alt="" width="`+size+`" height="`+size+`"></div>`;
    }

    if(answer != undefined){
        updateEffect(cardArea,()=>{
            card.innerHTML = content;
        });
    }else{
        card.innerHTML = content;
    }

    console.log('Card Showing: ' + (cardNumber+1) + " Number Guessed: "+ numberGuessed);
}

function showResult(){
   
    hideElement(gameContainer,() => gameContainer.parentNode.removeChild(gameContainer));

    showElement(resultContainer);

    if(numberGuessed < 1 || numberGuessed > 60){
        resultMessage.innerText = 'You probably missed an icon, try again!';
    }else{
        let image = images.filter((image) => image.number == numberGuessed);

        resultImage.src = 'svg/' + image[0]['file'];
    }

    
}

function restart(){
    location.reload();
}