document.addEventListener('DOMContentLoaded', () => {
    const btnView = document.getElementById('btn-view');
    const btnSolve = document.getElementById('btn-solve');
    const quizList = document.getElementById('quiz-list');
    const quizContainer = document.querySelector('.quiz-container');
    const quizSwitcher = document.getElementById('quiz-switcher');
    const tabButtons = document.querySelectorAll('.quiz-tab-btn');

    let currentMode = 'solve';

    async function loadQuizData(fileName) {
        try {
            const response = await fetch(fileName);
            if (!response.ok) {
                throw new Error('データの読み込みに失敗しました');
            }
            const quizData = await response.json();

            quizList.innerHTML = quizData.map(item => `
                <div class="quiz-item">
                    <p class="question">Q${item.id}. ${item.question}</p>
                    <div class="answer-box">
                        <span class="answer-label">答え：</span>
                        <span class="answer-text">${item.answer}</span>
                    </div>
                </div>
            `).join('');

            setupAnswerClickEvents();
            
            if (currentMode === 'solve') {
                quizList.style.display = 'flex';
            }

        } catch (error) {
            console.error(error);
            quizList.innerHTML = '<p style="color:red; text-align:center;">クイズデータの読み込み中にエラーが発生しました。</p>';
        }
    }

    function setupAnswerClickEvents() {
        const answerBoxes = document.querySelectorAll('.answer-box');
        answerBoxes.forEach(box => {
            box.addEventListener('click', () => {
                if (currentMode === 'solve') {
                    box.classList.toggle('open');
                }
            });
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const fileName = button.getAttribute('data-file');
            loadQuizData(fileName);
        });
    });

    btnView.addEventListener('click', () => {
        currentMode = 'view';
        btnView.classList.add('active');
        btnSolve.classList.remove('active');
        
        quizList.style.display = 'none';
        quizSwitcher.style.display = 'none';
        quizContainer.style.marginTop = '0px';
    });

    btnSolve.addEventListener('click', () => {
        currentMode = 'solve';
        btnSolve.classList.add('active');
        btnView.classList.remove('active');
        
        quizSwitcher.style.display = 'flex';
        quizContainer.style.marginTop = '60px';
        
        const activeTab = document.querySelector('.quiz-tab-btn.active');
        if (activeTab) {
            quizList.style.display = 'flex';
        } else {
            quizList.style.display = 'none';
        }
    });

    quizList.style.display = 'none';
    quizSwitcher.style.display = 'flex';
    quizContainer.style.marginTop = '60px';
});