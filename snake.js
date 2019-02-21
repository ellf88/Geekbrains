var fieldSizeX = 20;
var fieldSizeY = 20;
var cellSize = 16;
var snakeSpeed = 200;
var snake = [];
var score = 0;
var foodSpeed = 3000;
var food = [];

var snakeCoordX;
var snakeCoordY;
var snakeTimer;
var direction = "top";

function unit() {
    buildGameField();

    document.getElementById("snake-start").addEventListener("click", handleGameStart);
    /*document.getElementById("snake-renew").addEventListener("click", handleGameRefresh);*/

    window.addEventListener("keydown", handleDirectionChange);
}

function handleGameStart() {
    respawn();

    snakeTimer = setInterval(move, snakeSpeed);
    setTimeout(createFood, foodSpeed);
}

function move() {
    var $table = document.getElementById("game-table");
    var newUnit;

    switch (direction) {
        case "top":
            snakeCoordY--;
            break;
        case "bottom":
            snakeCoordY++;
            break;
        case "left":
            snakeCoordX--;
            break;
        case "right":
            snakeCoordX++;
    }

    if (snakeCoordX >= 0 && snakeCoordX < fieldSizeX &&
        snakeCoordY >= 0 && snakeCoordY < fieldSizeY) {
        newUnit = $table.children[snakeCoordY].children[snakeCoordX];
    } else if (snakeCoordX >= 0 && snakeCoordX === fieldSizeX ||
        snakeCoordY >= 0 && snakeCoordY === fieldSizeY || snakeCoordX < 0 || snakeCoordY < 0) {
        switch (snakeCoordX) {
            case fieldSizeX:
                snakeCoordX = 0;
                break;
            case -1:
                snakeCoordX = fieldSizeX - 1;
                break;
        }
        switch (snakeCoordY) {
            case fieldSizeY:
                snakeCoordY = 0;
                break;
            case -1:
                snakeCoordY = fieldSizeY - 1;
                break;
        }
        newUnit = $table.children[snakeCoordY].children[snakeCoordX];
    }

    if (newUnit && !isSnakeUnit(newUnit)) {
        newUnit.classList.add("snake-unit");
        snake.push(newUnit);

        if (!isFoodUnit(newUnit)) {
            var oldUnit = snake.shift();
            oldUnit.classList.remove("snake-unit");
        } else {
            createFood();
        }
    } else {
        gameOver();
    }
}

function handleDirectionChange(event) {
    switch (event.keyCode) {
        case 37:
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case 38:
            if (direction !== "bottom") {
                direction = "top";
            }
            break;
        case 39:
            if (direction !== "left") {
                direction = "right";
            }
            break;
        case 40:
            if (direction !== "top") {
                direction = "bottom";
            }
            break;
    }
}

function gameOver() {
    clearInterval(snakeTimer);
    alert("Game Over");
}

function createFood() {
    var foodCreated = false;
    var $table = document.getElementById("game-table");

    while (!foodCreated) {
        var foodX = Math.floor(Math.random() * fieldSizeX);
        var foodY = Math.floor(Math.random() * fieldSizeY);

        var foodUnit = $table.children[foodX].children[foodY];
        food.push(foodUnit);

        if (!foodUnit.classList.contains("snake-unit")) {
            foodCreated = true;
            foodUnit.classList.add("food-unit");
        }
    }
}

function isFoodUnit(unit) {
    if (unit.classList.contains("food-unit")) {
        score++;
        unit.classList.remove("food-unit");
        return true;
    } else {
        return false;
    }
}

function buildGameField() {
    var $table = document.createElement("table");
    $table.classList.add("game-table");
    $table.id = "game-table";

    var $field = document.getElementById("snake-field");
    $field.style.width = fieldSizeX * cellSize + "px";

    for (var i = 0; i < fieldSizeX; i++) {
        var $row = document.createElement("tr");

        for (var j = 0; j < fieldSizeY; j++) {
            var $cell = document.createElement("td");
            $cell.classList.add("game-table-cell");
            $cell.style.width = cellSize + "px";
            $cell.style.height = cellSize + "px";

            $row.appendChild($cell);
        }
        $table.appendChild($row);
    }
    $field.appendChild($table);
}

function isSnakeUnit() {
    return snake.includes(unit);
}

function respawn() {
    if (snake.length > 0) {
        for (var i = 0; i < snake.length; i++) {
            snake[i].classList.remove("snake-unit");
        }
        snake = [];
    }

    if (food.length > 0) {
        for (var i = 0; i < food.length; i++) {
            food[i].classList.remove("food-unit");
        }
        food = [];
    }

    snakeCoordX = Math.floor(fieldSizeX / 2);
    snakeCoordY = Math.floor(fieldSizeY / 2);
    var $table = document.getElementById("game-table");
    var $snakeHead = $table.children[snakeCoordY].children[snakeCoordX];
    var $snakeTail = $table.children[--snakeCoordY].children[snakeCoordX];

    $snakeHead.classList.add("snake-unit");
    $snakeTail.classList.add("snake-unit");

    snake.push($snakeHead);
    snake.push($snakeTail);
}



window.addEventListener("load", unit);
