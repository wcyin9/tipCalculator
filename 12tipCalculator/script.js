//forms n btns
const form = document.querySelector('.inputContainer');
const fivepercentBtn = document.querySelector('#fivepbtn');
const tenpercentBtn = document.querySelector('#tenpbtn');
const fiveteenpercentBtn = document.querySelector('#fiftpbtn');
const twentypercentBtn = document.querySelector('#twentyfivepbtn');
const fiftypercentBtn = document.querySelector('#fiftypbtn');
const customInput = document.querySelector('.custom');

const tipCount = document.querySelector('.tipCalc');
const totalCount = document.querySelector('.totalCalc');
const resetBtn = document.querySelector('.resetButton');

let userInput = document.querySelector('#bill');
let userInputPpl = document.querySelector('#ppl');
let customTip = document.querySelector('.custom');

//error msg
const errorMsg = document.querySelector('.invalidPpl');

resetBtn.addEventListener('click', ()=>{
        form.reset();
        tipCount.textContent = `$0.00`; 
        totalCount.textContent = `$0.00`;

        errorMsg.classList.remove('active');
        userInputPpl.classList.remove('error');

        if(resetBtn) {
                resetBtn.classList.add('resetColors');
                resetBtn.classList.remove('hasHover');
        }
});

window.addEventListener('load', () => {
        resetBtn.classList.add('resetColors');
});

function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
      }
form.addEventListener('submit', handleSubmit);

//loop over each btn
document.querySelectorAll('button[data-tip]').forEach((btn)=> {
        btn.addEventListener('click', (event) => {
                const tipPercent = parseFloat(event.target.dataset.tip);
                calcPercent(tipPercent);
        })

});

customTip.addEventListener('input', (event) => {
        const tipValue = parseFloat(event.target.value);
        if(!isNaN(tipValue) && tipValue >= 0){
                const tipPercent = tipValue / 100;
                calcPercent(tipPercent);
        } else {
                tipCount.textContent = `$0.00`;
                totalCount.textContent = `$0.00`;
        }
        
});

// Prevent form submission when pressing "Enter" in the custom input
customTip.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const tipValue = parseFloat(event.target.value);
            if (!isNaN(tipValue) && tipValue >= 0) {
                const tipPercent = tipValue / 100;
                calcPercent(tipPercent);
            }
        }
    });

function calcPercent(tipPercent) {
        const billValue = parseFloat(userInput.value);
        const numberOfPeople = parseInt(userInputPpl.value);

        if(isNaN(userInputPpl.value)|| userInputPpl.value <= 0) {
                errorMsg.classList.add('active');
                userInputPpl.classList.add('error');
        } else {
                const tipAmount = (billValue * tipPercent)/numberOfPeople;
                tipCount.textContent = `$${tipAmount.toFixed(2)}`; 

                const totalAmount = (billValue/numberOfPeople) + tipAmount;
                totalCount.textContent = `$${totalAmount.toFixed(2)}`;

                userInputPpl.classList.remove('error');     
                errorMsg.classList.remove('active');

                resetBtn.classList.remove('resetColors');
                resetBtn.classList.add('hasHover');
        }
}