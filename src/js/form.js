const form = document.querySelector(".form");

form.addEventListener("submit", () => {

    event.preventDefault();

    validadeForm();

});


function calculateMortgageMonth(amountValue, yearTermValue, interestRateValue) {

    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked').value;
    
    
    const mortgagePricipal = amountValue;
    
    const fixedInterest = (interestRateValue / 100) / 12;
    
    
    let result = null;
    
    if (mortgageType === "repayment") {
    
        const duration = yearTermValue * 12;

        const delta = Math.pow(1 + fixedInterest, duration);

        result = mortgagePricipal * ((fixedInterest * delta) / (delta - 1));


    }
    
    if (mortgageType === "interest"){

        result = mortgagePricipal * fixedInterest;

    }

    return result;

}

function calculateMortgageYear(amountValue, yearTermValue, interestRateValue) {

    return calculateMortgageMonth(amountValue, yearTermValue, interestRateValue) * (yearTermValue * 12);

}


function validadeForm() {

    const amountInput = document.querySelector("#amount");

    const yearTermInput = document.querySelector("#year-term");

    const interestRateInput = document.querySelector("#interest-rate");


    const isAmountValid = validadeNumerInput(amountInput);

    const isYearTermValid = validadeNumerInput(yearTermInput);

    const isInterestRateValid = validadeNumerInput(interestRateInput);

    const isRadiosValid = validadeRadiosInputs();

    if (isAmountValid && isYearTermValid && isInterestRateValid && isRadiosValid) {

        const amountValue = amountInput.value;

        const yearTermValue = yearTermInput.value;

        const interestRateValue = interestRateInput.value;


        const monthlyRepayment = calculateMortgageMonth(amountValue, yearTermValue, interestRateValue);

        const totalRepayment = calculateMortgageYear(amountValue, yearTermValue, interestRateValue);

        console.log(monthlyRepayment);

        console.log(totalRepayment);

    }

}

function validadeNumerInput(input) {

    const messageErrorId = document.getElementById(input.getAttribute("aria-describedby"));

    if (input.value === "") {

        input.setAttribute("aria-invalid", "true");

        showMessageError(messageErrorId);

        return false;

    }

    input.setAttribute("aria-invalid", "false");

    hiddenMessageError(messageErrorId);

    return true;

}

function validadeRadiosInputs() {

    const repaymentInput = document.querySelector("#repayment");

    const interest = document.querySelector("#interest");

    const messageError = document.getElementById("mortgage-type-error");

    if (!repaymentInput.checked && !interest.checked) {

        showMessageError(messageError);

        return false;

    }

    hiddenMessageError(messageError);

    return true;

}

function showMessageError(messageError) {

    messageError.hidden = false;

    messageError.classList.add("show");

}

function hiddenMessageError(messageError) {

    messageError.hidden = true;

    messageError.classList.remove("show");

}