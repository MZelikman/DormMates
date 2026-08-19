import express from 'express';
import Chore from '../models/Chore.js'

const router = express.Router();


router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.house ||
            !request.body.frequencyDays ||
            !request.body.rotationOrder ||
            !request.body.dueDate
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, house, frequencyDays, rotationOrder, dueDate',
            });
        }

        const newChore = {
            name: request.body.name,
            house: request.body.house,
            frequencyDays: request.body.frequencyDays,
            rotationOrder: request.body.rotationOrder,
            dueDate: request.body.dueDate,
        };

        const chore = await Chore.create(newChore);

        return response.status(201).send(chore);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const chore = await Chore.findByIdAndDelete(id);

        if (!chore) {
            return response.status(404).send({ message: 'Chore not found' });
        }

        return response.status(200).send({ message: 'Chore deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const chores = await Chore.find({});

        return response.status(200).json(chores);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/:id/complete', async (request, response) => {
    try {

        const { id } = request.params;

        const chore = await Chore.findById(id);

        if (!chore) {
            return response.status(404).send({ message: 'Chore not found' });
        }

        const roommatesNum = chore.rotationOrder.length;

        if (roommatesNum > 0) {
            chore.currentChoice = (chore.currentChoice + 1) % roommatesNum;
        }

        chore.lastCompleted = new Date();

        const nextDue = new Date();
        nextDue.setDate(nextDue.getDate() + chore.frequencyDays);
        chore.dueDate = nextDue;

        await chore.save();
        return response.status(200).json(chore);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;



