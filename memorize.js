var listColor = ['red', 'green', 'yellow', 'purple', 'blue', 'orange', 'grey', 'black', 'olive'];
var currentColor = [];
var currentText = [];
var level = 1;

function generateRandom() {
	var random = Math.random() * 9;
	return Math.floor(random);
}

function start() {
	$('.title').fadeOut(500);
	$('p').fadeOut(500);
	addInstruction(level, listColor, currentColor, currentText);
	checkAnswer();
}

function addInstruction(level, listColor, currentColor, currentText) {
	var i = 0;
	var check = function() {
		if (i == level) {
			$('.instructions').fadeOut(3000,function(){
				$('.instructions').html("");
			});
		} else {
			i++;
			$('.instructions').fadeIn(100, function() {
				if(i == level){
					currentColor.push(generateRandom());
					currentText.push(generateRandom());
				}
				console.log(currentColor);
				console.log(currentText);
				$('.instructions').append('<div class="' + listColor[currentColor[i-1]] + '-text text">' + listColor[currentText[i-1]] + " </div>");
			});
			setTimeout(check, 1000); // check again in a second
		}
	}
	check();
}

start();