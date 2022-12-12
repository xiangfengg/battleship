// Declare global variables
let rows = 10;
let cols = 10;
let gridSize = 50;
let seconds = 0;
let interval = null;
let hrs = 0
let mins=0
let secs=0
let hitCount = 0;

// Define object with ship sizes
const battleShipSize = 
{
	big: 4,
	medium: 3,
	small: 2
}


// get the container element and time element
let battlefieldContainer = document.getElementById("battlefield");
const time_el = document.querySelector('.time');

// Create game board array
let battlefield = []
for (j = 0; j < rows; j++){
	 let row = []
	for (i = 0; i < cols; i++) {
		row.push(0)
		// create a new div HTML element for each grid and make it the right size
		let grid = document.createElement("div");
		battlefieldContainer.appendChild(grid);

    // give each div element a unique id based on its row and column
		grid.id = "A"+ j + i;			
		
		// set each grid grid's coordinates: multiples of the current row or column number
		let topPosition = j * gridSize;
		let leftPosition = i * gridSize;			
		
		// use CSS absolute positioning to place each grid grid on the page
		grid.style.top = topPosition +"px" ;
		grid.style.left = leftPosition+"px";					
	}
	battlefield.push(row)
}
//    0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot

//get a random position to start battleship 
//starting position must be less then the total column- battleship
const placeBattleShipHorizontal = (battleShipSize) =>{
  let row = Math.floor(Math.random() * 10);
  let column = Math.floor(Math.random() * (10 - battleShipSize));

	// Place battleship on the game board
 for (let i = 0; i < battleShipSize; i++) {
 // If the current grid is empty (0), place the ship there
		if(battlefield[row][column + i] == 0){
    battlefield[row][column + i] = 1
			}else{
			// If the current grid is not empty, try again
			placeBattleShipHorizontal(battleShipSize)
		}
	}
}

// Function for placing vertical battleships
placeBattleShipVertical = (battleShipSize) => {
	  // Get random starting position for the battleship
  let row = Math.floor(Math.random() * (10 - battleShipSize));
  let column = Math.floor(Math.random() *10 );
	 // Place battleship on the game board
	for (let i = 0; i < battleShipSize; i++) {
		// If the current grid is empty (0), place the ship there
		if(battlefield[row + i][column] == 0){	
    battlefield[row + i][column] = 1
	}else{
		placeBattleShipVertical(battleShipSize)}
	}
}


placeBattleShipHorizontal(battleShipSize.big)
placeBattleShipHorizontal(battleShipSize.medium)
placeBattleShipVertical(battleShipSize.big)
placeBattleShipVertical(battleShipSize.medium)


// set event listener for all elements in battlefield, run fire function  and start function when grid is clicked

battlefieldContainer.addEventListener("click", fire);
battlefieldContainer.addEventListener("click", start);

// // initial code via http://www.kirupa.com/html5/handling_events_for_many_elements.htm:
function fire(e) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
		//making sure the child element is pressed instead of the parent element 
	if (e.target !== e.currentTarget) {
        // extract row and column # from the HTML element's id
		let row = e.target.id.substring(1,2);
		let col = e.target.id.substring(2,3);
				
		// if player clicks a grid with no ship, change the color and change grid's value
		if (battlefield[row][col] == 0) {
			e.target.style.background = '#bbb';
			// set this grid's value to 3 to indicate that they fired and missed
			battlefield[row][col] = 3;
			// if player clicks a grid with a ship, change the color and change grid's value
			}else if (battlefield[row][col] == 1){
			e.target.style.background = 'red';
			// set this grid's value to 2 to indicate the ship has been hit
			battlefield[row][col] = 2;
			
			// increment hitCount each time a ship is hit
			hitCount++;
		if (hitCount == 14) { 
      clearInterval(interval);
			//once the battleship been defeated, alert would be shown with the time 
			alert("All enemy battleships have been defeated! You win!, you took "+ hrs+ ":"+mins +":"+secs );
			}
		// if player clicks a grid that's been previously hit, an alert to tell them it been fired at perviously
			} else if (battlefield[row][col] > 1) {
			alert("Stop wasting your torpedos! You already fired at this location.");
			}			
  }
    e.stopPropagation();
}

// Update the timer
function timer () {
	seconds++;

	// Format our time
	hrs = Math.floor(seconds / 3600);
	mins = Math.floor((seconds - (hrs * 3600)) / 60);
	secs = seconds % 60;

	if (secs < 10) secs = '0' + secs;
	if (mins < 10) mins = "0" + mins;
	if (hrs < 10) hrs = "0" + hrs;

	time_el.innerText = `${hrs}:${mins}:${secs}`;
}
//only the timer function run one time even if there are multiple clicks 
function start(){
  if (interval){
  return
	}
	interval = setInterval(timer, 1000);
}

