document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('journeyForm');
    const tableBody = document.getElementById('tableData');
    const totalKm = document.getElementById('totalKm');
    const totalTime = document.getElementById('totalTime');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    
        const beginnDatum = document.getElementById('beginnDatum').value;
        const endDatum = document.getElementById('endDatum').value;
        const zweckDerFahrt = document.getElementById('zweckDerFahrt').value;
        const gefKm = document.getElementById('gefKm').value;
    
        const travelTime = new Date(endDatum) - new Date(beginnDatum);
        // millisec => sek => min => h
        const formattedTravelTime = Math.floor(travelTime / (1000 * 60 * 60)) + 'h ' + Math.floor((travelTime % (1000 * 60 * 60)) / (1000 * 60)) + 'm';
    
        const newRow = document.createElement('tr');
        const beginnCell = document.createElement('td');
        beginnCell.textContent = beginnDatum;
        const endCell = document.createElement('td');
        endCell.textContent = endDatum;
        const travelTimeCell = document.createElement('td');
        travelTimeCell.textContent = formattedTravelTime;
        const zweckCell = document.createElement('td');
        zweckCell.textContent = zweckDerFahrt;
        const gefKmCell = document.createElement('td');
        gefKmCell.textContent = gefKm;
    
        newRow.appendChild(beginnCell);
        newRow.appendChild(endCell);
        newRow.appendChild(travelTimeCell);
        newRow.appendChild(zweckCell);
        newRow.appendChild(gefKmCell);
    
        tableBody.insertBefore(newRow, tableBody.firstChild);
    
        totalKm.textContent = parseInt(totalKm.textContent) + parseInt(gefKm);
        totalTime.textContent = formattedTravelTime;
    
        form.reset();
    });
    });

