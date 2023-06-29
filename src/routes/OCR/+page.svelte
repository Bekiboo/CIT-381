<script lang="ts">
	import Tesseract from 'tesseract.js';

	let text = 'Loading...';
	let status: string;
	let progress: number;
	let isDone = false;

	const analyze = (e: Event) => {
		const target = e.target as HTMLInputElement;
		let file;
		if (target.files) {
			file = target.files[0];
		}
		Tesseract.recognize(file, 'eng', {
			logger: (m) => {
				status = m.status;
				progress = m.progress;
				console.log(m);
			}
		}).then(({ data: { text: recognizedText } }) => {
			console.log(recognizedText);
			text = recognizedText;
			status = 'Done';
			progress = 1;
			isDone = true;
		});
	};
</script>

<div class="progress-wrap progress">
	<div style:width={progress * 100 + '%'} class="progress-bar progress" />
	<p>{status}</p>
</div>

<div class="container">
	<h1>OCR</h1>
	<input type="file" on:change={(e) => analyze(e)} />
	<p>{text}</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.progress {
		width: 100%;
		height: 50px;
	}
	.progress-wrap {
		background: #ddd;
		margin: 20px 0;
		overflow: hidden;
		position: relative;
	}
	.progress-bar {
		background: #f80;
		left: 0;
		position: absolute;
		top: 0;
		transition: all 0.3s ease-in-out;
		z-index: 90;
	}
	.progress-wrap p {
		position: absolute;
		display: inline-block;
		width: 100%;
		text-align: center;
		z-index: 100;
		text-transform: uppercase;
		font-weight: bold;
		font-family: sans-serif;
	}
</style>
