const form = document.getElementById('form');
const btnMetric = document.getElementById('btn-metric');
const btnImperial = document.getElementById('btn-imperial');
const pesoLabel = document.getElementById('peso-label');
const alturaLabel = document.getElementById('altura-label');
const progressBar = document.getElementById('progress-bar');
const descriptionBadge = document.getElementById('description');
const valueResult = document.getElementById('value');
const infosSection = document.getElementById('infos');

let currentUnit = 'metric';

btnMetric.addEventListener('click', () => {
    currentUnit = 'metric';
    btnMetric.classList.add('active');
    btnImperial.classList.remove('active');
    pesoLabel.textContent = 'PESO (KG)';
    alturaLabel.textContent = 'ALTURA (CM)';
    document.getElementById('peso').placeholder = '00.0';
    document.getElementById('altura').placeholder = '000';
});

btnImperial.addEventListener('click', () => {
    currentUnit = 'imperial';
    btnImperial.classList.add('active');
    btnMetric.classList.remove('active');
    pesoLabel.textContent = 'PESO (LBS)';
    alturaLabel.textContent = 'ALTURA (IN)';
    document.getElementById('peso').placeholder = '00.0';
    document.getElementById('altura').placeholder = '00';
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    let bmi;
    if (currentUnit === 'metric') {
        const heightMeters = altura / 100;
        bmi = (peso / (heightMeters * heightMeters));
    } else {
        bmi = 703 * (peso / (altura * altura));
    }

    const formattedBmi = bmi.toFixed(1);

    let description = '';
    let progress = 0;

    infosSection.classList.remove('hidden');

    if (bmi < 18.5) {
        description = "Baixo Peso";
        progress = (bmi / 18.5) * 33;
    } else if (bmi >= 18.5 && bmi <= 25) {
        description = "Peso Ideal";
        progress = 33 + ((bmi - 18.5) / (25 - 18.5)) * 34;
    } else if (bmi > 25 && bmi <= 30) {
        description = "Sobrepeso";
        progress = 67 + ((bmi - 25) / (30 - 25)) * 33;
    } else {
        description = "Obesidade";
        progress = 100;
    }

    valueResult.textContent = formattedBmi.replace('.', ',');
    descriptionBadge.textContent = description;
    progressBar.style.setProperty('--progress', `${Math.min(progress, 100)}%`);

    if (window.innerWidth <= 1024) {
        infosSection.scrollIntoView({ behavior: 'smooth' });
    }
});