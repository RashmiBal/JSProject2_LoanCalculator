
document.getElementById('loan-form').addEventListener('submit',(e)=>{
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calcResult,2000);
    e.preventDefault();
});

function calcResult(e){
    console.log('Calculating...');
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;
    console.log(parseFloat(amount));
    console.log(parseFloat(interest));
    console.log(parseInt(years));
    const principal = parseFloat(amount);
    const calcInterest = parseFloat(interest)/100/12;
    const calcPayments = parseFloat(years) * 12;

    const x = Math.pow(1 + calcInterest, calcPayments);
    const monthly = (principal *  x * calcInterest)/(x-1);

    document.getElementById('loading').style.display = 'none';

    if(isFinite(monthly)){
        const monthlypayment = document.getElementById('monthly-payment');
        const totalpayment = document.getElementById('total-payment');
        const totalinterest = document.getElementById('total-interest');
        monthlypayment.value = monthly.toFixed(2);
        totalpayment.value = (monthly * calcPayments).toFixed(2);
        totalinterest.value = ((monthly * calcPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please check your numbers');
    }
}

function showError(error){
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    // clear error
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}