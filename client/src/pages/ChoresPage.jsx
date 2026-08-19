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


  const getCurrentName = (id) => {
    const match = roommates.find((roommate) => roommate._id === id);

    return match ? match.name : 'Unknown';
  };
  
  const overdueCount = chores.filter((chore) => new Date(chore.dueDate) < new Date()).length;

  
  const freq = (days) =>
      days === 1
        ? 'Daily'
        : days === 14
        ? 'Every 2 weeks'
        : days === 7
        ? 'Weekly'
        : `Every ${days} days`;

	return (
		<div>
			<div className="flex gap-8 pb-6 mb-8 border-b border-line">
				<div>
					<div className="font-mono text-[11px] uppercase tracking-widest text-inksoft">
						Active
					</div>

					<div className="font-display text-2xl font-semibold mt-1">
						{chores.length}
					</div>
				</div>

				<div>
					<div className="font-mono text-[11px] uppercase tracking-widest text-inksoft">
						Overdue
					</div>

					<div
						className={`font-display text-2xl font-semibold mt-1 ${
							overdueCount > 0 ? 'text-flag' : ''
						}`}
					>
						{overdueCount}
					</div>
				</div>

				<div>
					<div className="font-mono text-[11px] uppercase tracking-widest text-inksoft">
						In rotation
					</div>

					<div className="font-display text-2xl font-semibold mt-1">
						{roommates.length}
					</div>
				</div>
			</div>

			<form
				onSubmit={handleAddChore}
				className="bg-surface border border-line rounded-xl p-5 mb-10"
			>
				<h2 className="font-display text-base font-semibold mb-4">
					Add a chore
				</h2>

				<div className="flex flex-col sm:flex-row gap-2 mb-4">
					<input
						type="text"
						value={choreName}
						onChange={(e) => setChoreName(e.target.value)}
						placeholder="What needs doing?"
						className="flex-1 bg-paper border border-line rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-brass"
					/>

					<select
						value={frequencyDays}
						onChange={(e) => setFrequencyDays(e.target.value)}
						className="bg-paper border border-line rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-brass"
					>
						<option value={1}>Daily</option>
						<option value={7}>Weekly</option>
						<option value={14}>Every 2 weeks</option>
					</select>
				</div>

				<div className="font-mono text-[11px] uppercase tracking-widest text-inksoft mb-2">
					Who takes turns
				</div>

				<div className="flex flex-wrap gap-2 mb-5">
					{roommates.map((r) => {
						const on = selectedRoommates.includes(r._id);

						return (
							<button
								type="button"
								key={r._id}
								onClick={() => toggleRoommate(r._id)}
								aria-pressed={on}
								className={`text-sm rounded-full px-3.5 py-1.5 border transition-colors focus:outline-none focus:ring-2 focus:ring-brass/40 ${
									on
										? 'bg-brasstint border-brass text-ink font-medium'
										: 'bg-paper border-line text-inksoft hover:text-ink'
								}`}
							>
								{r.name}
							</button>
						);
					})}

					{roommates.length === 0 && (
						<span className="text-sm text-inksoft">
							Add household members first.
						</span>
					)}
				</div>

				<button
					type="submit"
					className="bg-ink text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-ink/90 focus:outline-none focus:ring-2 focus:ring-brass/40 transition-colors"
				>
					Start rotation
				</button>
			</form>

			{chores.length === 0 ? (
				<div className="border border-dashed border-line rounded-xl px-6 py-12 text-center">
					<p className="text-inksoft text-sm">
						Nothing in rotation yet. Add a chore above and it starts cycling.
					</p>
				</div>
			) : (
				<ul className="flex flex-col gap-3">
					{chores.map((chore) => {
						const overdue = new Date(chore.dueDate) < new Date();
						const current =
							chore.rotationOrder[chore.currentChoice];

						return (
							<li
								key={chore._id}
								className={`bg-surface border rounded-xl overflow-hidden ${
									overdue
										? 'border-flag'
										: 'border-line'
								}`}
							>
								<div className="px-5 pt-4 pb-3 flex items-start justify-between gap-4">
									<div>
										<div className="flex items-center gap-2.5">
											<h3 className="font-display text-lg font-semibold">
												{chore.name}
											</h3>

											{overdue && (
												<span className="bg-flagtint text-flag font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded">
													Overdue
												</span>
											)}
										</div>

										<div className="font-mono text-xs text-inksoft mt-1.5">
											{freq(chore.frequencyDays)} · Due{' '}
											{new Date(
												chore.dueDate
											).toLocaleDateString(
												undefined,
												{
													month: 'short',
													day: 'numeric',
												}
											)}
										</div>
									</div>

									<div className="flex gap-2 shrink-0">
										<button
											onClick={() =>
												handleComplete(chore._id)
											}
											className="bg-ink text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-ink/90 focus:outline-none focus:ring-2 focus:ring-brass/40 transition-colors"
										>
											Mark done
										</button>

										<button
											onClick={() =>
												deletingChore(chore._id)
											}
											className="text-inksoft text-sm px-3 py-2 rounded-lg border border-line hover:text-flag hover:border-flag/40 transition-colors focus:outline-none focus:ring-2 focus:ring-flag/30"
										>
											Remove
										</button>
									</div>
								</div>

								<div className="px-5 py-3.5 bg-paper/60 border-t border-line">
									<div className="font-mono text-[10px] uppercase tracking-widest text-inksoft mb-2.5">
										Rotation
									</div>

									<div className="flex items-center gap-1.5 flex-wrap">
										{chore.rotationOrder.map(
											(id, i) => {
												const isCurrent =
													id === current;

												return (
													<span
														key={id}
														className="flex items-center gap-1.5"
													>
														<span
															className={`text-sm rounded-full px-3 py-1 border ${
																isCurrent
																	? 'bg-brass text-white border-brass font-semibold'
																	: 'bg-surface border-line text-inksoft'
															}`}
														>
															{getCurrentName(id)}
														</span>

														{i <
															chore
																.rotationOrder
																.length -
																1 && (
															<span className="text-line">
																→
															</span>
														)}
													</span>
												);
											}
										)}

										<span className="font-mono text-xs text-inksoft ml-1">
											↺
										</span>
									</div>

									<div className="text-xs text-inksoft mt-2.5">
										<span className="font-medium text-ink">
											{getCurrentName(current)}
										</span>{' '}
										is up. Marking done passes it along.
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			)}

			<section className="mt-14 pt-8 border-t border-line">
				<h2 className="font-mono text-[11px] uppercase tracking-widest text-inksoft mb-4">
					To be considered
				</h2>

				<div className="grid sm:grid-cols-3 gap-3">
					{[
						[
							'Fairness scoring',
							'Track completion share per person over time, not just turn order.',
						],
						[
							'Weighted chores',
							'Bathrooms cost more than trash. Rotate on effort, not headcount.',
						],
						[
							'Open bounties',
							'Pick up an extra turn, work your way towards a skip',
						],
					].map(([title, body]) => (
						<div
							key={title}
							className="border border-dashed border-line rounded-xl p-4"
						>
							<div className="font-display font-semibold text-sm">
								{title}
							</div>

							<p className="text-xs text-inksoft mt-1.5 leading-relaxed">
								{body}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

export default ChoresPage;