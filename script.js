const questions = [
  {
    question: "What are the three main types of cloud computing models?",
    options: ["Public", "Private", "Hybrid", "All of the above"],
    answer: "All of the above",
    explanation: "Cloud computing models include public, private, and hybrid deployment models."
  },
  {
    question: "What is IaaS?",
    options: ["Software as a Service", "Infrastructure as a Service", "Platform as a Service", "None of the above"],
    answer: "Infrastructure as a Service",
    explanation: "IaaS provides virtualized computing resources over the internet, like virtual machines and storage."
  },
  {
    question: "What does Azure Active Directory do?",
    options: ["Identity management", "Access control", "Authentication", "All of the above"],
    answer: "All of the above",
    explanation: "Azure AD helps manage users and access to applications and resources."
  }
  // Add more questions as needed
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let incorrectAnswers = [];

function startTest() {
  const questionCount = parseInt(document.getElementById("question-count").value);
  selectedQuestions = shuffleArray(questions).slice(0, questionCount);
  currentQuestionIndex = 0;
  score = 0;
  incorrectAnswers = [];
  
  document.getElementById("question-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";
  document.getElementById("answer-sheet").style.display = "none";

  loadQuestion();
}

function loadQuestion() {
  const questionData = selectedQuestions[currentQuestionIndex];
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2>Question ${currentQuestionIndex + 1}: ${questionData.question}</h2>
    <div id="options">
      ${questionData.options.map((option, idx) => `<button class="option" onclick="checkAnswer('${option}')">${option}</button>`).join('')}
    </div>
  `;
}

function checkAnswer(selectedAnswer) {
  const questionData = selectedQuestions[currentQuestionIndex];
  const feedbackContainer = document.getElementById("feedback-container");

  if (selectedAnswer === questionData.answer) {
    score++;
    feedbackContainer.innerHTML = `<p class="correct">Correct! ${questionData.explanation}</p>`;
  } else {
    incorrectAnswers.push(currentQuestionIndex + 1);
    feedbackContainer.innerHTML = `<p class="incorrect">Incorrect! The correct answer is "${questionData.answer}". ${questionData.explanation}</p>`;
  }

  if (currentQuestionIndex < selectedQuestions.length - 1) {
    currentQuestionIndex++;
    setTimeout(loadQuestion, 1500);  // Load next question after 1.5 seconds
  } else {
    setTimeout(showResult, 1500);
  }
}

function showResult() {
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";
  const finalScore = Math.round((score / selectedQuestions.length) * 100);
  document.getElementById("final-score").innerText = `You scored ${finalScore}%`;
}

function showAnswerSheet() {
  const answerList = document.getElementById("answer-list");
  answerList.innerHTML = selectedQuestions.map((q, index) => `
    <p><strong>Q${index + 1}: ${q.question}</strong></p>
    <p>Your answer: ${q.options[incorrectAnswers.includes(index + 1) ? 0 : 1]}</p>
    <p>Correct answer: ${q.answer}</p>
  `).join('');
  document.getElementById("answer-sheet").style.display = "block";
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

document.getElementById("start-test").addEventListener("click", startTest);
document.getElementById("show-answers").addEventListener("click", showAnswerSheet);
document.getElementById("reset-test").addEventListener("click", () => window.location.reload());
