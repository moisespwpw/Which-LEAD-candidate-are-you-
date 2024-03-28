// Sample questions data
const questions = [
    {
        text: "I prefer to socialize with a large group of people.",
        options: ["Agree", "Slightly agree", "Slightly disagree", "Disagree"],
        dichotomy: "E/I" // Extroversion/Introversion
    },
    {
        text: "I enjoy spending time alone with my thoughts.",
        options: ["Agree", "Slightly agree", "Slightly disagree", "Disagree"],
        dichotomy: "E/I" // Extroversion/Introversion
    },
    {
        text: "I tend to focus on details rather than the big picture.",
        options: ["Agree", "Slightly agree", "Slightly disagree", "Disagree"],
        dichotomy: "S/N" // Sensing/Intuition
    },
    {
        text: "I make decisions based on logic rather than emotions.",
        options: ["Agree", "Slightly agree", "Slightly disagree", "Disagree"],
        dichotomy: "T/F" // Thinking/Feeling
    },
    {
        text: "I prefer to have a planned schedule rather than being spontaneous.",
        options: ["Agree", "Slightly agree", "Slightly disagree", "Disagree"],
        dichotomy: "J/P" // Judging/Perceiving
    }
];

let currentQuestionIndex = 0;

// Function to render current question
function renderQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';
    
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        
        const questionText = document.createElement('h2');
        questionText.textContent = currentQuestion.text;
        questionElement.appendChild(questionText);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        
        currentQuestion.options.forEach((option, index) => {
            const label = document.createElement('label');
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'question' + currentQuestionIndex;
            input.value = index;
            
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            
            optionsDiv.appendChild(label);
        });
        
        questionElement.appendChild(optionsDiv);
        questionContainer.appendChild(questionElement);
    }
}

// Function to render submit button
function renderSubmitButton() {
    const submitButton = document.getElementById('submit-btn');
    if (currentQuestionIndex === questions.length - 1) {
        submitButton.style.display = 'inline-block';
    } else {
        submitButton.style.display = 'none';
    }
}

// Function to move to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        renderSubmitButton(); // Render submit button
    }
}

// Function to move to the previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        renderSubmitButton(); // Render submit button
    }
}

// Function to submit the test
function submitTest() {
    try {
        // Calculate MBTI result
        const result = calculateMBTIResult();
        console.log('MBTI Result:', result); // Debugging statement
        
        // Display the result
        displayMBTIResult(result);

        // Disable the submit button after submission
        const submitButton = document.getElementById('submit-btn');
        submitButton.disabled = true;
    } catch (error) {
        console.error('Error submitting test:', error);
        // Optionally, you can provide feedback to the user about the error.
    }
}

// Function to calculate MBTI result
function calculateMBTIResult() {
    let result = '';

    // Calculate scores for each dichotomy
    const scores = {
        'E/I': 0,
        'S/N': 0,
        'T/F': 0,
        'J/P': 0
    };

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) { // Check if an option is selected
            const selectedValue = parseInt(selectedOption.value);
            switch (selectedValue) {
                case 0: // Agree
                    scores[question.dichotomy] += 2; // Assigning a weight of 2 for "Agree"
                    break;
                case 1: // Slightly agree
                    scores[question.dichotomy] += 1; // Assigning a weight of 1 for "Slightly agree"
                    break;
                case 2: // Slightly disagree
                    scores[question.dichotomy] -= 1; // Assigning a weight of -1 for "Slightly disagree"
                    break;
                case 3: // Disagree
                    scores[question.dichotomy] -= 2; // Assigning a weight of -2 for "Disagree"
                    break;
                default:
                    break;
            }
        }
    });

    // Determine MBTI type based on scores
    if (scores['E/I'] >= 0) result += 'E'; // More extraverted
    else result += 'I'; // More introverted

    if (scores['S/N'] >= 0) result += 'N'; // More intuitive
    else result += 'S'; // More sensing

    if (scores['T/F'] >= 0) result += 'F'; // More feeling
    else result += 'T'; // More thinking

    if (scores['J/P'] >= 0) result += 'P'; // More perceiving
    else result += 'J'; // More judging

    return result;
}


// Function to display MBTI result
function displayMBTIResult(result) {
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const resultImage = document.getElementById('result-image');

    // Define personality images and names with relative paths
    const personalityData = {
        'ENFJ': { name: 'May Dorico', image: 'images/president.jpg' },
        'ENFP': { name: 'Charles Sanchez', image: 'images/391704297_3001693116628723_3058199121136542060_n.jpg' },
        'ENTJ': { name: 'Elizvet Ato', image: 'images/353857061_9369601596443728_8945060651477578842_n.jpg' },
        'ENTP': { name: 'James Apit', image: 'images/288886370_179462924523363_1417306929075472450_n.jpg' },
        'ESFJ': { name: 'Kaye Bebanco', image: 'images/381468424_1363909447838233_4151381469487067753_n.jpg' },
        'ESFP': { name: 'Kael Torralba', image: 'images/349138106_779733770421980_6918836794942887867_n.jpg' },
        'ESTJ': { name: 'Hugh De Luna', image: 'images/409812091_6780866172010779_3921402763997092665_n.jpg' },
        'ESTP': { name: 'Olivia Wilson', image: 'images/path/to/estp_image.jpg' }, // Update with correct relative path
        'INFJ': { name: 'Daniel Thompson', image: 'images/path/to/infj_image.jpg' }, // Update with correct relative path
        'INFP': { name: 'Emma Davis', image: 'images/path/to/infp_image.jpg' }, // Update with correct relative path
        'INTJ': { name: 'Alexander Rodriguez', image: 'images/path/to/intj_image.jpg' }, // Update with correct relative path
        'INTP': { name: 'Ava Taylor', image: 'images/path/to/intp_image.jpg' }, // Update with correct relative path
        'ISFJ': { name: 'William Hernandez', image: 'images/path/to/isfj_image.jpg' }, // Update with correct relative path
        'ISFP': { name: 'Ella Martinez', image: 'images/path/to/isfp_image.jpg' }, // Update with correct relative path
        'ISTJ': { name: 'James Wilson', image: 'images/path/to/istj_image.jpg' }, // Update with correct relative path
        'ISTP': { name: 'Sophia Lee', image: 'images/path/to/istp_image.jpg' } // Update with correct relative path
    };

    // Get the corresponding data for the result
    const resultData = personalityData[result];

    if (resultData) {
        // Update result text
        resultText.textContent = `Your LEAD candidate is: ${resultData.name}`;

        // Update result image with relative path
        resultImage.src = resultData.image;

        // Show the result container
        resultContainer.style.display = 'block';
    } else {
        // Default message if result is not found
        resultText.textContent = `Your LEAD candidate is: Unknown`;
        // Update result image with default relative path
        resultImage.src = 'images/default_image.jpg';
        resultContainer.style.display = 'block';
    }
}

// Function to initialize the test
function initTest() {
    renderQuestion(); // Render the first question
    renderSubmitButton(); // Render submit button
    
    // Add event listener to the submit button
    const submitButton = document.getElementById('submit-btn');
    submitButton.addEventListener('click', submitTest);
}
// Initialize the test
initTest();