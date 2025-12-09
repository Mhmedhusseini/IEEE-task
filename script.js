let tipPercent = 0;

const tipBtns = document.querySelectorAll('.t-btn');

tipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tipBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('custom-tip').value = '';
        tipPercent = parseFloat(btn.dataset.val) / 100;
        updateResults();
    });
});

document.getElementById('custom-tip').addEventListener('input', e => {
    tipBtns.forEach(b => b.classList.remove('active'));
    let val = parseFloat(e.target.value);
    tipPercent = val > 0 ? val / 100 : 0;
    updateResults();
});

document.getElementById('bill-input').addEventListener('input', updateResults);
document.getElementById('people-input').addEventListener('input', updateResults);

function updateResults() {
    const bill = parseFloat(document.getElementById('bill-input').value) || 0;
    const people = parseFloat(document.getElementById('people-input').value) || 0;
    const tipDisplay = document.getElementById('tip-total');
    const totalDisplay = document.getElementById('total-final');
    const resetBtn = document.getElementById('reset-button');
    const errorText = document.getElementById('error-text');
    const peopleInput = document.getElementById('people-input');

    resetBtn.disabled = !(bill > 0 || people > 0 || tipPercent > 0);

    if (people < 1) {
        errorText.innerText = "لا يمكن أن يكون صفر";
        peopleInput.style.border = '2px solid #E17457';
        tipDisplay.innerText = "$0.00";
        totalDisplay.innerText = "$0.00";
        return;
    }

    errorText.innerText = "";
    peopleInput.style.border = '1px solid transparent';

    if (bill > 0) {
        const totalTip = bill * tipPercent;
        const tipPerPerson = totalTip / people;
        const totalPerPerson = (bill + totalTip) / people;
        tipDisplay.innerText = `$${tipPerPerson.toFixed(2)}`;
        totalDisplay.innerText = `$${totalPerPerson.toFixed(2)}`;
    }
}

document.getElementById('reset-button').addEventListener('click', () => {
    ['bill-input','people-input','custom-tip'].forEach(id => document.getElementById(id).value = '');
    tipPercent = 0;
    tipBtns.forEach(b => b.classList.remove('active'));
    updateResults();
    document.getElementById('reset-button').disabled = true;
});
