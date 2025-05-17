document.addEventListener('DOMContentLoaded', () => {
    // Elementos da Seção 1: Medidor de Amor
    const loveSlider = document.getElementById('love-slider');
    const percentageValue = document.getElementById('percentage-value');
    const loveMessage = document.getElementById('love-message');
    const toGalleryBtn = document.getElementById('to-gallery-btn');
    const heart = document.getElementById('heart');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const myConfetti = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });

    // Elementos da Seção 2: Galeria
    const galleryImage = document.getElementById('gallery-image');
    const prevImageBtn = document.getElementById('prev-image-btn');
    const nextImageBtn = document.getElementById('next-image-btn');
    const imageCaption = document.getElementById('image-caption');
    const toTimerBtn = document.getElementById('to-timer-btn');

    // Elementos da Seção 3: Timer
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Elementos das Seções (para navegação)
    const loveMeterSection = document.getElementById('love-meter-section');
    const gallerySection = document.getElementById('gallery-section');
    const timerSection = document.getElementById('timer-section');
    const restartBtn = document.getElementById('restart-btn');

    let timerInterval; // Para controlar o intervalo do timer

    // --- Lógica dos Corações Flutuantes ---
    function createFloatingHeart() {
        const heartEl = document.createElement('div');
        heartEl.classList.add('floating-heart');
        heartEl.innerHTML = ['❤️', '💖', '💕', '💓', '💗'][Math.floor(Math.random() * 5)]; // Variedade de corações
        heartEl.style.left = Math.random() * 100 + 'vw'; // Posição horizontal aleatória
        
        const randomSize = Math.random() * 15 + 15 + 'px'; // Tamanho entre 15px e 30px
        heartEl.style.fontSize = randomSize;

        const animationDuration = Math.random() * 5 + 5 + 's'; // Duração da animação entre 5s e 10s
        heartEl.style.animationDuration = animationDuration;
        
        // Adiciona uma pequena variação no movimento horizontal
        const sway = (Math.random() * 10 - 5) + 'vw'; // Entre -5vw e +5vw
        heartEl.style.setProperty('--sway', sway);


        document.body.appendChild(heartEl);

        // Remove o coração do DOM após a animação terminar
        setTimeout(() => {
            heartEl.remove();
        }, parseFloat(animationDuration) * 1000 + 100); // Um pouco depois da animação
    }
    setInterval(createFloatingHeart, 700); // Cria um novo coração a cada 700ms


    // --- Lógica da Seção 1: Medidor de Amor ---
    let loveReached100 = false;
    loveSlider.addEventListener('input', () => {
        const value = loveSlider.value;
        percentageValue.textContent = value;
        heart.style.transform = `scale(${1 + (value / 500)})`;

        if (value === '100' && !loveReached100) {
            loveReached100 = true;
            loveMessage.textContent = "EU SABIA! Te amo infinitamente mais! ❤️";
            loveMessage.classList.remove('hidden');
            toGalleryBtn.classList.remove('hidden');
            loveSlider.disabled = true;

            function fireConfetti() {
                const duration = 5 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999, scalar: 1.2, colors: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#C71585'] }; // Tons de rosa para confetti

                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }

                const interval = setInterval(function() {
                    const timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }
                    const particleCount = 60 * (timeLeft / duration);
                    myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);
            }
            fireConfetti();

        } else if (value < 100) {
            loveReached100 = false;
            loveMessage.classList.add('hidden');
            toGalleryBtn.classList.add('hidden');
        }
    });

    // --- Lógica da Seção 2: Galeria de Fotos ---
    const ourPhotos = [
        { src: "https://via.placeholder.com/600x400/ffdee9/e91e63?text=Nossa+Primeira+Foto+Juntos", caption: "Nossa primeira aventura! ❤️" },
        { src: "https://via.placeholder.com/600x400/b5eaff/333?text=Viagem+Inesquec%C3%ADvel", caption: "Aquela viagem dos sonhos... ✈️" },
        { src: "https://via.placeholder.com/600x400/fff0f5/d81b60?text=Sempre+Rindo", caption: "Momentos de pura diversão! 😄" },
        { src: "https://via.placeholder.com/600x400/ffe4e1/e91e63?text=Anivers%C3%A1rio+Especial", caption: "Celebrando a vida e o amor! 🎉" },
        // !!! ADICIONE SUAS FOTOS AQUI: { src: 'caminho/foto.jpg', caption: 'Legenda.' } !!!
    ];
    let currentPhotoIndex = 0;

    function showPhoto(index) {
        if (ourPhotos.length === 0) {
             galleryImage.src = "https://via.placeholder.com/600x400/ccc/000?text=Adicione+suas+fotos+aqui!";
             imageCaption.textContent = "Personalize com suas memórias!";
             prevImageBtn.disabled = true;
             nextImageBtn.disabled = true;
             toTimerBtn.classList.remove('hidden');
             return;
        }
        galleryImage.src = ourPhotos[index].src;
        imageCaption.textContent = ourPhotos[index].caption || "";
        prevImageBtn.disabled = index === 0;
        nextImageBtn.disabled = index === ourPhotos.length - 1;

        if (index === ourPhotos.length - 1 || ourPhotos.length === 0) {
            toTimerBtn.classList.remove('hidden');
        } else {
            toTimerBtn.classList.add('hidden');
        }
    }

    nextImageBtn.addEventListener('click', () => {
        if (currentPhotoIndex < ourPhotos.length - 1) {
            currentPhotoIndex++;
            showPhoto(currentPhotoIndex);
        }
    });

    prevImageBtn.addEventListener('click', () => {
        if (currentPhotoIndex > 0) {
            currentPhotoIndex--;
            showPhoto(currentPhotoIndex);
        }
    });

    // --- Lógica da Seção 3: Termômetro Dinâmico ---
    // !!! IMPORTANTE: COLOQUE A DATA E HORA EXATAS DO INÍCIO DO NAMORO DE VOCÊS !!!
    // Formato: 'ANO-MÊS-DIATHORA:MINUTO:SEGUNDO' (ex: '2024-05-16T18:30:00')
    // Para este exemplo, vou simular que o namoro começou há exatamente 1 ano (no momento atual, May 16, 2025)
    // Se o seu aniversário é hoje, e começou à meia-noite, seria algo como:
    // const anniversaryStartDate = new Date('2024-05-16T00:00:00');
    
    // Para demonstração, vamos usar uma data que seja exatamente 1 ano antes de "agora"
    // (Esta lógica é para garantir que sempre mostre um ano no dia do aniversário)
    const nowForDemo = new Date(); // Data e hora atual
    const anniversaryStartDate = new Date(nowForDemo.getFullYear() - 1, nowForDemo.getMonth(), nowForDemo.getDate(), nowForDemo.getHours(), nowForDemo.getMinutes(), nowForDemo.getSeconds());
    // **SUBSTITUA A LINHA ACIMA PELA DATA REAL DO SEU NAMORO!**
    // Exemplo: const anniversaryStartDate = new Date('2024-05-16T20:00:00');


    function animateNumberUpdate(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'numberUpdate 0.5s ease-in-out';
    }
    
    function updateTimer() {
        const now = new Date();
        const diff = now - anniversaryStartDate; // Diferença em milissegundos

        if (diff < 0) { // Se a data do aniversário ainda não chegou
            daysEl.textContent = 0;
            hoursEl.textContent = 0;
            minutesEl.textContent = 0;
            secondsEl.textContent = 0;
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Só anima se o valor mudar para evitar piscar constante
        if (daysEl.textContent !== String(d)) { daysEl.textContent = d; animateNumberUpdate(daysEl); }
        if (hoursEl.textContent !== String(h)) { hoursEl.textContent = h; animateNumberUpdate(hoursEl); }
        if (minutesEl.textContent !== String(m)) { minutesEl.textContent = m; animateNumberUpdate(minutesEl); }
        if (secondsEl.textContent !== String(s)) { secondsEl.textContent = s; animateNumberUpdate(secondsEl); }
    }

    // --- Navegação entre Seções ---
    function showSection(sectionToShow) {
        if (timerInterval) clearInterval(timerInterval); // Limpa o timer ao mudar de seção

        [loveMeterSection, gallerySection, timerSection].forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active-section');
        });
        sectionToShow.classList.remove('hidden');
        sectionToShow.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (sectionToShow === timerSection) {
            updateTimer(); // Chama uma vez para não ter delay
            timerInterval = setInterval(updateTimer, 1000); // Inicia o timer dinâmico
        }
    }

    toGalleryBtn.addEventListener('click', () => {
        showSection(gallerySection);
        showPhoto(currentPhotoIndex);
    });

    toTimerBtn.addEventListener('click', () => {
        showSection(timerSection);
    });

    restartBtn.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
        loveSlider.value = 0;
        percentageValue.textContent = '0';
        heart.style.transform = 'scale(1)';
        loveMessage.classList.add('hidden');
        toGalleryBtn.classList.add('hidden');
        loveSlider.disabled = false;
        loveReached100 = false;
        currentPhotoIndex = 0;
        toTimerBtn.classList.add('hidden');
        showSection(loveMeterSection);
    });

    // Inicialização
    showSection(loveMeterSection);
     if (ourPhotos.length > 0) {
        showPhoto(currentPhotoIndex);
    } else {
        showPhoto(0);
    }
});