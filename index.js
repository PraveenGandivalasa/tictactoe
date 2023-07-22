const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


//create a func to initialize a game

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
// for making UI empty if new game is clicked
    boxes.forEach((box,index)=>{
        box.innerText=" ";
        boxes[index].style.pointerEvents="all";
        //
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer==='X'){
        currentPlayer="O"
    }
    else{
        currentPlayer="X"
    }

    gameInfo.innerText=`Current Player-${currentPlayer}`;
}

function checkGameOver(){
    // newGameBtn.classList.add("active");

//for storing winner
    let answer="";
    winningPositions.forEach((position)=>{
        //all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]]!==""|| gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
        &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            //check if winner is x
            if(gameGrid[position[0]]==="X")
            answer="X";
            else{
                answer="O";
              
            }
            //we got winner so disable pointer event

            boxes.forEach((box)=>{

                box.style.pointerEvents="none";
            })
               // now we have to add green colour to winnee
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

        }
        
    });

    if(answer!==""){
        gameInfo.innerText=`Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;

    }
     // Here is not winner yet Check for tie
     let fillCount = 0;
     gameGrid.forEach((box) => {
         if (box !== "") {
             fillCount++;
         }
     });
 
     if (fillCount === 9) {
         gameInfo.textContent = "Game Tied !";
         newGameBtn.classList.add("active");
     }
   

}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";


        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })

})
newGameBtn.addEventListener("click",initGame);

