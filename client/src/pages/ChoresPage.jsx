import { useState, useEffect } from 'react';
import { getChores, addChore, completeChore, deleteChore, getRoommates } from '../api.js';
import { NURBSCurve } from 'three/examples/jsm/Addons.js';


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


      
    </div>
  );
}

export default ChoresPage;