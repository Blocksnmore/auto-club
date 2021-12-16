export interface jsonData {
	players: playerData[];
	money: {
		win: number;
		loss: number;
		multiplier: number;
	};
}

export interface playerData {
	rank: number;
	money: number;
	wins: number;
	losses: number;
	name: string;
}
