export type Weapon = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock'
export const weapons: Weapon[] = ['rock', 'paper', 'scissors', 'lizard', 'spock']

const randomStrategy = () => {
	return weapons[Math.floor(Math.random() * weapons.length)]
}

const winStayLoseShiftStrategy = (rounds: any) => {
	const lastRound = rounds[rounds.length - 1]
	if (lastRound.result === 'Player wins') {
		return lastRound.player1Weapon
	} else if (lastRound.winner === 'player2') {
		return weapons[(weapons.indexOf(lastRound.player2Weapon) + 1) % weapons.length]
	} else {
		return weapons[(weapons.indexOf(lastRound.player1Weapon) + 1) % weapons.length]
	}
}

const paperStrategy = (rounds: any) => {
	return weapons[1]
}

const scissorsStrategy = (rounds: any) => {
	return weapons[2]
}

const lizardStrategy = (rounds: any) => {
	return weapons[3]
}

const spockStrategy = (rounds: any) => {
	return weapons[4]
}

export const strategies = [
	randomStrategy,
	winStayLoseShiftStrategy,
	paperStrategy,
	scissorsStrategy,
	lizardStrategy,
	spockStrategy
]
