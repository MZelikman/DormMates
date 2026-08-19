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
    <div className="flex items-baseline justify-between mb-1">
      <p className="text-sm text-inksoft mb-6">
        Everyone added here can be palced into a chore rotation.
      </p>
    </div>
    <div className="flex items-baseline justify-between mb-1">
      <h1 className="font-display text-xl font-semibold">Roommates</h1>
      <span className="font-mono-text-[11px] uppercase tracking-widest text-inksoft">
        {roommates.length} {roommates.length === 1 ? 'member' : 'members'}
      </span>
      <form className="flex gap-2 mb-8" onSubmit = {addingRoommate}>
        <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='Roommate name'
            className="flex-1 bg-surface border border-line rounded-lg px-3.5 py-2.5 text-sm focus: ring-1 focus:ring-brass/40 focus:outline-none"
        />
        <button type="submit" class="bg-ink text-white text-sm font-medium rounded-lg px-5 ml-2 hover:bg-ink/90 focus:outline-none focus:ring-2">Add</button>
      </form>
      <ul className="flex flex-col gap-2">
        {roommates.map((roommate) => (
          <li key={roommate._id} className="group bg-surface border border-line rounded-xl px-4 py-3.5 flex items-center gap-4">
            <span className="flex-1 font-medium">{roommate.name}</span>
            <button onClick={() => deletingRoommate(roommate._id)} className="text-xs text-inksoft opacity: 0 group-hover:opacity-100 focus:opacity-100 hover:text-flag transition-opacity px-2 py-1 rounded focus:outline-none focus:ring-2">Delete</button>
          </li>
        ))}
        </ul>

    </div>
    </div>
  );
}

export default RoommatesPage;
