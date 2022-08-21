const game = (function () {

});

const gameBoard = (function (document){
    const boardTiles = ['o', 'x', '',
                   '', '', '',
                   '', '', ''];
    
    const $board = document.querySelector('.gameBoard')
    
    const renderBoard = () => {
        console.log(boardTiles)

        for(tile of boardTiles){
            const $tileDivider = document.createElement('div')
            $tileDivider.classList.add('tile')
            
            switch (tile){
                case '':
                    $tileDivider.innerHTML += '&nbsp;';
                    break;
                
                case 'x':
                    $tileDivider.textContent = 'x';
                    break;

                case 'o':
                    $tileDivider.textContent = 'o';
                    break;
            }

            $board.appendChild($tileDivider)
        }
    }

    const changeTile = (player, tile) => boardTiles[tile] = player.sign

    return{
        renderBoard
    }
})(document);

const Player = (name, sign) => {
    const getName = () => name;
    const getSign = () => sign;

    return{
        getName,
        getSign
    }
};

gameBoard.renderBoard();