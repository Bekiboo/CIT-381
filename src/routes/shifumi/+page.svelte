<script lang="ts">
	let playerScore = 0;
	let computerScore = 0;

	type Round = {
		playerChoice: Weapon;
		computerChoice: Weapon;
		result: Result;
	};

	type Result = 'You win' | 'You lose' | 'Tie';
	let result: Result;

	const MAX_LOSING_ROUNDS_BEFORE_STRATEGY_CHANGE = 3;
	let turnsSinceLastComputerWin = 0;

	let rounds: Round[] = [];
	$: round = rounds.length + 1;

	const strategies = [
		() => {
			return weapons[0];
		},
		() => {
			return weapons[1];
		},
		() => {
			return weapons[2];
		},
		() => {
			return weapons[3];
		},
		() => {
			return weapons[4];
		}
	];

	let currentStrategyIndex = -1;

	const winningCombinations: Record<string, string[]> = {
		rock: ['scissors', 'lizard'],
		paper: ['rock', 'spock'],
		scissors: ['paper', 'lizard'],
		lizard: ['paper', 'spock'],
		spock: ['rock', 'scissors']
	};

	type Weapon = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
	const weapons: Weapon[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
	let computerChoice: Weapon;

	const computerPlay = () => {
		// First round, go random
		if (rounds.length === 0) {
			return weapons[Math.floor(Math.random() * weapons.length)];
		}

		if (turnsSinceLastComputerWin >= MAX_LOSING_ROUNDS_BEFORE_STRATEGY_CHANGE) {
			// get random strategy excluding the one already selected
			function selectRandomStrategy() {
				const randomStrategyIndex = Math.floor(Math.random() * strategies.length);
				if (randomStrategyIndex === currentStrategyIndex) {
					return selectRandomStrategy();
				} else {
					return randomStrategyIndex;
				}
			}
		}

		// If we have a strategy, use it
		if (currentStrategyIndex !== -1) {
			return strategies[currentStrategyIndex]();
		} else {
			// Otherwise, go random
			return weapons[Math.floor(Math.random() * weapons.length)];
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

	const resetGame = () => {
		playerScore = 0;
		computerScore = 0;
		round = 0;
		rounds = [];
	};

	const updateScore = (result: Result) => {
		if (result === 'You win') {
			playerScore++;
		} else if (result === 'You lose') {
			computerScore++;
		}
	};

	const playGame = (playerChoice: Weapon) => {
		computerChoice = computerPlay();
		result = playRound(playerChoice, computerChoice);
		rounds.push({ playerChoice, computerChoice, result });
		rounds = rounds;
		updateScore(result);
		if (result === 'You win') {
			turnsSinceLastComputerWin++;
		} else {
			turnsSinceLastComputerWin = 0;
		}
	};
</script>

<div class="bg-[#1D6EB0] h-screen text-white pt-24">
	{turnsSinceLastComputerWin}
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
		{#if rounds.length > 0}
			<div class="text-center">
				<h3>Player: {rounds[rounds.length - 1]?.playerChoice}</h3>
				<h3>Computer: {computerChoice}</h3>
				<h2 class="text-xl">{result}</h2>
			</div>
		{/if}
		<div class="score color-red-500">
			<h3 class="my-4">
				Player <span class="font-bold text-2xl px-4">{playerScore} - {computerScore}</span> Computer
			</h3>
		</div>
		<button class="bg-red-700 w-24 rounded-md font-bold" on:click={() => resetGame()}>Reset</button>
	</div>
</div>
