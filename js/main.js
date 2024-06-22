'use strict';

{
  let timeLimit = 0;
  let timeRemain = timeLimit;
  let timerInterval;
  let mistakeCount = 0; //追加

  function startTimer() {
    const timerEL = document.getElementById('remain-time');
    timerEL.textContent = `残り時間：${timeRemain}秒`;

    timerInterval = setInterval(() => {
      timeRemain--;
      timerEL.textContent = `残り時間：${timeRemain}秒`;

      if (timeRemain <= 0) {
        clearInterval(timerInterval);
        alert("時間切れです！！");
      }
    }, 1000);
  }

  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }

  function resetGame() {
    isPlaying = false;
    words.splice(0, words.length);
    words.push('red', 'blue', 'pink');
    target.textContent = 'Click to start';
    loc = 0;
    startTime = null;
    const result = document.getElementById('result');
    result.textContent = '';
    reset.style.display = 'none';
  }

  let words;
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const target = document.getElementById('target');
  const easyBtn = document.getElementById('easyBtn');
  const normalBtn = document.getElementById('normalBtn');
  const hardBtn = document.getElementById('hardBtn');
  const result = document.getElementById('result');  //追加
  const mistakeDisplay = document.createElement('p'); //追加
  mistakeDisplay.id = 'mistakeCount'; //追加
  mistakeDisplay.style.display = 'none'; //追加
  document.body.appendChild(mistakeDisplay); //追加

  const wordLists = {
    easy: ['red', 'blue', 'pink'],
    normal: ['apple', 'banana', 'orange'],
    hard: ['elephant', 'giraffe', 'rhinoceros']
  };

  function selectDifficulty(difficulty) {
    if (difficulty === 'easy') {
      timeLimit = 15;
    } else if (difficulty === 'normal') {
      timeLimit = 25;
    } else if (difficulty === 'hard') {
      timeLimit = 30;
    }

    timeRemain = timeLimit;
    words = wordLists[difficulty];
    mistakeCount = 0;  //追加
    mistakeDisplay.style.display = 'none'; //追加
    startGame();
  }

  function startGame() {
    easyBtn.style.display = 'none';
    normalBtn.style.display = 'none';
    hardBtn.style.display = 'none';
    result.textContent = '';  //追加

    if (isPlaying === true) {
      return;
    }

    isPlaying = true;
    let count = 3;
    const countDown = setInterval(() => {
      if (count > 0) {
        target.textContent = count;
        count--;
      } else {
        clearInterval(countDown);
        startTime = Date.now();
        setWord();
        startTimer();
        mistakeDisplay.textContent = `誤入力回数: ${mistakeCount}`; //追加
        mistakeDisplay.style.display = 'block'; //追加
      }
    }, 1000);
  }

  document.getElementById('easyBtn').addEventListener('click', () => {
    selectDifficulty('easy');
  });

  document.getElementById('normalBtn').addEventListener('click', () => {
    selectDifficulty('normal');
  });

  document.getElementById('hardBtn').addEventListener('click', () => {
    selectDifficulty('hard');
  });

  document.addEventListener('keydown', e => {
    if (!isPlaying) {
      return;
    }

    if (e.key !== word[loc]) { //追加
      mistakeCount++; //追加
      mistakeDisplay.textContent = `誤入力回数: ${mistakeCount}`; //追加
      return; //追加
    } //追加

    loc++;

    target.textContent = '_'.repeat(loc) + word.substring(loc);

    if (loc === word.length) {
      if (words.length === 0) {
        clearInterval(timerInterval);
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        isPlaying = false;
        const reset = document.getElementById('reset');
        reset.textContent = 'Restart';
        reset.style.display = 'block';
        reset.addEventListener('click', () => {
          resetGame();
        });
        return;
      }
      setWord();
    }
  });
}