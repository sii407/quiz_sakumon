document.addEventListener('DOMContentLoaded', () => {
    const btnView = document.getElementById('btn-view');
    const btnSolve = document.getElementById('btn-solve');
    const quizList = document.getElementById('quiz-list');
    const rowArea = document.querySelector('.row');

    async function loadQuizData() {
        try {
            const response = await fetch('quiz-data.json');
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

        } catch (error) {
            console.error(error);
            quizList.innerHTML = '<p style="color:red; text-align:center;">クイズデータの読み込み中にエラーが発生しました。</p>';
        }
    }

    function setupAnswerClickEvents() {
        const answerBoxes = document.querySelectorAll('.answer-box');
        answerBoxes.forEach(box => {
            box.addEventListener('click', () => {
                if (quizList.classList.contains('solve-mode')) {
                    box.classList.toggle('open');
                }
            });
        });
    }

    btnView.addEventListener('click', () => {
        btnView.classList.add('active');
        btnSolve.classList.remove('active');
        
        quizList.classList.remove('solve-mode');
        quizList.classList.add('view-mode');

        quizList.style.display = 'none';
        rowArea.style.display = 'flex';
        
        const answerBoxes = document.querySelectorAll('.answer-box');
        answerBoxes.forEach(box => box.classList.remove('open'));
    });

    btnSolve.addEventListener('click', () => {
        btnSolve.classList.add('active');
        btnView.classList.remove('active');
        
        quizList.classList.remove('view-mode');
        quizList.classList.add('solve-mode');

        quizList.style.display = 'flex';
        rowArea.style.display = 'none';
    });

    quizList.style.display = 'none';
    rowArea.style.display = 'flex';

    loadQuizData();
});