const gameBoard = (function (document){
    const boardTiles = ['', '', '',
                   '', '', '',
                   '', '', ''];

    let round = 1

    const roundFinish = () => {
        console.log(`Round ${round} finished`)
        
        round++

        console.log(`Round ${round}:`)
    }
    
    const validateMove = (tile) => {
        return ((boardTiles[tile] === '') ? true : false);
    }

    const getBoard = () => {
        return boardTiles
    }

    const setTile = (sign, tile) => {
        boardTiles[tile] = sign
    }
 
    const getActivePlayer = () => {
        if(round % 2 === 0){
            return playerO
        } else{
            return playerX
        }
    }

    const checkEnd = () => {

    }

    const move = (tile) => {
        let player = getActivePlayer()
        
        if(validateMove(tile)){
            player.ownedTiles.push(tile);

            gameBoard.setTile(player.sign, tile)
            displayController.renderBoard()
            console.log(`${player.sign} takes tile ${tile+1}!`)
            roundFinish()
        }
    }

    return{
        validateMove,
        getBoard,
        setTile,
        getActivePlayer,
        roundFinish,
        checkEnd,
        move
    }
})(document);

const Player = (sign) => {
    let ownedTiles = [];
    let winner = false;

    // const move = (tile) => {
    //     if(gameBoard.getActivePlayer() === sign){

    //         if(gameBoard.validateMove(tile)){
                
    //             ownedTiles.push(tile)

    //             gameBoard.setTile(sign, tile)
    //             displayController.renderBoard()
    //             console.log(`${sign} takes tile ${tile+1}!`)

    //             if(gameBoard.checkEnd() === 'o' || gameBoard.checkEnd() === 'x'){
    //                 (gameBoard.checkEnd() === sign)? winner = true: winner = false;

    //                 //displayController.win(sign)

    //                 //gameBoard.reset()
    //             } else if(gameBoard.checkEnd() === 'tie'){
    //                 winner = false
    //             }

    //             gameBoard.roundFinish()

    //         } else{

    //             console.log('Invalid move')

    //         }

    //     } else if(!(gameBoard.getActivePlayer() === sign)) {

    //         console.log(`Not ${sign}'s go!`)

    //     }
    // }

    return{
        sign,
        ownedTiles
    }
};

const displayController = (function (){
    const $gameBoard = document.querySelector('.gameBoard');

    const renderBoard = () => {
        const boardArray = gameBoard.getBoard()

        $gameBoard.innerHTML = '';

        boardArray.forEach((tile, index) => {
            const $tileContainer = document.createElement('div');
            const $tileSign = document.createElement('p')

            $tileContainer.classList.add('tile');
            $tileSign.textContent = tile;
            $tileContainer.appendChild($tileSign)
            $tileContainer.setAttribute('tile-id', index);

            $tileContainer.addEventListener('click', (e)=>{
                console.log(`click tile ${index}`)

                gameBoard.move(index)

            })

            $gameBoard.appendChild($tileContainer);
        })
    }

    return {
        renderBoard,
    }
})()

let playerX = Player('x')
let playerO = Player('o')

displayController.renderBoard()





