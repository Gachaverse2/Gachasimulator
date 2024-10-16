const characters = [
    { name: 'Aventurine', chance: 0.6, rarity: 'five-star' },
    { name: 'March 7th', chance: 3.33, rarity: 'four-star' },
    { name: 'Pela', chance: 3.33, rarity: 'four-star' },
    { name: 'Sampo', chance: 3.33, rarity: 'four-star' },
    { name: 'Amber', chance: 23.435, rarity: 'three-star' },
    { name: 'Collapsing Sky', chance: 23.435, rarity: 'three-star' },
    { name: 'Cornucopia', chance: 23.435, rarity: 'three-star' },
    { name: 'Arrows', chance: 23.435, rarity: 'three-star' }
];

document.getElementById('gacha-button').addEventListener('click', function() {
    const randomValue = Math.random() * 100; // Angka acak antara 0 dan 100
    let accumulatedChance = 0;
    let result = '';

    for (let character of characters) {
        accumulatedChance += character.chance;
        if (randomValue <= accumulatedChance) {
            result = character;
            break;
        }
    }

    // Menampilkan hasil gacha
    const resultsDiv = document.getElementById('gacha-results');
    resultsDiv.innerHTML = `Kamu mendapatkan: ${result.name} (${result.rarity})`;

    // Menambahkan riwayat gacha
    const historyDiv = document.getElementById('gacha-history-container');
    const historyItem = document.createElement('div');
    historyItem.textContent = `${result.name} (${result.rarity})`;
    historyDiv.appendChild(historyItem);
});
