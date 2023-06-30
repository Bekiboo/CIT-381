<script lang="ts">
	// rock paper scissors game
	let playerScore = 0;
	let computerScore = 0;
	let round = 0;
	let winner = '';
	let playerChoice = '';
	let computerChoice = '';

	const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

	const computerPlay = () => {
		return choices[Math.floor(Math.random() * choices.length)];
	};

	const playRound = (playerSelection: string, computerSelection: string) => {
		if (playerSelection === computerSelection) {
			return 'Tie';
		} else if (
			(playerSelection === 'rock' && computerSelection === 'scissors') ||
			(playerSelection === 'rock' && computerSelection === 'lizard') ||
			(playerSelection === 'paper' && computerSelection === 'rock') ||
			(playerSelection === 'paper' && computerSelection === 'spock') ||
			(playerSelection === 'scissors' && computerSelection === 'paper') ||
			(playerSelection === 'scissors' && computerSelection === 'lizard') ||
			(playerSelection === 'lizard' && computerSelection === 'paper') ||
			(playerSelection === 'lizard' && computerSelection === 'spock') ||
			(playerSelection === 'spock' && computerSelection === 'rock') ||
			(playerSelection === 'spock' && computerSelection === 'scissors')
		) {
			return 'You win';
		} else {
			return 'You lose';
		}
	};

	const updateScore = (result: string) => {
		if (result === 'You win') {
			playerScore++;
		} else if (result === 'You lose') {
			computerScore++;
		}
	};

	const updateRound = () => {
		round++;
	};

	const updateWinner = () => {
		if (playerScore === 5) {
			winner = 'You win the game!';
		} else if (computerScore === 5) {
			winner = 'You lose the game!';
		}
	};

	const resetGame = () => {
		playerScore = 0;
		computerScore = 0;
		round = 0;
		winner = '';
	};

	const playGame = (playerSelection: string) => {
		playerChoice = playerSelection;
		computerChoice = computerPlay();
		const result = playRound(playerChoice, computerChoice);
		updateScore(result);
		updateRound();
		updateWinner();
	};
</script>

<div class="container">
	<h1>Rock Paper Scissors Lizard Spock</h1>
	<h2>Round {round}</h2>
	<h2>{winner}</h2>
	<div class="score">
		<h3>Player: {playerScore}</h3>
		<h3>Computer: {computerScore}</h3>
	</div>
	<div class="choices">
		<button on:click={() => playGame('rock')}>Rock</button>
		<button on:click={() => playGame('paper')}>Paper</button>
		<button on:click={() => playGame('scissors')}>Scissors</button>
		<button on:click={() => playGame('lizard')}>Lizard</button>
		<button on:click={() => playGame('spock')}>Spock</button>
	</div>
	<div class="results">
		<h3>Player: {playerChoice}</h3>
		<h3>Computer: {computerChoice}</h3>
	</div>
	<button on:click={() => resetGame()}>Reset</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.score {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.choices {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
