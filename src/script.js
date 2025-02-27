const questions = [
  {
    question: 'What vocaloid do I like the most?',
    answers: [
      { text: 'Hatsune Miku', correct: false },
      { text: 'Kagamine Len', correct: true },
      { text: 'Kaito', correct: false },
      { text: 'Megurine Luka', correct: false },
    ],
  },
  {
    question: 'Who is my favorite Sanrio character?',
    answers: [
      { text: 'Hello Kitty', correct: false },
      { text: 'Batz Maru', correct: false },
      { text: 'Twin Stars', correct: false },
      { text: 'Hangyodon', correct: true },
    ],
  },
  {
    question: 'Who is my favorite Utaite?',
    answers: [
      { text: 'Mafumafu', correct: true },
      { text: 'Soraru', correct: false },
      { text: 'Sou', correct: false },
      { text: 'Luz', correct: false },
    ],
  },
  {
    question: "What's my favorite color?",
    answers: [
      { text: 'Aqua', correct: true },
      { text: 'Purple', correct: false },
      { text: 'Yellow', correct: false },
      { text: 'Green', correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

startQuiz();
