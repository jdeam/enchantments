const getAvailableDates = require('./getAvailableDates');
const sendMessage = require('./sendMessage');
const addLog = require('./addLog');

const POLL_PERIOD_MS = 30000;
const ERROR_THRESHOLD = 5;
const URL = 'https://www.recreation.gov/permits/233273/registration/detailed-availability?date=2021-09-18';
const EMPTY_MESSAGE = 'No dates available';
const STARTUP_MESSAGE = 'Starting to poll for availability...';
const ERROR_MESSAGE = `Exited after ${ERROR_THRESHOLD} errors`;

const pollForAvailability = async (errorCount = 0) => {
    let message = EMPTY_MESSAGE;

    addLog(STARTUP_MESSAGE);

    while (errorCount < ERROR_THRESHOLD) {
        try {
            const [availableDates] = await Promise.all([
                getAvailableDates(),
                new Promise(r => setTimeout(r, POLL_PERIOD_MS)),
            ]);
    
            const nextMessage = availableDates.join(' / ') || EMPTY_MESSAGE;
            addLog(nextMessage)
            
            if (nextMessage !== message) {
                sendMessage(`${nextMessage}\n${URL}`);
            }
    
            message = nextMessage;
        } catch(err) {
            addLog(err.message);
            pollForAvailability(errorCount + 1);
        }
    }

    addLog(ERROR_MESSAGE);
    process.exit();
};

pollForAvailability();
