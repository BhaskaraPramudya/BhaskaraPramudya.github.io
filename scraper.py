import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pytz
from dateutil import tz
import os

# Define your local time zone (GMT+8)
your_timezone = tz.gettz('Asia/Singapore')

# Time zone mapping for different event locations
time_zone_mapping = {
    'Monte Carlo': 'Europe/Monaco',
    'Sweden': 'Europe/Stockholm',
    'Kenya': 'Africa/Nairobi',
    'Croatia': 'Europe/Zagreb',
    'Portugal': 'Europe/Lisbon',
    'Italy': 'Europe/Rome',
    'Poland': 'Europe/Warsaw',
    'Latvia': 'Europe/Riga',
    'Finland': 'Europe/Helsinki',
    'Greece': 'Europe/Athens',
    'Chile': 'America/Santiago',
    'Central Europe': 'Europe/Berlin',  # Adjust based on specific event location
    'Japan': 'Asia/Tokyo'
}

def convert_to_local_time(date_str, time_str, location):
    """Convert local time to GMT+8 time based on event location."""
    # Define the format of the date and time strings
    datetime_str = f"{date_str} {time_str}"
    # Adjust this format based on the actual date and time format
    datetime_format = "%d %b %H:%M"

    try:
        # Parse the datetime string into a datetime object
        local_time = datetime.strptime(datetime_str, datetime_format)

        # Get the current year to handle missing year in date_str
        current_year = datetime.now().year
        local_time = local_time.replace(year=current_year)

        # Get the time zone for the location
        event_timezone = time_zone_mapping.get(location, 'UTC')
        event_tz = tz.gettz(event_timezone)

        # Localize the time in the event's time zone
        local_time_in_event_tz = local_time.replace(tzinfo=event_tz)

        # Convert local time to your timezone (GMT+8)
        local_time_in_your_tz = local_time_in_event_tz.astimezone(your_timezone)

        return local_time_in_your_tz.strftime("%d %b %Y %H:%M")
    except Exception as e:
        print(f"Error converting time for location {location}: {e}")
        return "N/A"

# Fetch the web page
url = "https://www.autosport.com/wrc/schedule/2024/"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table containing the schedule
schedule_table = soup.find('table', class_='ms-schedule-table')

# Extract the main event names, dates, and times including sub-events
schedule_data = []
for tbody in schedule_table.find_all('tbody', class_='ms-schedule-table__item'):
    # Get the first <tr> element within the <tbody> which corresponds to the main event
    main_event_row = tbody.find('tr')

    # Ensure the main event row is correctly identified
    if main_event_row:
        # Event name
        event_name = main_event_row.find('a', class_='ms-link').get_text(strip=True)

        # Date
        date = main_event_row.find('span', class_='ms-schedule-table-date__value').get_text(strip=True)

        # Time (local time)
        time = main_event_row.find('span', class_='ms-schedule-table-date--local').get_text(strip=True)

        # Extract location from event name or use a default location
        location = ' '.join(event_name.split()[-2:])  # Extract last two words as location
        location = location if location in time_zone_mapping else 'Central Europe'

        # Convert time to local timezone
        converted_time = convert_to_local_time(date, time, location)

        # Create a list for sub-events
        sub_events = [(date, converted_time)]

        # Find all additional <tr> elements within the same <tbody> for sub-events
        for sub_event_row in tbody.find_all('tr')[1:]:
            sub_event_name_elem = sub_event_row.find('span', class_='ms-schedule-table-subevent-day__title')
            sub_event_date_elem = sub_event_row.find('span', class_='ms-schedule-table-subevent-day__date-value text-body font-bold uppercase ms-schedule-table-date--local')
            sub_event_time_elem = sub_event_row.find('div', class_='ms-schedule-table-subevent-day__time text-body font-bold uppercase ms-schedule-table-date--local')

            # Check if elements were found before extracting text
            sub_event_name = sub_event_name_elem.get_text(strip=True) if sub_event_name_elem else "N/A"
            sub_event_date = sub_event_date_elem.get_text(strip=True) if sub_event_date_elem else "N/A"
            sub_event_time = sub_event_time_elem.get_text(strip=True) if sub_event_time_elem else "N/A"

            # Convert sub-event time to local timezone
            converted_sub_event_time = convert_to_local_time(sub_event_date, sub_event_time, location)

            sub_events.append((sub_event_name, sub_event_date, converted_sub_event_time))

        # Add the main event and its sub-events to the schedule data
        schedule_data.append((event_name, sub_events))

# Generate the HTML output
html_output = '<ul class="wrc-schedule">\n'
for event_name, events in schedule_data:
    html_output += f'    <li><strong>{event_name}</strong>: {events[0][0]}, {events[0][1]}\n'
    if len(events) > 1:
        html_output += '        <ul>\n'
        for sub_event_name, sub_event_date, sub_event_time in events[1:]:
            html_output += f'            <li>{sub_event_name}: {sub_event_date}, {sub_event_time}</li>\n'
        html_output += '        </ul>\n'
    html_output += '    </li>\n'
html_output += '</ul>'

if not os.path.exists('asset'):
    os.makedirs('asset')

# Save to a file or print the HTML
with open('asset/wrc_schedule_with_sub_events.html', 'w') as f:
    f.write(html_output)