<script lang="ts">
	let playerScore = 0;
	let computerScore = 0;

	type Round = {
		playerChoice: Weapon;
		computerChoice: Weapon;
		result: 'You win' | 'You lose' | 'Tie';
	};

	const MAX_LOSING_ROUNDS_BEFORE_STRATEGY_CHANGE = 3;

	let rounds: Round[] = [];
	$: round = rounds.length + 1;

	const strategies = [
		() => {
			console.log('Function 1');
		},
		() => {
			console.log('Function 2');
		},
		() => {
			console.log('Function 3');
		}
	];

	let previousStrategyIndex = -1;
	let currentStrategyIndex = -1;

	let strategy: '1' | '2' | '3' = '1';

	const winningCombinations: Record<string, string[]> = {
		rock: ['scissors', 'lizard'],
		paper: ['rock', 'spock'],
		scissors: ['paper', 'lizard'],
		lizard: ['paper', 'spock'],
		spock: ['rock', 'scissors']
	};

	type Weapon = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
	const weapons: Weapon[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
	let playerChoice: Weapon;
	let computerChoice: Weapon;

	const computerPlay = () => {
		// First round, go random
		if (rounds.length === 0) {
			return weapons[Math.floor(Math.random() * weapons.length)];
		}

		if (rounds.length > MAX_LOSING_ROUNDS_BEFORE_STRATEGY_CHANGE) {
			// get random strategy excluding the one already selected
			const availableStrategies = strategies.filter((s) => s !== strategy);

			// select a random strategy
			function selectRandomStrategy() {
				previousStrategyIndex = currentStrategyIndex;
				while (currentStrategyIndex === previousStrategyIndex) {
					currentStrategyIndex = Math.floor(Math.random() * strategies.length);
				}
				const selectedStrategy = strategies[currentStrategyIndex];
				selectedStrategy();
			}

			// Step 3: Use a condition to trigger the function selection
			function checkCondition() {
				// Example condition: select a new function when a random number is greater than 0.5
				const randomNumber = Math.random();
				if (randomNumber > 0.5) {
					selectRandomStrategy();
				}
			}
		}
	};

	const playRound = (playerChoice: Weapon, computerSelection: Weapon) => {
		if (playerChoice === computerSelection) {
			return 'Tie';
		} else if (winningCombinations[playerChoice]?.includes(computerSelection)) {
			return 'You win';
		} else {
			return 'You lose';
		}
	};

	const updateRound = () => {
		round++;
	};

	const resetGame = () => {
		playerScore = 0;
		computerScore = 0;
		round = 0;
		rounds = [];
	};

	const playGame = (playerChoice: Weapon) => {
		computerChoice = computerPlay();
		const result = playRound(playerChoice, computerChoice);
		rounds.push({ playerChoice, computerChoice, result });
		// updateScore(result);
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
