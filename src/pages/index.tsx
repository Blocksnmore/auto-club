import "./style.css";

import type { jsonData } from "../types/types";
import Player from "../components/player";

const stock: jsonData = {
	players: [],
	money: {
		win: 5000,
		loss: 1500,
		multipler: 1,
	},
};
const [playerData, setPlayerdata] = WJS.useState<jsonData>(
	localStorage.getItem("db") != undefined
		? JSON.parse(localStorage.getItem("db")!)
		: stock
);

export default function App() {
	let data = playerData();

	const saveDb = () => {
		const sortedJson = {
			...data,
			players: data.players.sort((a, b) => a.rank - b.rank),
		};
		localStorage.setItem("db", JSON.stringify(sortedJson));
		setPlayerdata(sortedJson);
	};

	return (
		<>
			<h1>This crappy webapp will assist in tracking player money</h1>
			<form
				onSubmit={(e: Event) => {
					e.preventDefault();
					data = JSON.parse(
						(document.getElementById("json") as HTMLInputElement).value
					) as jsonData;

					data.money = {
						win: (document.getElementById("winmoney") as HTMLInputElement)
							.value as unknown as number,
						loss: (document.getElementById("lossmoney") as HTMLInputElement)
							.value as unknown as number,
						multipler: (
							document.getElementById("multipler") as HTMLInputElement
						).value as unknown as number,
					};

					saveDb();
				}}
			>
				<label>Database </label>
				<input id="json" type="text" value={JSON.stringify(data)} required />
				<br />
				<label>Multipler </label>
				<input
					type="number"
					id="multipler"
					value={data.money.multipler}
					placeholder="Money Multipler"
					required
				/>
				<br />
				<label>Win Money (Grudge) </label>
				<input
					type="number"
					id="winmoney"
					value={data.money.win}
					placeholder="Win Money"
					required
				/>
				<br />
				<label>Loss Money (Grudge) </label>
				<input
					type="number"
					id="lossmoney"
					value={data.money.loss}
					placeholder="Loss Money"
					required
				/>
				<br />
				<button type="submit">Set JSON</button>
				<button
					onClick={async () => {
						data = JSON.parse(JSON.stringify(stock));
						saveDb();
					}}
				>
					Reset DB
				</button>
			</form>
			<div>
				<h2>Users</h2>
				<h2>Multipler: {data.money.multipler}</h2>
				<h2>
					Money - Win: {data.money.win} Loss: {data.money.loss}
				</h2>

				<form
					onSubmit={(e: Event) => {
						e.preventDefault();
						const name = (document.getElementById("name") as HTMLInputElement)
							.value;
						data.players.push({
							name,
							rank: data.players.length + 1,
							money: 0,
							wins: 0,
							losses: 0,
						});
						saveDb();
					}}
				>
					<h2>Add a user</h2>
					<input id="name" type="text" placeholder="Name" required />
					<br />
					<button type="submit">Add</button>
				</form>

				<hr
					style={{
						width: "99vw",
						marginTop: "0.5rem",
						marginBottom: "0.5rem",
					}}
				/>

				{data.players.length > 0 ? (
					<></>
				) : (
					<>
						<h2>Add players to start tracking!</h2>
					</>
				)}
				{data.players.map((player, i) => (
					<Player
						data={data}
						player={player}
						i={i}
						saveDb={(d: jsonData) => {
							data = d;
							saveDb();
						}}
					/>
				))}
			</div>
		</>
	);
}
