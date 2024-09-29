import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";
import { eventService } from "../services/EventService";




const store = configureStore({
  reducer: {
    event: eventsReducer,
    [eventService.reducerPath]: eventService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventService.middleware)

})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store