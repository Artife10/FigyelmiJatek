let correctNumbers = [];
let numbersCount = 3;

function startGame() {
    const difficultySelect = document.getElementById("difficulty");
    numbersCount = parseInt(difficultySelect.value);

    const totalCells = 9; // 3x3 rács
    const numbers = generateUniqueNumbers(numbersCount, 1, 9);
    correctNumbers = numbers.slice();

    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = "";

    // Rács létrehozása
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'hidden');

        // Ha a cella számot tartalmaz, megjelenítjük
        if (numbers.includes(i + 1)) {
            cell.dataset.number = i + 1;
            cell.innerText = i + 1;
        }

        gameArea.appendChild(cell);
    }

    // Megjelenítés
    setTimeout(() => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.add('hidden');
            cell.innerText = ""; // Üresre állítás
        });

        document.getElementById("user-input").style.display = "block"; // Szövegmező megjelenítése
        document.getElementById("submit-button").style.display = "block"; // Ellenőrzés gomb megjelenítése
        document.getElementById("message").innerText = "Írd be a számokat, amelyeket láttál:";
    }, 2000);
}

function checkAnswer() {
    const userInput = document.getElementById("user-input").value;
    const userNumbers = userInput.split(',').map(Number);

    // Ellenőrizzük, hogy a felhasználó annyi számot adott-e meg, amennyi látható volt
    const isCorrect = userNumbers.length === correctNumbers.length &&
        userNumbers.every(num => correctNumbers.includes(num));

    const message = isCorrect
        ? "Helyes!"
        : `Helytelen! A helyes számok: ${correctNumbers.join(", ")}`;
    document.getElementById("message").innerText = message;
}

function generateUniqueNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers);
}
