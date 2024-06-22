'use strict';

{
  let timeLimit = 0;
  let timeRemain = timeLimit;
  let timerInterval;
  let mistakeCount = 0;
  let eachMistakeCount = 0;

  function startTimer() {
    const timerEL = document.getElementById('remain-time');
    timerEL.textContent = `残り時間：${timeRemain}秒`;

    timerInterval = setInterval(() => {
      timeRemain--;
      timerEL.textContent = `残り時間：${timeRemain}秒`;

      if (timeRemain <= 0) {
        const reset = document.getElementById('reset');
        reset.textContent = 'Restart';
        reset.style.display = 'block';
        reset.addEventListener('click', () => {
          resetGame();
        });
        clearInterval(timerInterval);
        alert("時間切れです！！");
      }
    }, 1000);
  }

  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    target.style.visibility = 'visible';
    loc = 0;
    eachMistakeCount = 0;
    mistakeDisplay.style.display = 'block';
    eachMistakeDisplay.textContent = `この単語の誤入力回数：${eachMistakeCount}`;
    nextCharHint.textContent = ''; // Clear next character hint
    nextCharHint.style.display = 'none';
  }

  function resetGame() {
    isPlaying = false;
    // words.splice(0, words.length);
    words.push('red', 'blue', 'pink', 'apple', 'banana', 'orange', 'elephant', 'giraffe', 'rhinoceros');
    words = [];
    // words = words.concat(wordLists[difficulty]);
    target.textContent = 'Click to start';
    loc = 0;
    startTime = null;
    result.textContent = '';
    easyBtn.style.display = 'inline-block';
  normalBtn.style.display = 'inline-block';
  hardBtn.style.display = 'inline-block';
  const reset = document.getElementById('reset');
  reset.style.display = 'none'
    mistakeCount = 0;
    mistakeDisplay.style.display = 'none';
    score = 0;
  }

  let words;
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  let score = 0;
  const target = document.getElementById('target');
  const easyBtn = document.getElementById('easyBtn');
  const normalBtn = document.getElementById('normalBtn');
  const hardBtn = document.getElementById('hardBtn');
  const result = document.getElementById('result');  //追加
  const mistakeDisplay = document.createElement('p'); //追加
  mistakeDisplay.id = 'mistakeCount'; //追加
  mistakeDisplay.style.display = 'none'; //追加
  document.body.appendChild(mistakeDisplay); //追加

  const eachMistakeDisplay = document.createElement('p');
  eachMistakeDisplay.id = 'eachMistakeCount';
  eachMistakeDisplay.style.display = 'none';
  document.body.appendChild(eachMistakeDisplay);

  const nextCharHint = document.createElement('div');
  nextCharHint.id = 'nextCharHint';
  nextCharHint.style.position = 'absolute';
  nextCharHint.style.top = '10px';
  nextCharHint.style.right = '10px';
  nextCharHint.style.fontSize = '12px';
  nextCharHint.style.color = 'red';
  nextCharHint.style.display = 'none';
  document.body.appendChild(nextCharHint);

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
        eachMistakeDisplay.textContent = `この単語の誤入力回数: ${eachMistakeCount}`;
        mistakeDisplay.style.display = 'block'; //追加
        eachMistakeDisplay.style.display = 'block';
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
    if (!isPlaying || !word) {
      return;
    }

    if (e.key !== word[loc]) { 
      mistakeCount++; 
      eachMistakeCount++;
      mistakeDisplay.textContent = `誤入力回数: ${mistakeCount}`; 
      eachMistakeDisplay.textContent = `この単語の誤入力回数: ${eachMistakeCount}`;
      if (eachMistakeCount > 9) {
        nextCharHint.textContent = ` ${word[loc]}`;
        nextCharHint.style.display = 'block';
      }
      return; 
    } 

    loc++;

    target.textContent = '_'.repeat(loc) + word.substring(loc);
    if (loc >= Math.floor(word.length / 2)) {
      target.style.visibility = 'hidden';
    }

    if (eachMistakeCount > 9) {
      nextCharHint.style.display = 'none';
    }
    if (loc === word.length) {
      score=score+10
      if (words.length === 0) {
        clearInterval(timerInterval);
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        result.textContent = `Finished! score ${score+timeRemain-mistakeCount}!`;
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