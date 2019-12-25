var listColor = ['red', 'green', 'yellow', 'purple', 'blue', 'orange', 'grey', 'black', 'olive'];
var colorPattern = [];
var textPattern = [];
var userClickedPattern = [];
var level = 0;
var time = 600;
var started = false;

function generateRandom() {
	var random = Math.random() * 9;
	return Math.floor(random);
}

function start() {
	$(document).keypress(function() {
		if (!started) {
			$('.title').removeClass("red-text");
			$('.instructions').hide();
			started = true;
			nextSequence();
		}
	});
}

$('.button').click(function() {
	var userChosenPattern = $(this).attr('id');
	pressedAnimation(userChosenPattern);

	if (started) {
		userClickedPattern.push(getColorNumber(userChosenPattern));
		checkAnswer(userClickedPattern.length - 1);
	} else {
		makeSound('wrong');
		$('.title').addClass("red-text").text('Your Not Started');
	}
});

function getColorNumber(color) {
	for (var i = 0; i < listColor.length; i++) {
		if (color == listColor[i]) {
			return i;
		}
	}
}

function setTime(){
	if(time > 210){
		time = 600 - (10*level-1);
	}
}

function nextSequence() {
	userClickedPattern = [];
	level++;
	setTime();
	$('.title').text('Level ' + level);
	var i = 0;
	var check = function() {
		if (i == level) {
			$('.pattern').fadeOut(time*1.5, function() {
				$('.pattern').html("");
				isGenerate = false;
			});
		} else {
			i++;
			$('.pattern').fadeIn(100, function() {
				if (i == level) {
					colorPattern.push(generateRandom());
					textPattern.push(generateRandom());
				}
				$('.pattern').append('<div class="' + listColor[colorPattern[i - 1]] + '-text text">' + listColor[textPattern[i - 1]] + " </div>");
			});
			setTimeout(check, time);
		}
	}
	check();
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] == colorPattern[currentLevel]) {
		makeSound('correct');
		if (userClickedPattern.length == colorPattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	} else {
		makeSound('explosion');
		startOver();
	}
}

function pressedAnimation(color) {
	$("#" + color).addClass("pressed");

	setTimeout(function() {
		$("#" + color).removeClass("pressed");
	}, 100);
}

function makeSound(type) {
	switch (type) {
		case 'wrong':
			var wrong = new Audio('sound/wrong.wav');
			wrong.play();
			break;
		case 'correct':
			var correct = new Audio('sound/select.wav');
			correct.play();
			break;
		case 'explosion':
			var explosion = new Audio('sound/explosion.wav');
			explosion.play();
			break;
	}
}

function startOver() {
	started = false;
	level = 0;
	colorPattern = [];
	textPattern = [];
	userClickedPattern = [];
	$('.title').addClass('red-text').text('Game Over !');
	$('.instructions').show().html('Press Any <b>Key</b> to <b>Restart</b>');
	start();
}

start();

/*
function makeSound(color) {
	switch (color) {
		case 'red':
			var c = new Audio('sound/piano_middle_C.mp3');
			c.play();
			break;
		case 'green':
			var cSharp = new Audio('sound/piano_C_sharp.mp3');
			cSharp.play();
			break;
		case 'yellow':
			var d = new Audio('sound/piano_D.mp3');
			d.play();
			break;
		case 'purple':
			var dSharp = new Audio('sound/piano_D_sharp.mp3');
			dSharp.play();
			break;
		case 'blue':
			var e = new Audio('sound/piano_E.mp3');
			e.play();
			break;
		case 'orange':
			var f = new Audio('sound/piano_F.mp3');
			f.play();
			break;
		case 'grey':
			var g = new Audio('sound/piano_G.mp3');
			g.play();
			break;
		case 'black':
			var a = new Audio('sound/piano_A.mp3');
			a.play();
			break;
		case 'olive':
			var b = new Audio('sound/piano_B.mp3');
			b.play();
			break;
		default:
			console.log('Key Not Found' + color);
			break;
	}
}
*/