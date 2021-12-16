export const calculateMoney = (
	amount: number,
	rank: number,
	multiplier: number
): number => {
	return amount + amount * rank * multiplier;
};
