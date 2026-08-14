import { useState, useEffect } from 'react';
import { getChores, addChore, completeChore, deleteChore, getRoommates } from '../api.js';


function ChoresPage() {
  const [chores, setChores] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [choreName, setChoreName] = useState('');
  const [frequencyDays, setFrequencyDays] = useState(7);
  const [selectedRoommates, setSelectedRoommates] = useState([]);

  const loadChores = async () => {
    const response = await getChores();
    setChores(response.data);
  }

  
  const loadRoommates = async () => {
    const response = await getRoommates();
    setRoommates(response.data);
    setSelectedRoommates(response.data.map((roommate) => roommate._id))
  }

  useEffect(() => {
    loadRoommates();
    loadChores();
  }, []);

  const toggleRoommate = (id) => {
    if (selectedRoommates.includes(id)) {
      setSelectedRoommates(selectedRoommates.filter((roommate) => roommate !== id));
    } else {
      
      setSelectedRoommates([...selectedRoommates, id]);

    }
  }

  const handleAddChore = async (e) => {
    e.preventDefault();
    if (!choreName.trim() || selectedRoommates.length === 0){
      return;
    }

    const nextDue = new Date();
    nextDue.setDate(nextDue.getDate() + Number(frequencyDays));


    await addChore({
      name: choreName,
      house: 'default-house',
      frequencyDays: Number(frequencyDays),
      rotationOrder: selectedRoommates,
      dueDate: nextDue,
    });

    setChoreName('');
    loadChores();

  }

  const deletingChore = async (id) => {
    await deleteChore(id);
    loadChores();
  };

  const handleComplete = async (id) => {
    await completeChore(id);
    loadChores();
  };


  return (
    <div>
      <h1>Chores</h1>

      <form onSubmit = {handleAddChore}>
        <input
            type="text"
            value={choreName}
            onChange={(event) => setChoreName(event.target.value)}
            placeholder='Chore name'
        />

        <select value={frequencyDays} onChange={(event) => setFrequencyDays(event.target.value)}>
          <option value={7}>Weekly</option>
          <option value={14}>Biweekly</option>
          <option value={1}>Daily</option>
        </select>


        <div>
          <span>Rotation:</span>
            {roommates.map((r) => (
              <label key={r._id}>
                <input
                  type="checkbox"
                  checked={selectedRoommates.includes(r._id)}
                  onChange={() => toggleRoommate(r._id)}
                />
                {r.name}
              </label>
            ))}
        </div>


        <button type="submit">Add Chore</button>
      </form>

      <ul>
        {chores.map((chore) => (
          <li key={chore._id}>
            {chore.name}
            <button onClick={() => handleComplete(chore._id)}>Complete</button>
            <button onClick={() => deletingChore(chore._id)}>Delete</button>
          </li>
        ))}
        </ul>
      
    </div>
  );
}

export default ChoresPage;