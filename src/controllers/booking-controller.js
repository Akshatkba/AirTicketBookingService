const { StatusCodes } = require("http-status-codes");

const {BookingService} = require("../services/index");

const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require("../config/serverconfig");

const bookingService = new BookingService();

class BookingController {

    constructor(){
    }
    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const data = {message: 'success'};
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: 'Successfully published the event'
        });
    }
    async create (req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("FROM BOOKING CONTROLLER: ", response);
            return res.status(StatusCodes.OK).json({
                message: 'successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            console.log('FROM BOOKING CONTROLLER ERROR: ', error);
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookingController;