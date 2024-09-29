import { FC } from 'react'

interface EventSortProps {
  setSortType: (sortType: string) => void
  sortType: string
}

const EventSort: FC<EventSortProps> = ({ setSortType, sortType }) => {
  return (
    <div>
      Сортувати за { }
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="title">Назвою</option>
        <option value="date">Датою</option>
        <option value="organizer">Організатором</option>
      </select>
    </div>
  )
}

export default EventSort;