const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choices: ['<script>', '<css>', '<style>', '<span>'],
        answer: 2,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choices: ['text-color', 'font-color', 'text-style', 'color'],
        answer: 3,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choices: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
        answer: 1,
    },
];

let currentQuestionIndex = 0;
let score = 0;
let choiceSelected = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);

window.onload = function () {
    displayQuestion();
    updateHUD();
};

function displayQuestion() {
    choiceSelected = false;
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    question.choices.forEach((choice, index) => {
        document.getElementById(`c${index}`).innerText = choice;
        document.getElementById(index.toString()).style.backgroundColor = "";
    });
    updateHUD();
}

function updateHUD() {
    document.getElementById('question-number').innerText = `Question: ${currentQuestionIndex + 1} / ${questions.length}`;
    document.getElementById('scoreCount').innerText = score;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressBarFull').style.width = `${progress}%`;
}

document.querySelectorAll('.choice').forEach(choiceElement => {
    choiceElement.addEventListener('click', function () {
        if (choiceSelected) return;
        choiceSelected = true;
        const selectedChoice = parseInt(choiceElement.id);
        const isCorrect = selectedChoice === questions[currentQuestionIndex].answer;
        choiceElement.style.backgroundColor = isCorrect ? 'green' : 'red';

        if (isCorrect) {
            score += 10;
        } else {
            const correctChoiceElement = document.getElementById(questions[currentQuestionIndex].answer.toString());
            correctChoiceElement.style.backgroundColor = 'green';
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            } else {
                displayEndScreen();
            }
        }, 1000);
    });
});

function displayEndScreen() {
    document.getElementById('question').style.display = 'none';
    document.querySelector('.choices').style.display = 'none';
    document.getElementById('hud').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('final-score').innerText = `Your score: ${score}`;
}

document.getElementById('restart-button').addEventListener('click', function () {
    location.reload();
});

document.getElementById('home-button').addEventListener('click', function () {
    window.location.href = 'index.html';
});
