const gameBoard = (function (document){
    let boardTiles = ['', '', '',
                   '', '', '',
                   '', '', ''];

    const winCombos = [ 
                        [0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 9], //horizontal

                        [0, 3, 6],//vertical
                        [1, 4, 7],
                        [2, 5, 9],

                        [0, 4, 8], //diagonal
                        [2, 4, 6]
                    ]

    let round = 1

    let winner = ''

    let disableInput = false;

    const startGame = () => {
        boardTiles = ['', '', '',
        '', '', '',
        '', '', ''];

        round = 1
        
        disableInput= false;

        playerO.reset();
        playerX.reset();
        displayController.renderBoard();
    }

    const roundFinish = () => {
        console.log(`Round ${round} finished`)
        
        round++

        console.log(`Round ${round}:`)

        displayController.updateActivePlayer()
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
        let winCombo = [];
        let end = false;
        winCombos.forEach(combo => {

            if(combo.every(item => playerO.ownedTiles.includes(item))){
                console.log(`${playerO.sign} wins`)
                playerO.winner = true;
                playerX.winner = false;
                winCombo = combo

                end= true

            } else if(combo.every(item => playerX.ownedTiles.includes(item))){
                console.log(`${playerX.sign} wins`)
                playerO.winner = false;
                playerX.winner = true;
                winCombo = combo

                end= true
            }

        })

        if(round === 9){
            end = true
        }

        return end
    }

    const move = (tile) => {
        let player = getActivePlayer()
        
        if(validateMove(tile)){
            player.ownedTiles.push(tile);

            setTile(player.sign, tile)
            displayController.renderBoard()
            console.log(`${player.sign} takes tile ${tile+1}!`)

            console.log(player.ownedTiles)

            if(checkEnd()){
                disableInput = true
                displayController.gameEnd()
            }else{
                roundFinish()
            }


        }
    }

    const getWinner = () => {
        if(playerX.winner){
            return playerX;
        } else if(playerO.winner){
            return playerO;
        } else{
            return null;
        }
    }

    return{
        getBoard,
        move,
        getActivePlayer,
        disableInput,
        startGame,
        getWinner
    }
})(document);

const Player = (sign) => {
    let ownedTiles = [];
    let winner = false;

    const reset = () => {
        ownedTiles.length = 0;
        console.log('reset tiles', ownedTiles)
        winner = false;
    }

    return{
        sign,
        ownedTiles,
        winner,
        reset
    }
};

const displayController = (function (){
    const $body = document.querySelector('body');
    const $gameBoard = document.querySelector('.gameBoard');

    const renderBoard = () => {
        updateActivePlayer()
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

                if(gameBoard.disableInput === false){
                    gameBoard.move(index)
                }

            })

            $gameBoard.appendChild($tileContainer);
        })

    }

    const updateActivePlayer = () => {
        let player = gameBoard.getActivePlayer();
        const $currentPlayerSign = document.querySelector('#currentPlayerSign');

        $currentPlayerSign.textContent = player.sign;
    }

    const gameEnd = () => {
        console.log('gameend')
        const $endContainer = document.createElement('div')
        $endContainer.classList.add('endContainer')

        const $h1 = document.createElement('h1')
        $h1.textContent = 'Game over!'
        $endContainer.appendChild($h1)

        const $p = document.createElement('p')

        if(gameBoard.getWinner()=== null){
            $p.textContent = 'Tie! Nobody wins.'
        } else{
            $p.textContent = gameBoard.getWinner().sign.toUpperCase()+' wins!'

            gameBoard.getWinner().winner = false;
        }
        $endContainer.appendChild($p)

        const $button = document.createElement('button')
        $button.textContent = 'play again'

        $button.addEventListener('click', (e) => {
            $endContainer.remove()

            gameBoard.startGame()
        })

        $endContainer.appendChild($button)

        $body.appendChild($endContainer);
    }

    return {
        renderBoard,
        updateActivePlayer,
        gameEnd
    }
})()

let playerX = Player('x')
let playerO = Player('o')

displayController.renderBoard()





