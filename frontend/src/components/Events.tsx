import { FC, useState } from 'react'
import { useGetEventsQuery } from '../services/EventService'
import { useAppSelector } from '../hooks/redux'
import { sortEvents } from '../utils/sortEvents'
import EventList from './EventList'
import { countPages } from '../utils/countPages'
import Pagination from './Pagination'
import EventSort from './EventSort'
import "../styles/EventBoard.css"



const Events: FC = ({ }) => {
  const [page, setPage] = useState(1)
  const [sortType, setSortType] = useState<string>("title");
  const { data, isLoading } = useGetEventsQuery(`${page - 1}`, {
    refetchOnMountOrArgChange: true,
  })
  const events = useAppSelector(state => state.event.events)

  const changePage = (page: number) => {
    setPage(page)
  }

  if (isLoading) return <>LOADINGGGG</>
  if (!data?.events) return <>NO EVENTS</>

  const pages = countPages(+data.amount)
  const sortedEvents = sortEvents(events, sortType)
  return (
    <>
      <div className='eventBoard__container' >
        <EventSort sortType={sortType} setSortType={setSortType} />
        <EventList sortedEvents={sortedEvents} />
        <Pagination pages={pages} setPage={changePage} />
      </div>

    </>
  )
}

export default Events;