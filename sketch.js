var speedSlider
var play
var startX = -50
var startY = 200
var fishMoving = false
var initialFrameRate = 30
var sliderMax = 60
var counter = 0
var gameWon = false

function setup() {
	createCanvas(windowWidth, windowHeight)
	background(10, 50, random() * 120)

	noCursor()
	
	//button to start game
	play = createButton('GO FISH');
	play.position(windowWidth / 2 - 520, windowHeight / 2 + 230)
	play.mouseClicked(playButtonClicked)

	//slider for the speed of fish
	speedSlider = createSlider(10, sliderMax, initialFrameRate, 1)
	speedSlider.position(windowWidth / 2 - 445, windowHeight / 2 + 235)
	speedSlider.size(100, 10)
	speedSlider.changed(speedChanged)

	frameRate(initialFrameRate)
}

function playButtonClicked() {
	fishMoving = !fishMoving
	gameWon = false
	startX = 0
}

function speedChanged() {
	// this code runs when you update the slider
	frameRate(speedSlider.value())
}

function draw() {
	background(10, 50, 100 - sin(frameCount / 16) * 20)
	
	bubbles1()
	
	//seaweed in the background, will eventually sway back and forth
	fill(10, 150 - sin(frameCount / 10) * 10, 30)
	quad(38, 200, 86, 20, 69, 63, 60, 650)
	quad(238, 300, 206, 150, 209, 283, 260, 650)
	quad(338, 400, 156, 90, 190, 63, 400, 650)
	
	fill(30, 100 - sin(frameCount / 10) * 10, 30)
	quad(458, 500, 400, 499, 450, 199, 600, 650)
	quad(558, 575, 500, 599, 590, 159, 650, 700)
	quad(658, 675, 600, 699, 690, 219, 700, 750)
	
	fill(30, 100 - sin(frameCount / 10) * 10, 30)
	quad(800, 500, 720, 500, 650, 499, 770, 300)
	quad(850, 600, 820, 600, 750, 499, 700, 500)
	quad(1000, 400, 620, 509, 890, 399, 800, 400)
	
	//should become a for loop, multiple circles to create a sandy floor
	fill(165, 136, 3)
	ellipse(810, 600, 2500, 100)
	
	fill(250, 150 - sin(frameCount / 10) * 10, 40)
	arc(1000, 500, 200, 230, 0, PI + QUARTER_PI, PIE)
	fill(230, 100 - sin(frameCount / 10) * 10, 100)
	arc(1100, 560, 100, 100, - .5, PI + QUARTER_PI, PIE)
	
	bubbles2()
	
	//for fish
	drawFish(startX, startY)
	if (fishMoving) {
		startX = startX + 4 //adds one to startX
		startY = sin(frameCount / 16) * 125 + 200
	}
	if (startX > windowWidth + 100) {
		startX = 0
	}
	
	fishLine()
	
	bubbles3()
} // end draw()

function drawFish(x, y) {
	push()
	
	if (gameWon) {
		translate(mouseX - 85, mouseY - 110)
	}
	else {
		translate(x, y) // shifts point of origin for entire drawing, don't need to do it in each ellipse
	}
	
	fill(249, 83, 23) // top fin dark orange
	ellipse(50, 70, 30, 20)
	
	fill(249, 83, 23) //top back fin dark orange
	ellipse(0, 90, 30, 20)
	
	fill(249, 83, 23) //bottom back fin dark orange
	ellipse(0, 110, 30, 20)
	
	fill(255, 176, 66) //fish body
	ellipse(50, 100, 90, 60)
	
	//noStroke() //fish head
	fill(250, 90, 23)
	ellipse(79, 100, 30, 40)
	
	fill(0, 0, 0) //eyeball
	ellipse(80, 90, 10, 10)
	
	fill(249, 83, 23) // top fin dark orange
	ellipse(45, 107, 30, 20)
	
	pop()
}

	function bubbles1() {
		for (var size = 5; size <= windowWidth; size = size + 30) {
			noStroke()
			fill(255, 255, 255, 70)
			ellipse(random(100 + size * 4), random(windowHeight), 40, 40)
		}
	}

	function bubbles2() {
		for (var x = 3; x <= windowWidth; x = x + 120) {
			noStroke()
			fill(255, 255, 255, 100)
			ellipse(random(10 + x * 2) - 50, random(windowHeight), 20, 20)
		}
	}

function bubbles3() {
		for (var size = 4; size <= windowWidth; size = size + 20) {
			noStroke()
			fill(255, 255, 255, 80)
			ellipse(random(10 + size * 2), random(windowHeight), 30, 30)
	}
}

//currently being affected by the translate function in the drawFish function, maybe add a push pop to this!? - DONE!
function fishLine() {
	strokeWeight(1)
	stroke(225, 250, 250)
	line(mouseX + 100, -50, mouseX + 15, mouseY - 58)
	stroke(20, 20, 0)
	strokeWeight(3)
	ellipse(mouseX + 15, mouseY - 58, 15, 15)
	noStroke()
	fill(20, 20, 0)
	rect(mouseX + 10, mouseY - 50, 8, 55);
	arc(mouseX, mouseY, 40, 10, 0, PI + QUARTER_PI, PIE);
}

function mouseReleased() {
	console.log(mouseX, mouseY, startX, startY)
	
	var catchRange = 35
	
	if (mouseX - 30 > startX - catchRange && mouseX - 30 < startX + catchRange 
			&& mouseY - 90 > startY - catchRange && mouseY - 90 < startY + catchRange) {
		gameWon = true //setting game state to won! changes drawFish
	}
}
