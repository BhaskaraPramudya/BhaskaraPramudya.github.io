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

function fetchAndParseSchedule() {
    // Path to the HTML file
    const htmlFilePath = 'asset/wrc_schedule_with_sub_events.html';
    
    fetch(htmlFilePath)
        .then(response => response.text())
        .then(htmlString => {
            // Create a temporary container to parse the HTML
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = htmlString;

            // Extract schedule items
            const scheduleItems = tempContainer.querySelectorAll('.wrc-schedule > li');
            
            const now = new Date();
            let nearestEvent = null;
            let minDifference = Infinity;

            scheduleItems.forEach(item => {
                // Extract event name and date
                const nameElement = item.querySelector('strong');
                const dateText = item.textContent.match(/\d{2} \w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}/);

                if (nameElement && dateText) {
                    const eventName = nameElement.textContent;
                    const eventDate = new Date(dateText[0]);

                    // Find the nearest event
                    const difference = eventDate - now;
                    if (difference > 0 && difference < minDifference) {
                        minDifference = difference;
                        nearestEvent = {
                            name: eventName,
                            date: eventDate.toLocaleString(),
                            details: Array.from(item.querySelectorAll('ul > li')).map(detail => detail.textContent)
                        };
                    }
                }
            });

            // Display the nearest event
            const eventDetails = nearestEvent ? `
                <strong>${nearestEvent.name}</strong>: ${nearestEvent.date}
                <ul>
                    ${nearestEvent.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            ` : 'No upcoming events found.';

            document.getElementById("wrc-schedule-info").innerHTML = eventDetails;
        })
        .catch(error => {
            console.error('Error fetching the schedule:', error);
            document.getElementById("wrc-schedule-info").textContent = 'Error loading schedule.';
        });
}

// Call the function when the page loads
window.onload = fetchAndParseSchedule;

