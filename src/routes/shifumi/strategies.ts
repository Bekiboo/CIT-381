export type Weapon = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock'
export const weapons: Weapon[] = ['rock', 'paper', 'scissors', 'lizard', 'spock']

export type Result = 'Player wins' | 'Computer wins' | 'Tie'

export type Round = {
	playerChoice: Weapon
	computerChoice: Weapon
	result: Result
}

const randomStrategy = () => {
	console.log('random')
	return weapons[Math.floor(Math.random() * weapons.length)]
}

const winStayLoseShiftStrategy = (rounds: Round[]) => {
	const lastRound = rounds[rounds.length - 1]
	if (lastRound.result === 'Player wins') {
		console.log('shift')
		return lastRound.playerChoice
	} else if (lastRound.result === 'Computer wins') {
		console.log('stay')
		return lastRound.computerChoice
	} else {
		console.log('random')
		return randomStrategy()
	}
}

const analyzePlayerMovesStrategy = (rounds: Round[]) => {
	const playerMoves = rounds.map((round) => round.playerChoice)

	// Count the occurrences of each player move
	const moveCounts: { [key in Weapon]: number } = playerMoves.reduce((counts, move) => {
		counts[move] = (counts[move] || 0) + 1
		return counts
	}, {} as { [key in Weapon]: number })

	// Find the most frequent player move
	let mostFrequentMove: Weapon | null = null
	let maxCount = 0
	for (const move in moveCounts) {
		if (moveCounts[move as Weapon] > maxCount) {
			mostFrequentMove = move as Weapon
			maxCount = moveCounts[move as Weapon]
		}
	}

	// Determine the computer's next move based on the most frequent player move
	let computerMove: Weapon
	switch (mostFrequentMove) {
		case 'rock':
			computerMove = Math.random() < 0.5 ? 'paper' : 'spock'
			break
		case 'paper':
			computerMove = Math.random() < 0.5 ? 'scissors' : 'lizard'
			break
		case 'scissors':
			computerMove = Math.random() < 0.5 ? 'rock' : 'spock'
			break
		case 'lizard':
			computerMove = Math.random() < 0.5 ? 'scissors' : 'rock'
			break
		case 'spock':
			computerMove = Math.random() < 0.5 ? 'lizard' : 'paper'
			break
		default:
			computerMove = randomStrategy()
	}
	console.log('analyze')

	return computerMove
}

export const strategies = [randomStrategy, winStayLoseShiftStrategy, analyzePlayerMovesStrategy]
