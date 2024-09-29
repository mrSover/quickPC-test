import { model, Schema } from "mongoose";


export const EventSchema = new Schema({
  title: String,
  description: String,
  eventDate: String,
  organizer: String,
  participants: [
    {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      dateOfBirth: { type: String, required: true },
      heardFrom: { type: String, required: true }
    }
  ],
})

export default model("Events", EventSchema);