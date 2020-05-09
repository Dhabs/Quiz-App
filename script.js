const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let scoreCounter;
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
         if (answer.correct) {
             button.dataset.correct = answer.correct
         }
         button.addEventListener('click', selectAnswer) 
         answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
} 

function setStatusClass(element, correct) {
    scoreCounter = 0
    clearStatusClass(element)
    
    if (correct) {
        element.classList.add('correct')
            scoreCounter++
            document.getElementById('score-counter').textContent = `Score: ${scoreCounter}`
            console.log ('score-counter; ' + scoreCounter)

    }   else {
        element.classList.add('wrong') 
        scoreCounter = 0 
        document.getElementById('score-counter').textContent = `Score: ${scoreCounter}`

        console.log('scorecounterwrong; ' + scoreCounter)
            
        }
        
    
}



function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 5 * 3',
        answers: [
            { text: '8', correct: false},
            { text: '22', correct: false},
            { text: '15', correct: true},
            { text: '14', correct: false}
        ]      
    },
    {
        question: 'What is the capital of Bauchi?',
        answers: [
            { text: 'Yola', correct: false},
            { text: 'Bauchi', correct: true},
            { text: 'Kaduna', correct: false},
            { text: 'Unknown', correct: false}
        ]      
    },
    {
        question: 'How many legs does a spider have?',
        answers: [
            { text: '4', correct: false},
            { text: '5', correct: false},
            { text: '6', correct: false},
            { text: '8', correct: true}
        ]      
    },
    {
        question: 'Is coding stressful?',
        answers: [
            { text: 'Yes', correct: true},
            { text: 'Maybe', correct: false},
            { text: 'No', correct: false},
            { text: 'I do not know', correct: false}
        ]      
    },
    {
        question: 'Will startng tutors make Heaven?',
        answers: [
            { text: 'No', correct: false},
            { text: 'Yes', correct: false},
            { text: 'IDK', correct: true},
            { text: 'Maybe', correct: false}
        ]      
    }
]