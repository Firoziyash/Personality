document.getElementById('personality-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const day = document.getElementById('day').value.padStart(2, '0');  // Ensure DD format
    const month = document.getElementById('month').value.padStart(2, '0');  // Ensure MM format
    const year = document.getElementById('year').value;

    // Calculate personality traits
    const D1 = parseInt(day[0]);
    const D2 = parseInt(day[1]);
    const numD = D1 + D2;

    const M1 = parseInt(month[0]);
    const M2 = parseInt(month[1]);

    const Y1 = parseInt(year[0]);
    const Y2 = parseInt(year[1]);
    const Y3 = parseInt(year[2]);
    const Y4 = parseInt(year[3]);

    const numA = D1 + D2 + M1 + M2 + Y1 + Y2 + Y3 + Y4;

    const numB = numA.toString();
    const N1 = parseInt(numB[0]);
    const N2 = numB.length === 2 ? parseInt(numB[1]) : 0;

    const numF = N1 + N2;
    const numE = numF.toString();
    const N3 = parseInt(numE[0]);
    const N4 = numE.length === 2 ? parseInt(numE[1]) : 0;

    const numC = N3 + N4;

    const dob = [D1, D2, numD, M1, M2, Y1, Y2, Y3, Y4, numC].filter(x => x !== 0);

    const mental = [4, 9, 2];
    const emotional = [3, 5, 7];
    const practical = [8, 1, 6];
    const thought = [4, 3, 8];
    const will = [9, 5, 1];
    const action = [2, 7, 6];
    const silver = [2, 5, 8];
    const golden = [4, 5, 6];

    let traits = "Nice";
    if (golden.every(v => dob.includes(v))) {
        traits = "Most Unique";
    } else if (silver.every(v => dob.includes(v))) {
        traits = "Rich or Famous";
    } else if (mental.every(v => dob.includes(v))) {
        traits = "Intelligent";
    } else if (emotional.every(v => dob.includes(v))) {
        traits = "Emotional";
    } else if (practical.every(v => dob.includes(v))) {
        traits = "Hard Working";
    } else if (thought.every(v => dob.includes(v))) {
        traits = "Intellectual";
    } else if (will.every(v => dob.includes(v))) {
        traits = "Determined";
    } else if (action.every(v => dob.includes(v))) {
        traits = "Confident";
    }

    // Display result
    document.getElementById('result').innerHTML = `${name}, you are a ${traits} person.`;
    const msg = new SpeechSynthesisUtterance(`${name}, you are a ${traits} person.`);
    window.speechSynthesis.speak(msg);

    // Send data to Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            access_key: '15e42be6-a1ae-4a52-a0de-9d0d5e885959',
            name: name,
            day: day,
            month: month,
            year: year,
            traits: traits
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
