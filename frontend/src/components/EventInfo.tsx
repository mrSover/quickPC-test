import { FC, useState } from 'react'
import { useAppSelector } from "../hooks/redux"
import { useParams } from 'react-router-dom'


const EventInfo: FC = ({ }) => {
  const events = useAppSelector(state => state.event.events)
  const params = useParams()
  const currEvent = events?.find(item => item._id === params.id)
  const participants = currEvent?.participants || [];
  if (!participants || participants.length === 0) {
    return <>Жодна людина ще не зареєструвалась</>
  }
  const [searchByNameValue, setSearchByNameValue] = useState<string>("");
  const [searchByEmailValue, setSearchByEmailValue] = useState<string>("");



  const filteredParticipants = participants.filter((participant) => {
    const matchesName = participant.fullName
      .toLowerCase()
      .includes(searchByNameValue.toLowerCase());
    const matchesEmail = participant.email
      .toLowerCase()
      .includes(searchByEmailValue.toLowerCase());

    return matchesName && matchesEmail;
  });

  return (
    <div>
      <h3>{currEvent?.title} - Учасники</h3>

      <div>
        <label htmlFor="searchByName">Шукати за ім'ям </label>
        <input
          type="text"
          id="searchByName"
          value={searchByNameValue}
          onChange={(e) => setSearchByNameValue(e.target.value)}
          placeholder="Введіть ім'я"
        />
      </div>

      <div>
        <label htmlFor="searchByEmail">Шукати за поштою </label>
        <input
          type="text"
          id="searchByEmail"
          value={searchByEmailValue}
          onChange={(e) => setSearchByEmailValue(e.target.value)}
          placeholder="Введіть пошту"
        />
      </div>

      {filteredParticipants.length > 0 ? (
        filteredParticipants.map((item, index) => (
          <div key={item.email} style={{ width: 200, margin: '10px 0' }}>

            <p>{index + 1}. Ім'я: {item.fullName}</p>
            <p>Пошта: {item.email}</p>
          </div>
        ))
      ) : (
        <p>Учасників, які відповідають критеріям пошуку, не знайдено.</p>
      )}
    </div>
  );
}


export default EventInfo;