const riskCheckbox = document.getElementById('riskCheckbox');
const alertsCard = document.getElementById('alertsCard');

riskCheckbox.checked = true;
function toggleAlerts() {
    alertsCard.style.display = riskCheckbox.checked ? 'block' : 'none';
}
riskCheckbox.addEventListener('change', toggleAlerts);
toggleAlerts();

document.getElementById('menuBtn').addEventListener('click', () => alert('Меню'));
document.getElementById('logoutBtn').addEventListener('click', () => alert('Выход'));

function colorizePercentCells() {
    const cells = document.querySelectorAll('.percent-cell');
    cells.forEach(cell => {
        const percent = parseInt(cell.innerText, 10);
        if (percent < 99) cell.style.color = '#EB4343';
        else if (percent > 100) cell.style.color = '#EB7E43';
        else if (percent === 100) cell.style.color = '#3AC34A';
        else cell.style.color = '#1A2C3E';
    });
}
colorizePercentCells();