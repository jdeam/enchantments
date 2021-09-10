const fs = require('fs');

const LOG_PATH = 'logs.txt';

const addLog = (text) => {
    const timestamp = new Date().toString().split(' ').slice(0, 5).join(' ');
    const logMessage = `${timestamp} - ${text}`;
    console.log(logMessage);
    return fs.appendFile(LOG_PATH, `${logMessage}\n`, () => {});
};

module.exports = addLog;
