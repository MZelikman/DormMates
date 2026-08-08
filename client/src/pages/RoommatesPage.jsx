import { useState, useEffect } from 'react';
import {getRoommates, addRoommate, deleteRoommate} from '../api.js';

function RoommatesPage() {
  const [roommates, setRoommates] = useState([]);
  const [name, setName] = useState('');

  const loadRoommates = async () => {
    const response = await getRoommates();
    setRoommates(response.data);
  }
  
  useEffect(() => {
    loadRoommates();                              
  }, []);

  const addingRoommate = async (event) => {
    event.preventDefault();
    if (!name.trim()){
        return;
    }
    await addRoommate({name, house: 'default-house'});
    setName('');
    loadRoommates();
  };

  const deletingRoommate = async (id) => {
    await deleteRoommate(id);
    loadRoommates();
  };

  return (
    <div>
      <h1>Roommates</h1>


      <form onSubmit = {addingRoommate}>
        <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='Roommate name'
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {roommates.map((roommate) => (
          <li key={roommate._id}>
            {roommate.name}
            <button onClick={() => deletingRoommate(roommate._id)}>Delete</button>
          </li>
        ))}
        </ul>

    </div>
  );
}

export default RoommatesPage;
