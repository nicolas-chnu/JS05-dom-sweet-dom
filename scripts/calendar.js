const calendarContent = document.querySelector('.calendar__content');
const monthSelector = document.querySelector('.calendar__month-selector');

function renderCalendar() {
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'St', 'Su'];

    const year = monthSelector.valueAsDate.getFullYear();
    const month = monthSelector.valueAsDate.getMonth();

    const startDayOfWeek = (new Date(year, month, 1).getDay() - 1 + 7) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let table = document.createElement('table');
    let row = document.createElement('tr');

    calendarContent.innerHTML = '';

    // add days of week
    for (const day of daysOfWeek) {
        let th = document.createElement('th');
        th.innerText = day;
        row.appendChild(th);
    }

    table.appendChild(row);

    // add dates
    let currentDate = 1;

    for (let r = 0; r < 6; r++) {
        let row = document.createElement('tr');

        for (let c = 0; c < 7; c++) {
            if (r === 0 && c < startDayOfWeek) {
                row.append(document.createElement('td'))
            } else if (currentDate > daysInMonth) {
                break;
            } else {
                let dateElem = document.createElement('td')
                dateElem.classList.add('show')
                dateElem.innerText = currentDate.toString();

                // use IIFE to create a new scope for each event listener
                (function (currentDate) {
                    dateElem.addEventListener(
                        'click',
                        () => alert(getTimeDeltaStr(new Date(year, month, currentDate))))
                })(currentDate);

                row.append(dateElem)
                currentDate++;
            }
        }
        table.appendChild(row)

        if (currentDate > daysInMonth) {
            break;
        }
    }
    calendarContent.appendChild(table)
}

function getTimeDeltaStr(selectedDate) {
    const currentDate = new Date();
    const difference = selectedDate - currentDate;

    const millisInSecond = 1000;
    const millisInMinute = millisInSecond * 60;
    const millisInHour = millisInMinute * 60;
    const millisInDay = millisInHour * 24;

    const days = Math.floor(difference / millisInDay);
    const hours = Math.floor((difference % millisInDay) / millisInHour);
    const minutes = Math.floor((difference % millisInHour) / millisInMinute);
    const seconds = Math.floor((difference % millisInMinute) / millisInSecond);

    if (difference < 0 && days === -1) {
        return 'Happy birthday!'
    }
    else if (difference < 0) {
        selectedDate.setFullYear(currentDate.getFullYear());

        let year = selectedDate - currentDate < 0
            ? selectedDate.getFullYear() + 1
            : selectedDate.getFullYear();

        return 'It seems like this birthday was in past\nBut for the next one ' +
            getTimeDeltaStr(selectedDate.setFullYear(year));
    }

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds are left`;
}

monthSelector.valueAsDate = new Date();
renderCalendar();