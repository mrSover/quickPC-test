import { IParticipant } from "./IParticipant";

export default interface IEvent {
  _id: string,
  title: string,
  description: string,
  eventDate: string,
  organizer: string,
  participants: IParticipant[]
}
