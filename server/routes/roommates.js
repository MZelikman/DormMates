import express from 'express';
import Roommate from '../models/Roommate.js';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const roommates = await Roommate.find({});

        return response.status(200).json(roommates);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/', async (request, response) => {
    try {
        if (!request.body.name || !request.body.house) {
            return response.status(400).send({
                message: 'Send all required fields: name, house',
            });
        }

        const newRoommate = {
            name: request.body.name,
            house: request.body.house,
        };

        const roommate = await Roommate.create(newRoommate);

        return response.status(201).send(roommate);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const roommate = await Roommate.findByIdAndDelete(id);

        if (!roommate) {
            return response.status(404).send({ message: 'Roommate not found' });
        }

        return response.status(200).send({ message: 'Roommate deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;