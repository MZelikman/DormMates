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




  return (
    <div>
      <h1>Chores</h1>
    </div>
  );
}

export default ChoresPage;