'use strict';

{
  let timeLimit = 0;
  let timeRemain = timeLimit;
  let timerInterval;

  function startTimer(){
    const timerEL = document.getElementById('remain-time');
    timerEL.textContent = `残り時間：${timeRemain}秒`;

    timerInterval = setInterval(() => {
      timeRemain--;
      timerEL.textContent = `残り時間：${timeRemain}秒`;

      if (timeRemain <= 0){
        clearInterval(timerInterval);
        alert("時間切れです！！")
      }
    },1000);
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
    startGame(); 
  }

  function startGame() {
    easyBtn.style.display = 'none';
    normalBtn.style.display = 'none';
    hardBtn.style.display = 'none';

    if (isPlaying === true) {
      return;
    }
  
    isPlaying = true;
    let count = 3;
    const countDown = setInterval(() =>{
      if (count > 0){
        target.textContent = count;
        count--;
      }
      else
      {
        clearInterval(countDown);
        startTime = Date.now();
        setWord();
        startTimer();
      }
    },1000)
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
    if (e.key !== word[loc]) {
      return;
    }

    loc++;

    target.textContent = '_'.repeat(loc) + word.substring(loc);

    if (loc === word.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} seconds!`;
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