import { FC, useState } from 'react'
import { useAddParticipantMutation } from '../services/EventService';
import { useParams } from 'react-router-dom';

interface RegistrationProps {

}

const Registration: FC<RegistrationProps> = ({ }) => {
  const params = useParams()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    heardFrom: "",
    eventId: params.id
  });

  const [register] = useAddParticipantMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(formData)
    try {
      await register(formData).unwrap()
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Event registration</h1>

        <div>
          <label htmlFor="fullName"> Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth"> Date of birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <p>Where did you hear about this event?</p>
        <div style={{ display: "flex", gap: 10 }}>

          <label>
            <input
              type="radio"
              name="heardFrom"
              value="Social media"
              checked={formData.heardFrom === "Social media"}
              onChange={handleChange}
            />
            Social media
          </label>
          <label>
            <input
              type="radio"
              name="heardFrom"
              value="Friends"
              checked={formData.heardFrom === "Friends"}
              onChange={handleChange}
            />
            Friends
          </label>
          <label>
            <input
              type="radio"
              name="heardFrom"
              value="Found myself"
              checked={formData.heardFrom === "Found myself"}
              onChange={handleChange}
            />
            Found myself
          </label>
        </div>
        <br />
        <button type="submit">Submit</button>
      </div>

    </form>
  );
};

export default Registration;