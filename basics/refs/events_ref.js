const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {

        this.emit('message', `${message} ${Date.now()}`);

        console.log(message);
    }
}

const logger = new Logger();

logger.on('message', data => {
    console.log(data);
})


logger.log('Hello world');