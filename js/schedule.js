document.addEventListener("DOMContentLoaded", function() {
    fetch('https://ergast.com/api/f1/current/next.json')
        .then(response => response.json())
        .then(data => {
            const nextRace = data.MRData.RaceTable.Races[0];
            const eventDetails = `${nextRace.raceName} on ${nextRace.date} at ${nextRace.Circuit.circuitName}.`;

            document.getElementById("f1-event-info").textContent = eventDetails;
        })
        .catch(error => {
            console.error('Error fetching F1 data:', error);
            document.getElementById("f1-event-info").textContent = 'Unable to load the next event details.';
        });
});

function fetchWrcEvent() {
    const wrcApiUrl = 'https://api.wrc.com/contel-page/83388/calendar/active-season/';

    fetch(wrcApiUrl)
        .then(response => response.json())
        .then(wrcData => {
            const wrcEvent = wrcData.calendar[0]; // Assuming the next event is the first one in the array
            
            const eventDetails = `
                The next WRC event is the ${wrcEvent.name} on ${wrcEvent.date} at ${wrcEvent.location}.
            `;
            document.getElementById("wrc-erc-event-info").innerHTML = eventDetails;
        })
        .catch(error => {
            console.error('Error fetching WRC data:', error);
            document.getElementById("wrc-erc-event-info").textContent = 'No next event information :(';
        })
}

document.addEventListener("DOMContentLoaded", fetchWrcEvent);

