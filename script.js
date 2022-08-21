const gameBoard = (function (document){
    const boardTiles = ['', '', '',
                   '', '', '',
                   '', '', ''];

    let round = 1

    const roundFinish = () => {
        console.log(`Round ${round} finished`)
        gameBoard.printBoard()
        round++

        console.log(`Round ${round}:`)
    }
    // const renderBoard = () => {
    //     console.log(boardTiles)

    //     for(tile of boardTiles){
    //         const $tileDivider = document.createElement('div')
    //         $tileDivider.classList.add('tile')
            
    //         switch (tile){
    //             case '':
    //                 $tileDivider.innerHTML += '&nbsp;';
    //                 break;
                
    //             case 'x':
    //                 $tileDivider.textContent = 'x';
    //                 break;

    //             case 'o':
    //                 $tileDivider.textContent = 'o';
    //                 break;
    //         }

    //         $board.appendChild($tileDivider)
    //     }
    // }
    const validateMove = (tile) => {
        return ((boardTiles[tile] === '') ? true : false);
    }

    const printBoard = () => {
        console.log(boardTiles)
    }

    const setTile = (sign, tile) => {
        boardTiles[tile] = sign
    }
 
    const getActivePlayer = () => {
        return ((round % 2)? 'x': 'o')
    }

    const checkEnd = () => {

    }

    return{
        validateMove,
        printBoard,
        setTile,
        getActivePlayer,
        roundFinish
    }
})(document);

const Player = (sign) => {
    const ownedTiles = [];

    const move = (tile) => {
        if(gameBoard.getActivePlayer() === sign){

            if(gameBoard.validateMove(tile)){
                
                ownedTiles.push(tile)

                gameBoard.setTile(sign, tile)
                console.log(`${sign} takes tile ${tile+1}!`)
                gameBoard.roundFinish()

            } else{

                console.log('Invalid move')

            }

        } else if(!(gameBoard.getActivePlayer() === sign)) {

            console.log(`Not ${sign}'s go!`)

        }
    }

    return{
        sign,
        move
    }
};

let playerX = Player('x')
let playerO = Player('o')

playerX.move(7)
playerO.move(2)





