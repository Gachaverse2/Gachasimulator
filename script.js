<script>
    // Jumlah tiket gacha
    var totalTickets = localStorage.getItem('totalTickets') ? parseInt(localStorage.getItem('totalTickets')) : 100;

    // Total gacha yang dilakukan
    var totalGacha = localStorage.getItem('totalGacha') ? parseInt(localStorage.getItem('totalGacha')) : 0;

    // Riwayat gacha
    var gachaHistory = JSON.parse(localStorage.getItem('gachaHistory')) || [];

    // Daftar item dengan raritas yang berbeda
    var items = [
        { name: 'Aventurine', chance: 0.6, rarity: 'five-star', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdIQA4hSoH8H7LPGSBE8foCdl-eB8Vae82B2VnE6Ku-lskgXHgMg8H7zOEnPy9xdzkcLYgiSAeuVsZNj645V4MpBcDomhS6Y-BhmzQmmbmrOhatsNg38PtgOmthgEtxQOMR6SLfPuLJ2Grn_u6sIE1iA7eqsQPyKT3ba-U9TrjSo0FJkm74x3m1V9Olas/s16000/Aventurine%20Splash%20Art_full.png' },
        { name: 'Lynx', chance: 3.33, rarity: 'four-star' },
        { name: 'Luka', chance: 3.33, rarity: 'four-star' },
        { name: 'Serval', chance: 3.33, rarity: 'four-star' },
        { name: 'Amber', chance: 93.74 / 4, rarity: 'three-star' },
        { name: 'Collapsing Sky', chance: 93.74 / 4, rarity: 'three-star' },
        { name: 'Cornucopia', chance: 93.74 / 4, rarity: 'three-star' },
        { name: 'Arrows', chance: 93.74 / 4, rarity: 'three-star' }
    ];

    // Memperbarui tampilan tiket
    document.getElementById('ticket-amount').innerText = totalTickets;
    updateGachaHistory(); // Menampilkan riwayat saat halaman dimuat

    function updateTotalTickets() {
        localStorage.setItem('totalTickets', totalTickets);
        document.getElementById('ticket-amount').innerText = totalTickets;
    }

    function doGacha(isMulti) {
        let gachaCount = isMulti ? 10 : 1;

        // Periksa cukup tiket untuk gacha
        if (totalTickets < gachaCount) {
            alert(`Anda tidak memiliki cukup tiket untuk menarik ${isMulti ? "10x" : "1x"} gacha!`);
            return;
        }

        totalTickets -= gachaCount; // Kurangi tiket
        updateTotalTickets(); // Perbarui tampilan tiket

        var results = [];
        var guaranteedFiveStar = false; // Menandai apakah Acheron ditambahkan sebagai jaminan

        // Gacha normal
        for (var i = 0; i < gachaCount; i++) {
            // Jika sudah mencapai 90 gacha, tambahkan Acheron
            if (totalGacha === 90) {
                results.push(items[0]); // Tambahkan Acheron
                guaranteedFiveStar = true; // Tandai bahwa Acheron telah ditambahkan
                totalGacha++; // Increment total gacha setelah menambahkan Acheron
                break; // Keluar dari loop
            } else {
                var randomValue = Math.random() * 100;
                var cumulativeChance = 0;

                for (var j = 0; j < items.length; j++) {
                    cumulativeChance += items[j].chance;
                    if (randomValue <= cumulativeChance) {
                        results.push(items[j]);
                        break;
                    }
                }
            }
        }

        // Jika tidak ada Acheron ditambahkan dan kita sudah lebih dari 90, tambahkan hasil normal
        while (results.length < gachaCount) {
            var randomValue = Math.random() * 100;
            var cumulativeChance = 0;

            for (var j = 0; j < items.length; j++) {
                cumulativeChance += items[j].chance;
                if (randomValue <= cumulativeChance) {
                    results.push(items[j]);
                    break;
                }
            }
        }

        // Increment total gacha
        totalGacha += gachaCount; // Update total gacha secara keseluruhan
        localStorage.setItem('totalGacha', totalGacha); // Simpan ke localStorage

        // Menampilkan hasil
        displayResults(results);
    }

    function displayResults(results) {
        var gachaResultsDiv = document.getElementById('gacha-results');
        
        // Kosongkan hasil sebelumnya
        gachaResultsDiv.innerHTML = '';

        results.forEach(function (result, index) {
            var resultDiv = document.createElement('div');
            resultDiv.classList.add('gacha-result', result.rarity);
            resultDiv.innerText = result.name;

            if (result.image) {
                var characterImage = document.getElementById('character-image');
                characterImage.src = result.image;
                characterImage.style.display = 'block';
            }

            gachaResultsDiv.appendChild(resultDiv);

            // Efek muncul satu per satu
            setTimeout(function () {
                resultDiv.classList.add('show');
            }, index * 300); // Jeda 300ms antara setiap hasil
        });

        // Menyimpan hasil ke riwayat gacha
        var currentDate = new Date();
        var timeString = currentDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        gachaHistory = gachaHistory.concat(results.map(item => ({
            name: item.name,
            time: timeString,
            rarity: item.rarity
        })));

        // Simpan riwayat gacha ke localStorage
        localStorage.setItem('gachaHistory', JSON.stringify(gachaHistory));
        updateGachaHistory();
    }

    function updateGachaHistory() {
        var gachaHistoryDiv = document.getElementById('gacha-history');
        gachaHistoryDiv.innerHTML = ''; // Mengosongkan riwayat sebelumnya

        gachaHistory.forEach(function (item) {
            var itemDiv = document.createElement('div');
            itemDiv.className = 'gacha-history-item ' + item.rarity;
            itemDiv.innerText = item.name + ' - ' + item.time;
            gachaHistoryDiv.appendChild(itemDiv);
        });
    }

    // Event listener untuk tombol gacha
    document.getElementById('gacha-button').addEventListener('click', function () {
        doGacha(false); // Gacha 1x
    });

    document.getElementById('gacha-10x-button').addEventListener('click', function () {
        doGacha(true); // Gacha 10x
    });
  function showGachaResult(result) {
    const resultContainer = document.getElementById('gacha-results');
    const characterImage = document.getElementById('character-image');
    
    // Menghapus class animasi sebelumnya
    characterImage.classList.remove('five-star-animation');
    
    // Menampilkan hasil gacha
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('gacha-result');
    
    // Menentukan apakah hasilnya bintang 5
    if (result.rarity === 5) {
        resultDiv.classList.add('five-star');
        characterImage.classList.add('five-star-animation'); // Tambahkan class animasi
    } else if (result.rarity === 4) {
        resultDiv.classList.add('four-star');
    }
    
    resultDiv.innerText = `Anda mendapatkan: ${result.name} (Bintang ${result.rarity})`;
    resultDiv.classList.add('show');
    resultContainer.appendChild(resultDiv);
    
    // Tampilkan gambar karakter
    characterImage.src = result.image; // Pastikan Anda menyimpan URL gambar untuk setiap karakter
}
</script>
