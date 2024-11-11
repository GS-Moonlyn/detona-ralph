const state = { 
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },

    values:{
        hitPosition: 0,
        scoreValue: 0,
        timeLeft: 60,
        lives: 3
    },

    actions: {
        timerId: setInterval(randomSquare, 800),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.timeLeft--;
    state.view.time.textContent = state.values.timeLeft;

    if(state.values.timeLeft <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Final Score: " + state.values.scoreValue);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });
    let rng = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[rng];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
    playSound("spawn.wav");
}

function addHitboxListener() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition && state.values.lives > 0){
                state.values.scoreValue++;
                state.view.score.textContent = state.values.scoreValue;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            }

            else {

                if(state.values.lives > 0)
                {
                    state.values.lives--;
                    state.view.lives.textContent = "x" + state.values.lives; 
                    playSound("miss.wav");
                }

                if(state.values.lives <= 0){
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    alert("Game Over! Final Score: " + state.values.scoreValue);
                }
            }
        })
    });
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}`);
    audio.volume = 0.1;
    audio.play();
}

function Start() {
    addHitboxListener();
}

Start();