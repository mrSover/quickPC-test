import { FC } from 'react'
import IEvent from '../models/IEvent';
import { Link } from 'react-router-dom';
import "../styles/EventBoard.css"
interface EventListProps {
  sortedEvents: IEvent[]
}

const EventList: FC<EventListProps> = ({ sortedEvents }) => {
  return (
    <>
      <div className='eventBoard__items' >
        {
          sortedEvents.map(event =>
          (<div className="eventBoard__item" key={event._id} >
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {event.eventDate.slice(0, 10)}</p>
            <div style={{ display: 'flex', justifyContent: "space-around", width: "100%" }}>
              <Link to={`/events/${event._id}/registration`}> Register </Link>
              <Link to={`/events/${event._id}`}> View</Link>
            </div>

          </div>))
        }
      </div>

    </>


  )
}

export default EventList;