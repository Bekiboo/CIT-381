<script lang="ts">
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
	};
</script>

<div class="bg-[#1D6EB0] h-screen text-white">
	<h1 class="text-2xl font-bold uppercase text-center mb-8">Rock Paper Scissors Lizard Spock</h1>
	<div class="flex flex-col items-center">
		<h2 class="font-semibold text-xl">Choose your weapon</h2>
		<div class="relative">
			<img class="w-96" src="/rpsls.jpg" alt="Rock Paper Scissors Lizard Spock" />
			<button class="absolute w-24 h-24 top-4 left-36" on:click={() => playGame('rock')} />
			<button class="absolute w-24 h-24 top-28 right-8" on:click={() => playGame('paper')} />
			<button class="absolute w-24 h-24 bottom-8 right-16" on:click={() => playGame('scissors')} />
			<button class="absolute w-24 h-24 bottom-8 left-16" on:click={() => playGame('lizard')} />
			<button class="absolute w-24 h-24 top-28 left-8" on:click={() => playGame('spock')} />
		</div>
	</div>
	<div class="flex flex-col items-center">
		<h2>Round {round}</h2>
		<!-- <h2>{winner}</h2> -->
		<div class="score color-red-500">
			<h3>Player: {playerScore}</h3>
			<h3>Computer: {computerScore}</h3>
		</div>
		<div class="choices" />
		<div class="results">
			<h3>Player: {playerChoice}</h3>
			<h3>Computer: {computerChoice}</h3>
		</div>
		<button class="bg-red-700 w-24 rounded-md font-bold" on:click={() => resetGame()}>Reset</button>
	</div>
</div>
