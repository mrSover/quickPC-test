import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IEventsResponse } from "../models/IEventsResponse";



export const eventService = createApi({
  reducerPath: "eventService",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getEvents: builder.query<IEventsResponse, string>({
      query: (page) => ({
        url: `/events?page=${page}`,
        method: "GET",
      })
    }),
    addParticipant: builder.mutation({
      query: (body) => ({
        url: `/events/${body.eventId}/registration`,
        method: "POST",
        body: body
      })
    }),
  })
})
export const { useGetEventsQuery, useAddParticipantMutation } = eventService;