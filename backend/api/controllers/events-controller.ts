import { Request, Response } from 'express';
import EventModel from '../models/EventModel';  // Підключаємо модель Event

class Events {
  async getEvents(req: Request, res: Response) {
    try {
      const events = await EventModel.find();
      const start = Number(req.query.page) * 3
      res.json({ events: events.slice(start, start + 3), amount: events.length });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  async addEvent(req: Request, res: Response) {
    try {
      const newEvent = req.body
      const event = await EventModel.create(newEvent);
      res.status(200).json(event);
    } catch (error) {
      console.error('Error adding events:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  async addParticipant(req: Request, res: Response) {
    try {
      const eventId = req.params.id
      const newParticipant = req.body
      const event = await EventModel.findById(eventId)

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      const isParticipantExist = event.participants.some((item) => item.email === newParticipant.email)

      if (isParticipantExist) {
        return res.status(404).json({ message: "Participant with same email already exist" });
      }
      event.participants.push(newParticipant)
      await event.save()
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json({ message: "Непередбачувана помилка" });
    }
  }
}

export default new Events();
