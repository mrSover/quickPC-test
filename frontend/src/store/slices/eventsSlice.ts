import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IEvent from "../../models/IEvent";
import { eventService } from "../../services/EventService";
import { IEventsResponse } from "../../models/IEventsResponse";


export interface IEventsState {
  events: IEvent[]
  amount: string
}

export const initialState: IEventsState = {
  events: [],
  amount: "0"
}


export const eventsSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      eventService.endpoints.getEvents.matchFulfilled,
      (state, action: PayloadAction<IEventsResponse>) => {
        state.events = action.payload.events
      }
    );

  },
}
)
export default eventsSlice.reducer;