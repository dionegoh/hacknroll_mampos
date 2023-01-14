import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';


function DateTimeString() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        }
    })

    function refreshClock() {
        setDate(new Date());
    }

    let day, numericMonth, alphabetMonth, year;

    year = date.getFullYear();
    numericMonth = date.getMonth() + 1;
    day = date.getDate();

    if (numericMonth = 1) {
        alphabetMonth = 'January';
    } else if (numericMonth = 2) {
        alphabetMonth = 'February';
    } else if (numericMonth = 3) {
        alphabetMonth = 'March';
    } else if (numericMonth = 4) {
        alphabetMonth = 'April';
    } else if (numericMonth = 5) {
        alphabetMonth = 'May';
    } else if (numericMonth = 6) {
        alphabetMonth = 'June';
    } else if (numericMonth = 7) {
        alphabetMonth = 'July';
    } else if (numericMonth = 8) {
        alphabetMonth = 'August';
    } else if (numericMonth = 9) {
        alphabetMonth = 'September';
    } else if (numericMonth = 10) {
        alphabetMonth = 'October';
    } else if (numericMonth = 11) {
        alphabetMonth = 'November';
    } else if (numericMonth = 12) {
        alphabetMonth = 'December'
    } else {
        alphabetMonth = ':('
    }
    
    return (
        <Text fontSize='24px' font=''>
            {day + " " + alphabetMonth + " " + year}
        </Text>
    );
}

export default DateTimeString;