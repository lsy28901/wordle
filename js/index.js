const answer = 'APPLE';

let attemps = 0; // 시도횟수
let index = 0; // 칸의 인덱스
let timer;

function appStart() {
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = '게임이 종료됐습니다.'
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top: 40vh; left:40vw; background-color:white; width:200px; height:100px;"
        document.body.appendChild(div)
    };

    const nextLine = () => {
        if (attemps === 6) return gameover();
        attemps += 1;
        index = 0;
    }

    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer);
    }

    const handleEnterKey = () => {
        let answerCorrect = 0;
        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attemps}${i}']`);

            const inputText = block.innerText;
            const answerText = answer[i]
            if (inputText === answerText) {
                answerCorrect += 1;
                block.style.background = "#6AAA64"
            }
            else if (answer.includes(inputText)) block.style.background = "#C9B458"
            else block.style.background = "#787C7E";
            block.style.color = "white";
            console.log('입력한글자:', inputText, '정답글자:', answerText)

        }

        if (answerCorrect === 5) gameover();
        else nextLine();

    }
    const handleBackspace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(`.board-block[data-index='${attemps}${index - 1}']`);
            preBlock.innerText = "";
        }

        if (index !== 0) index -= 1;
    }

    const handleKeydown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attemps}${index}']`);

        if (event.key === 'Backspace') handleBackspace();
        else if (index === 5) {
            if (event.key === "Enter") handleEnterKey();
            else return;
        } else if (keyCode <= 90 && keyCode >= 65) {
            thisBlock.innerText = key;
            index += 1;
        }

    }
    const startTimer = () => {
        const 시작시간 = new Date();
        function setTime() {
            const 현재시간 = new Date();
            const 흐른시간 = new Date(현재시간 - 시작시간);

            const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른시간.getSeconds().toString().padStart(2, "0")
            const timeDiv = document.querySelector("#timer");
            timeDiv.innerText = `${분}:${초}`;

        }
        timer = setInterval(setTime, 1000);
    }

    startTimer();

    window.addEventListener("keydown", handleKeydown)
}

appStart();