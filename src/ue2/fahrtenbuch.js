
// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('journeyForm');
//     const tableBody = document.getElementById('tableData');
//     const totalKm = document.getElementById('totalKm');
//     const totalTime = document.getElementById('totalTime');

//     form.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const beginnDatum = document.getElementById('beginnDatum').value;
//         const endDatum = document.getElementById('endDatum').value;
//         const zweckDerFahrt = document.getElementById('zweckDerFahrt').value;
//         const gefKm = document.getElementById('gefKm').value;

//         const travelTime = new Date(endDatum) - new Date(beginnDatum);
//         // millisec => sek => min => h
//         const formattedTravelTime = Math.floor(travelTime / (1000 * 60 * 60)) + 'h ' + Math.floor((travelTime % (1000 * 60 * 60)) / (1000 * 60)) + 'm';

//         const newRow = document.createElement('tr');
//         const beginnCell = document.createElement('td');
//         beginnCell.textContent = beginnDatum;
//         const endCell = document.createElement('td');
//         endCell.textContent = endDatum;
//         const travelTimeCell = document.createElement('td');
//         travelTimeCell.textContent = formattedTravelTime;
//         const zweckCell = document.createElement('td');
//         zweckCell.textContent = zweckDerFahrt;
//         const gefKmCell = document.createElement('td');
//         gefKmCell.textContent = gefKm;

//         newRow.appendChild(beginnCell);
//         newRow.appendChild(endCell);
//         newRow.appendChild(travelTimeCell);
//         newRow.appendChild(zweckCell);
//         newRow.appendChild(gefKmCell);

//         tableBody.insertBefore(newRow, tableBody.firstChild);

//         totalKm.textContent = parseInt(totalKm.textContent) + parseInt(gefKm);
//         totalTime.textContent = formattedTravelTime;

//         form.reset();
//     });
// });

class Journey {
    constructor(beginnDatum, endDatum, zweckDerFahrt, gefKm) {
        this.beginnDatum = beginnDatum;
        this.endDatum = endDatum;
        this.zweckDerFahrt = zweckDerFahrt;
        this.gefKm = gefKm;
    }

    getTravelTime() {
        const travelTime = new Date(this.endDatum) - new Date(this.beginnDatum);
        const formattedTravelTime = Math.floor(travelTime / (1000 * 60 * 60)) + 'h ' + Math.floor((travelTime % (1000 * 60 * 60)) / (1000 * 60)) + 'm';
        return formattedTravelTime;
    }
}

class JourneyTracker {
    constructor() {
        this.journeys = [];
        this.totalKm = 0;
        this.totalTime = '';

        // Get form and table elements for interaction
        this.form = document.getElementById('journeyForm');
        this.tableBody = document.getElementById('tableData');
        this.totalKmElement = document.getElementById('totalKm');
        this.totalTimeElement = document.getElementById('totalTime');

        // Add event listener to form submission (bind this for proper context)
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();

        // Get input values
        const beginnDatum = document.getElementById('beginnDatum').value;
        const endDatum = document.getElementById('endDatum').value;
        const zweckDerFahrt = document.getElementById('zweckDerFahrt').value;
        const gefKm = document.getElementById('gefKm').value;

        // Create a new Journey object
        const newJourney = new Journey(beginnDatum, endDatum, zweckDerFahrt, gefKm);

        // Add journey to internal list
        this.journeys.push(newJourney);

        // Update totals using the new journey
        this.updateTotals(newJourney);

        // Create and append table row for the new journey
        this.createTableRow(newJourney);

        // Reset form
        this.form.reset();
    }

    updateTotals(newJourney) {
        this.totalKm += parseInt(newJourney.gefKm);
        this.totalTime = newJourney.getTravelTime();

        // Update total elements on the page
        this.totalKmElement.textContent = this.totalKm;
        this.totalTimeElement.textContent = this.totalTime;
    }

    createTableRow(newJourney) {
        const newRow = document.createElement('tr');
        const beginnCell = document.createElement('td');
        beginnCell.textContent = newJourney.beginnDatum;
        const endCell = document.createElement('td');
        endCell.textContent = newJourney.endDatum;
        const travelTimeCell = document.createElement('td');
        travelTimeCell.textContent = newJourney.getTravelTime();
        const zweckCell = document.createElement('td');
        zweckCell.textContent = newJourney.zweckDerFahrt;
        const gefKmCell = document.createElement('td');
        gefKmCell.textContent = newJourney.gefKm;

        newRow.appendChild(beginnCell);
        newRow.appendChild(endCell);
        newRow.appendChild(travelTimeCell);
        newRow.appendChild(zweckCell);
        newRow.appendChild(gefKmCell);

        this.tableBody.insertBefore(newRow, this.tableBody.firstChild);
    }
}

// Wait for DOM to be loaded before starting the application
document.addEventListener('DOMContentLoaded', function () {
    const journeyTracker = new JourneyTracker();
});
