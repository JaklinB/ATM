function allFunc(){

    let screen = document.getElementById('screen');
    let screenText = document.getElementById('screenText');
    let menuScreen = document.getElementById('menuScreen');
    let balanceScreen = document.getElementById('balanceScreen');
    let withdrawalScreen = document.getElementById('withdrawalScreen');
    let transacrionsScreen = document.getElementById('transacrionsScreen');
    let banknotesInf = document.getElementById('banknotesInf');
    let transactions = document.getElementById('transactionsDiv');
    let leftBtns = document.querySelectorAll('.leftBtns');
    let rightBtns = document.querySelectorAll('.rightBtns');
    let PINinput = document.getElementById('PINinput');
    let amountInput = document.getElementById('withdrawalInput');
    let msg = document.getElementById('msg');
    const keys = document.querySelectorAll('.key');
    var enter = document.getElementById('enter');
    var clear = document.getElementById('clear');
    var back = document.getElementById('back');
    let tryCount = 3;
    let isTrue=false;
    let balanceAmount = 3000;
    let currentSection = '';
    let moneyWithheldPlusAmount=0;
    let moneyWithheld=0;
    let moneyLeft=0;
    let amountValue = 0;
    let blocked = document.getElementById('blocked');
    var countdownNum = 30;

    leftBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const target = event.target;
            const value = target.value;
            if(currentSection == 'menuScreen') {
                switch(value) {
                case 'btn1':
                    if(isTrue){
                        currentSection = 'balanceScreen';
                    balanceScreenFunc();
                    }else{
                        msg.innerHTML='Въведете PIN';
                    }
                    break;
                case 'btn2':
                    if(isTrue){
                       currentSection = 'withdrawalScreen';
                    withdrawalScreenFunc(); 
                    }else{
                        msg.innerHTML='Въведете PIN';
                    }
                    break;
                }
            }
          });
    });

    rightBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const target = event.target;
            const value = target.value;
            if(currentSection == 'menuScreen') {
                switch(value) {
                case 'btn3':
                    if(isTrue){
                        currentSection = 'transacrionsScreen';
                    transacrionsScreenFunc();
                    }else{
                        msg.innerHTML='Въведете PIN';
                    }
                    break;
                case 'btn4':
                    location.reload(); 
                    break;
                }
            }
          });
    });

    /* START */
    let card = document.querySelector(".card");
    card.addEventListener('click', () => {
        currentSection='screenText';
        card.classList.add('insertCard');
        cardInside();
        card.style.pointerEvents = 'none';
    });

    /* CARD INSIDE */
    function cardInside(){
        screenText.classList.remove('displayed');
        currentSection='menuScreen';
        menuScreen.classList.add('displayed');


        /* KEYS INPUT */
        keys.forEach((key) => {
            key.addEventListener('click', (event) => {
              const target = event.target;
              const value = target.value;
            
              PINinput.value += value;
                amountInput.value += value;
              
            
            });
          });

          function incTimer(){
            setTimeout (function(){
                if(countdownNum != 0){
                countdownNum--;
                msg.innerHTML = 'Блокиран PIN! Изчакайте:' + countdownNum + ' секунди';
                blocked.innerHTML = 'Три пъти сте избрали невалидна операция! Изчакайте:' + countdownNum + ' секунди';
                incTimer();
                } else {
                    msg.innerHTML = 'Готово!';

                    blocked.innerHTML = 'Опитайте отново!';
                    msgShow(blocked);
            
                    enter.style.pointerEvents = 'auto';
                    amountInput.textContent='';
                    tryCount=3;
                    }
                },1000);
            }

          /* CHECK PASSWORD */
        function checkPassword() { 
    
        if(PINinput.value === ('3333')) { 
            msg.textContent='Достъп потвърден. Изберете опция!';
            msg.style.color='#13AE13';
            PINinput.value = '';
            isTrue=true;
        }
        else{ 
            msg.textContent='Грешен PIN..';
            msg.style.color='var(--first-color)';
            PINinput.value = '';
            tryCount--;
        }

        if(tryCount==0){

            enter.style.pointerEvents = 'none';
            
                incTimer();
        

        }
    }

          enter.addEventListener('click',()=>{
            checkPassword();
          });


    }

    function balanceScreenFunc(){
        currentSection='balanceScreen';
        menuScreen.classList.remove('displayed');
        balanceScreen.classList.add('displayed');
        let balanceInfo = document.getElementById('balanceInfo');
        balanceInfo.innerHTML=`Балансът по Вашата сметка е: ${balanceAmount} BGN`;
        isTrue=false;
    }
    function withdrawalScreenFunc(){
        currentSection='withdrawalScreen';
        menuScreen.classList.remove('displayed');
        withdrawalScreen.classList.add('displayed');

        enter.addEventListener('click',()=>{
            amountValue = Number(amountInput.value);
        var notes = [100, 50, 20, 10];
        var noteCounter = [0, 0, 0, 0];
        let sum = 0;
        let fam = amountValue;
        let am = amountValue;
      
        for (let i = 0; i < 4; i++) {
          if (am >= notes[i]) {
            noteCounter[i] = Math.floor(am / notes[i]);
            am = am - noteCounter[i] * notes[i];
            sum += (notes[i]*noteCounter[i]);

          }
        }
        
              if(sum==fam){
                
            let moneyMsg = document.getElementById('moneyMsg');
            let limitMoneyMsg = document.getElementById('limitMoneyMsg');
            let noMoneyMsg = document.getElementById('noMoneyMsg');
            let cantBeZeroMsg = document.getElementById('cantBeZeroMsg');

            
              
            if(balanceAmount > amountValue && amountValue<=400 && amountValue!=0){
            moneyWithheld = amountValue * 0.002;
            moneyWithheldPlusAmount = moneyWithheld+amountValue;
              moneyLeft = (balanceAmount - moneyWithheldPlusAmount).toFixed(2);
              moneyMsg.textContent=`Успешно изтеглихте ${amountValue} BGN`;

              
              let moneyLeftInf = document.getElementById('moneyLeftInf');
              let withheldInf = document.getElementById('withheldInf');
              let dateandtimeMsg = document.getElementById('dateandtimeMsg');

            dateandtimeMsg.innerHTML = formatDate(new Date());
                

              countCurrency(amountValue);
              moneyLeftInf.innerHTML= `Остават Ви ${moneyLeft} BGN`;
              balanceAmount=moneyLeft;
              withheldInf.innerHTML=`Удържана e такса в размер на 0.002% от изтеглената сума. Удържане: ${moneyWithheld} BGN `;

            // INFO FOR TRANSACTIONS
            let dateNTimeT = document.getElementById('dateNTimeT');
            dateNTimeT.innerHTML=`Дата и час: ${dateandtimeMsg.textContent}`;
            let amountT = document.getElementById('amountT');
            amountT.innerHTML=`Изтеглена сума: ${amountValue}BGN`;
            let withheldT = document.getElementById('withheldT');
            withheldT.innerHTML = `Начислена такса: ${moneyWithheld}BGN`;
            let moneyLeftT = document.getElementById('moneyLeftT');
            moneyLeftT.innerHTML = `Остатък по сметката: ${moneyLeft}BGN`;
            transactions.appendChild(dateNTimeT);
            transactions.appendChild(amountT);
            transactions.appendChild(withheldT);
            transactions.appendChild(moneyLeftT);

            }else{
              if(balanceAmount < amountValue){
                  msgShow(noMoneyMsg);
              }else if (amountValue>400){
                  msgShow(limitMoneyMsg);
              }else if(amountValue==0){
                msgShow(cantBeZeroMsg);
              }
            }
        
              }else{
                let mustBeCorrectMsg = document.getElementById('mustBeCorrectMsg');
                msgShow(mustBeCorrectMsg);
              }

            amountInput.value='';

            });

            amountInput.value='';
            amountValue='';

    }

    function msgShow(msg) {
        
        var displaySetting = msg.style.display;
    
        if (displaySetting == 'block') {
          msg.style.display = 'none';
        }
        else {
          msg.style.display = 'block';
        }

        setTimeout(function(){
            msg.style.display = 'none';
            },2000);
        
      }

    function transacrionsScreenFunc(){
        currentSection='transacrionsScreen';
        menuScreen.classList.remove('displayed');
        transacrionsScreen.classList.add('displayed');
    }
    function backOption(){
        if(currentSection != 'menuScreen' && currentSection != 'screenText'){
        currentSection = 'menuScreen';
        menuScreen.classList.add('displayed');
        balanceScreen.classList.remove('displayed');
        withdrawalScreen.classList.remove('displayed');
        transacrionsScreen.classList.remove('displayed');
        moneyMsg.textContent='';
        dateandtimeMsg.textContent='';
        banknotesInf.textContent='';
        moneyLeftInf.textContent='';
        withheldInf.textContent='';
        amountInput.textContent='';
        moneyWithheldPlusAmount=0;
        moneyWithheld=0;
        amountValue=0;
        moneyLeft=0;
            
        /*dateNTimeT.textContent='';
        amountT.textContent='';
        withheldT.textContent='';
        moneyLeftT.textContent='';*/
        }
 
        tryCount = 3;
        isTrue=false;
        msg.textContent='';
        amountInput.value='';
        amountValue='';
        
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
        /*  padStart(targetLength)
            padStart(targetLength, padString)*/
      }
      
      function formatDate(date) {
        return (
          [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
          ].join('/') +
          ' ' +
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(':')
        );
      }

      function countCurrency(amount) {
        var notes = [100, 50, 20, 10];
        var noteCounter = [0, 0, 0, 0];
        let banknotesInf = document.getElementById('banknotesInf');
      
        for (let i = 0; i < 4; i++) {
          if (amount >= notes[i]) {
            noteCounter[i] = Math.floor(amount / notes[i]);
            amount = amount - noteCounter[i] * notes[i];
          }
        }
        for (let j = 0; j < 4; j++) {
          if (noteCounter[j] !== 0) {
           banknotesInf.innerHTML += `Банкноти от ${notes[j]}BGN : ${noteCounter[j]}бр.` + " ";
          }
        }
      }

    back.addEventListener('click',()=>{
        backOption();
    });

    clear.addEventListener('click',()=>{
        amountInput.value= '';
        PINinput.value = '';
        msg.textContent='';
    });

}
