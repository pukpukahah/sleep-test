document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const resultDiv = document.getElementById('result');
    let currentQuestion = 0;
    let score = 0;

const questions = [
        {
            question: "Как много вы спите?",
            answers: [
                {text: "Менее 5 часов", value: 3},
                {text: "5-6 часов", value: 2},
                {text: "7-8 часов", value: 0},
                {text: "Больше 8 часов", value: 1}
            ]
        },
        {
            question: "Насколько сильно вы переживаете из-за проблем со сном?",
            answers: [
                {text: "вообще не переживаю", value: 0},
                {text: "совсем немного", value: 1},
                {text: "очень сильно", value: 2}
            ]
        },
        {
            question: "Мучают ли вас разные мысли при засыпании?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Плохо спите в своей постели, но лучше в другом месте?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Уходит ли на засыпание полчаса или более?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Часто просыпаетесь раньше будильника?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Как часто просыпаетесь ночью?",
            answers: [
                {text: "Никогда", value: 0},
                {text: "1-2 раза", value: 1},
                {text: "3 и более раз", value: 2}
            ]
        },
        {
            question: "Чувствуете ли себя отдохнувшим после сна?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Как часто спите днём?",
            answers: [
                {text: "Никогда", value: 0},
                {text: "Иногда", value: 1},
                {text: "Регулярно", value: 2}
            ]
        },
        {
            question: "Потребляете напитки с кофеином?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Ограничиваете электронные устройства перед сном?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Регулярно занимаетесь спортом?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Закрываете шторы перед сном?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Реагируете на посторонний шум во время сна?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Соблюдаете режим сна?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Во сколько обычно ложитесь спать?",
            answers: [
                {text: "7 вечера", value: 0},
                {text: "8-9 вечера", value: 0},
                {text: "10-12 вечера", value: 1},
                {text: "позже 12", value: 2}
            ]
        },
        {
            question: "Лучше спите на выходных?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Реагируете на уровень света во время сна?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Проветриваете спальню перед сном?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Спите с открытым окном?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        }
    ];

     const recommendations = [
        {min: 0, max: 8, text: "Отличное качество сна! Ваши привычки сна близки к идеальным."},
        {min: 9, max: 15, text: "Умеренные проблемы. Рекомендации: соблюдайте режим сна, уменьшите потребление кофеина."},
        {min: 16, max: 25, text: "Заметные нарушения сна. Стоит обратиться к специалисту и пересмотреть привычки."},
        {min: 26, max: 35, text: "Тяжелые нарушения сна. Необходима консультация сомнолога и коррекция образа жизни."}
    ];

    // Функция для отображения текущего вопроса
    function showQuestion() {
        const question = questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <h3>${currentQuestion + 1}. ${question.question}</h3>
                ${question.answers.map(answer => `
                    <button class="answer-btn" data-value="${answer.value}">${answer.text}</button>
                `).join('')}
            </div>
        `;
        updateProgress();
    }

    // Функция для обновления прогресс-бара
    function updateProgress() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
    }

    // Функция для отображения результата
    function showResult() {
        const recommendation = recommendations.find(r => score >= r.min && score <= r.max);
        resultDiv.innerHTML = `
            <div class="recommendation">
                <h3>Результаты теста</h3>
                <p>Ваш балл: ${score}</p>
                <p>${recommendation.text}</p>
                <button id="restart-btn" class="restart-btn">Пройти тест заново</button>
            </div>
        `;
        resultDiv.classList.remove('hidden'); // Показываем блок с результатами
        questionContainer.classList.add('hidden'); // Скрываем блок с вопросами

        // Добавляем обработчик для кнопки перезапуска
        document.getElementById('restart-btn').addEventListener('click', restartTest);
    }

    // Функция для перезапуска теста
    function restartTest() {
        currentQuestion = 0; // Сбрасываем текущий вопрос
        score = 0; // Сбрасываем баллы
        resultDiv.classList.add('hidden'); // Скрываем результаты
        questionContainer.classList.remove('hidden'); // Показываем вопросы
        showQuestion(); // Показываем первый вопрос
        updateProgress(); // Сбрасываем прогресс-бар
    }

    // Обработчик кликов на кнопки ответов
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('answer-btn')) {
            // Добавляем баллы за ответ
            score += parseInt(e.target.dataset.value);
            
            // Переходим к следующему вопросу или показываем результат
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion();
            } else {
                showResult();
            }
        }
    });

    // Показываем первый вопрос при загрузке страницы
    showQuestion();
});