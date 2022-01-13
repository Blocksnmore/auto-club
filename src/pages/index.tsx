import "./style.css";

import type { jsonData } from "../types/types";
import Player from "../components/player";

const stock: jsonData = {
	players: [],
	money: {
		win: 5000,
		loss: 1500,
		multiplier: 0,
	},
};

export default function App() {
	let [data, setPlayerdata] = WJS.useState<jsonData>(
		localStorage.getItem("db") != undefined
			? JSON.parse(localStorage.getItem("db")!)
			: stock
	);

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

					saveDb();
				}}
			>
				<label for="json">Database </label>
				<input id="json" type="text" value={JSON.stringify(data)} required />
				<br />
				<label for="multiplier">Multiplier </label>
				<input
					type="number"
					id="multiplier"
					value={data.money.multiplier}
					placeholder="Money Multiplier"
					step="any"
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
					onClick={() => {
						data.money = {
							win: parseInt(
								(document.getElementById("winmoney") as HTMLInputElement).value
							),
							loss: parseInt(
								(document.getElementById("lossmoney") as HTMLInputElement).value
							),
							multiplier: parseInt(
								(document.getElementById("multiplier") as HTMLInputElement)
									.value
							),
						};
						saveDb();
					}}
				>
					Save
				</button>
				<button
					onClick={() => {
						data = JSON.parse(JSON.stringify(stock));
						saveDb();
					}}
				>
					Reset DB
				</button>
			</form>
			<div>
				<h2>Money Values:</h2>
				<h3>
					Win: {data.money.win}
					<br />
					Loss: {data.money.loss}
					<br />
					Multiplier: {data.money.multiplier}
				</h3>

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
					<h3>Add User</h3>
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

				<h2>Users</h2>

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
