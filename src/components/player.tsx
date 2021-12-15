import type { playerData, jsonData } from "../types/types";

export default function PlayerComponent({
	data,
	player,
	i,
	saveDb,
}: {
	data: jsonData;
	player: playerData;
	i: number;
	saveDb: (data: jsonData) => void;
}) {
	const { name, rank, money, wins, losses } = player;
	const WLRatio = wins / (losses + wins);

	return (
		<>
			{i !== 0 ? (
				<hr
					style={{
						marginTop: "0.5rem",
						marginBottom: "0.5rem",
					}}
				/>
			) : (
				<></>
			)}
			<div>
				<h4>
					#{rank} - {name}
				</h4>
				<p>${money}</p>
				<p>
					WL: {wins}/{wins + losses} -{" "}
					{isNaN(WLRatio) ? "???" : (WLRatio * 100).toFixed(2)}%
				</p>
				<div>
					<button
						onClick={() => {
							const json = data.players.filter((p) => p.name == name)[0];
							json.wins += 1;
							json.money += data.money.win * (data.money.multipler * json.rank);
							saveDb(data);
						}}
					>
						Win
					</button>
					<button
						onClick={() => {
							const json = data.players.filter((p) => p.name == name)[0];
							json.losses += 1;
							json.money += data.money.loss * (data.money.multipler * json.rank);
							saveDb(data);
						}}
					>
						Loss
					</button>
					{rank == 1 ? (
						<></>
					) : (
						<button
							onClick={() => {
								if (rank == 1) return;
								const json = data.players.filter((p) => p.name == name)[0];
								const above = data.players.filter((p) => p.rank == rank - 1)[0];

								above.rank += 1;
								json.rank -= 1;

								saveDb(data);
							}}
						>
							Rank up
						</button>
					)}
					{rank == data.players.length ? (
						<></>
					) : (
						<button
							onClick={() => {
								if (rank == data.players.length) return;
								const json = data.players.filter((p) => p.name == name)[0];
								const above = data.players.filter((p) => p.rank == rank + 1)[0];

								above.rank -= 1;
								json.rank += 1;

								saveDb(data);
							}}
						>
							Rank Down
						</button>
					)}
				</div>
			</div>
		</>
	);
}
