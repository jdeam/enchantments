const getAvailableDates = require('./getAvailableDates');
const sendMessage = require('./sendMessage');

const POLL_PERIOD_MS = 30000;
const RESERVATION_PAGE_URL = 'https://www.recreation.gov/permits/233273/registration/detailed-availability?date=2021-09-01';
const EMPTY_MESSAGE = 'No dates available';

const pollForAvailability = async () => {
    let message = EMPTY_MESSAGE;

    sendMessage('Starting to poll for availability ...');

    while (true) {
        try {
            const [availableDates] = await Promise.all([
                getAvailableDates(),
                new Promise(r => setTimeout(r, POLL_PERIOD_MS)),
            ]);
    
            const nextMessage = availableDates.join(' / ') || EMPTY_MESSAGE;

            const timestamp = new Date().toString().split(' ').slice(0, 5).join(' ');
            console.log(`${timestamp}: ${nextMessage}`);
            
            if (nextMessage !== message) {
                sendMessage(`${nextMessage}\n${RESERVATION_PAGE_URL}`);
            }
    
            message = nextMessage;
        } catch(err) {
            console.log(err);
            pollForAvailability();
        }
    }
};

pollForAvailability();
