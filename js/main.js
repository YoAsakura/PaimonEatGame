
(()=>{

const gameArea = document.querySelector('.main-box__game-area');
const gameBackpackBox = document.querySelector('.main-box__right-menu');
const gameBackpack = document.querySelector('.main-box__backpack-item');
const gameDialogText = document.querySelector('.main-box__paimon-dialog-desc');
const gameControlArr = document.querySelectorAll('.main-box__eat-item');
const gamePaimonPopup = document.querySelector('.main-box__paimon-popup');
const gamePaimonDialog = document.querySelector('.main-box__paimon-popup-dialog');
const gameLeftMenuBox = document.querySelector('.main-box__left-menu');
const gameRightMenuBox = document.querySelector('.main-box__right-menu');
const btnCont = document.querySelector('.btn-cont');
const gamePopupEnd = document.querySelector('.main-box__end-game');
const btnReset = document.querySelector('.btn-reset');

/* Курсор */

let mouse = document.querySelector('.mouse');
let customMouse = function(e) {
  let mouseCoord = {
      x: e.clientX,
      y: e.clientY,
  }

  mouse.style.top = `${(mouseCoord.y - 6)}px`;
  mouse.style.left = `${(mouseCoord.x - 7)}px`;
}

document.addEventListener('mousemove', customMouse);

/* ------------- */
const gameBackpackCounterEat = document.querySelector('.main-box__backpack-eat-counter');
const LEFT_MOUSE_BUTTON = 0;
let eatForBackpack = 0;
let destroyEat = 0;

gamePaimonDialog.addEventListener('click', (e)=>{
  e.preventDefaultl;
  gamePaimonDialog.classList.remove('main-box__paimon-popup-dialog--show');
  gamePaimonPopup.classList.remove('main-box__paimon-popup--show');
  });

const audioMusic = document.querySelector('.main-box__music');
audioMusic.volume = 0.40;

const audioMusicLose = document.querySelector('.main-box__music-lose');
audioMusicLose.volume = 0.70;

const audioMusicWin = document.querySelector('.main-box__music-win');
audioMusicWin.volume = 0.80;

const audioMusicDora = document.querySelector('.main-box__dora');


btnCont.addEventListener('mousedown', (e)=>{
e.preventDefaultl;
gamePopupEnd.classList.remove('hidden');
gamePaimonDialog.classList.remove('main-box__paimon-popup-dialog--show');
gamePaimonPopup.classList.remove('main-box__paimon-popup--show');
btnCont.classList.add('hidden');
audioMusic.pause();
audioMusicDora.play()
});

btnReset.addEventListener('mousedown', (e)=>{
  e.preventDefaultl;
  location.reload();
  });

let endGameFunc = function(){
  if (!document.querySelectorAll('.main-box__eat-item').length) {
    switch (eatForBackpack) {
      case 0:
        gameDialogText.innerHTML = 'Как можно быть таким криворуким?';
        document.querySelector('.main-box__paimon-smile').setAttribute('src', 'images/paimon-lose-smile.gif');
        document.querySelector('.main-box__paimon-popup-img').setAttribute('src', 'images/paimon-lose.gif');
       audioMusicLose.play();
        break;
      case 5:
        gameDialogText.innerHTML = 'Вся еда в сумке, выдвигаемся?';
        document.querySelector('.main-box__paimon-smile').setAttribute('src', 'images/paimon-win-smile.gif');
        document.querySelector('.main-box__paimon-popup-img').setAttribute('src', 'images/paimon-win.gif');
       audioMusicWin.play();
        break;
        default:
          gameDialogText.innerHTML = `Готово, ${destroyEat} испорчено, а ${eatForBackpack} в сумке.`;
         audioMusicWin.play();
    }

    gamePaimonPopup.classList.add('main-box__paimon-popup--show');
    gamePaimonDialog.classList.add('main-box__paimon-popup-dialog--show');
    gameLeftMenuBox.classList.remove('main-box__left-menu--show');
    gameRightMenuBox.classList.remove('main-box__right-menu--show');
    btnCont.classList.remove('hidden');
  }
}

gameControlArr.forEach((EachGameElement)=>{
  EachGameElement.addEventListener('mousedown', function (e) {
    EachGameElement.classList.add('inGame');
    EachGameElement.classList.remove('main-box__eat-item--hover');

    if (e.button === LEFT_MOUSE_BUTTON) {
      let startCoord = {
        x: e.offsetX,
        y: e.offsetY
      }

      let mouseMove = function(moveEvt) {
        let moveCoord = {
            x: moveEvt.clientX,
            y: moveEvt.clientY,
            get coordinateX() {
                if (parseInt(EachGameElement.style.left) > gameArea.offsetWidth - EachGameElement.offsetWidth) {
                    return `${this.x - (this.x - gameArea.offsetWidth + EachGameElement.offsetWidth)}px`;
                } else if (parseInt(EachGameElement.style.left) < 0){
                    return `${this.x - (this.x - 0)}px`;
                } else {
                    return `${this.x}px`;
                }
            },
            
            get coordinateY() {
                if (parseInt(EachGameElement.style.top) > gameArea.offsetHeight - EachGameElement.offsetHeight) {
                    return `${this.y - (this.y - gameArea.offsetHeight + EachGameElement.offsetHeight)}px`;
                } else if (parseInt(EachGameElement.style.top) < 0){
                    return `${this.y - (this.y - 0)}px`;
                } else {
                    return `${this.y}px`;
                }
            },
        }

        EachGameElement.classList.add('grabbed');
        EachGameElement.style.top = `${moveCoord.y - startCoord.y}px`;
        EachGameElement.style.left = `${moveCoord.x - startCoord.x}px`;

        let coll = false;

        // Формула коллизиции с компенсацией абсолютной трансформации
        if (
        ( (EachGameElement.offsetLeft + EachGameElement.offsetWidth) >= gameBackpackBox.offsetLeft)  
        && 
         ( (EachGameElement.offsetLeft) <= (gameBackpackBox.offsetLeft + gameBackpackBox.offsetWidth))
        &&
        ( (EachGameElement.offsetTop + EachGameElement.offsetHeight) >= (gameBackpackBox.offsetTop - (gameBackpackBox.offsetHeight / 2))) 
        && 
        ((EachGameElement.offsetTop <= ((gameBackpackBox.offsetTop - (gameBackpackBox.offsetHeight / 2)) + gameBackpackBox.offsetHeight)) ) 
        ) 
        
        {
          coll = true;
          if (!gameBackpack.classList.contains('main-box__backpack-item--focused')) {
            gameBackpack.classList.add('main-box__backpack-item--focused');
          }
        } else {
          coll = false
          if (gameBackpack.classList.contains('main-box__backpack-item--focused')) {          
            gameBackpack.classList.remove('main-box__backpack-item--focused');
          }
        }

        return window.globalCollision = coll;
      }

      
      let mouseUp = function (upEvt) {

        upEvt.preventDefault();
        startCoord = {
            x: upEvt.clientX,
            y: upEvt.clientY
          }

        if (globalCollision == true) {
        //  let cloneEachGameElement = EachGameElement.cloneNode(true);
        //  gameBackpackCounterEat.append(cloneEachGameElement);
          
          window.eatForBackpack = eatForBackpack++;
          EachGameElement.remove();
          endGameFunc();

        if (gameBackpack.classList.contains('main-box__backpack-item--focused')) {          
          gameBackpack.classList.remove('main-box__backpack-item--focused');
           }
        } else {
  
          let elementTop = parseInt(EachGameElement.style.top);
          let funcStopInterval = function() {
            clearInterval(dropConrol);
            EachGameElement.removeEventListener('mousedown', funcStopInterval);
          }

          let dropConrol = setInterval(()=> {
            if ((EachGameElement.offsetTop) <= ((gameArea.offsetHeight - EachGameElement.offsetHeight))) {
              elementTop = elementTop + 10;
              EachGameElement.style.top = `${elementTop}px`;
            } else if ( (EachGameElement.offsetTop)>=(gameArea.offsetHeight-EachGameElement.offsetHeight)){
              clearInterval(dropConrol);
              let destroyItemAnimation = function() {
                EachGameElement.classList.add('main-box__eat-item--blackout');
                EachGameElement.classList.add('main-box__eat-item--down');
                EachGameElement.classList.remove('main-box__eat-item--hover');
                window.destroyEat = destroyEat++;
                setTimeout(()=>{
                  EachGameElement.remove();
                  endGameFunc();
                },1000)
              };
              destroyItemAnimation()
            } else {
               clearInterval(dropConrol);
            }
          }, 10)
          
          EachGameElement.addEventListener('mousedown', funcStopInterval);
        }
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      }

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    }
  });
}); 
})()