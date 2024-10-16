const characters = [
    { name: 'Karakter A', rarity: 5 },
    { name: 'Karakter B', rarity: 4 },
    { name: 'Karakter C', rarity: 3 },
    { name: 'Karakter D', rarity: 3 },
    { name: 'Karakter E', rarity: 2 }
];

const gachaButton = document.getElementById('gacha-button');
const resultDiv = document.getElementById('result');
const historyList = document.getElementById('history-list');

gachaButton.addEventListener('click', () => {
    const result = gacha();
    displayResult(result);
    updateHistory(result);
});

function gacha() {
    const totalRarity = characters.reduce((sum, char) => sum + char.rarity, 0);
    const random = Math.random() * totalRarity;
    let cumulativeRarity = 0;

    for (const character of characters) {
        cumulativeRarity += character.rarity;
        if (random < cumulativeRarity) {
            return character;
        }
    }
}

function displayResult(character) {
    resultDiv.textContent = `Kamu mendapatkan: ${character.name} (Rarity: ${character.rarity})`;
}

function updateHistory(character) {
    const listItem = document.createElement('li');
    listItem.textContent = `${new Date().toLocaleString()}: ${character.name} (Rarity: ${character.rarity})`;
    historyList.appendChild(listItem);
}
