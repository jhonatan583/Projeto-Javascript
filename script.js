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
    const toAllPhotosBtn = document.getElementById('to-all-photos-btn');

    // Elementos da Seção 4: Coleção de Fotos
    const allPhotosCollectionSection = document.getElementById('all-photos-collection-section');
    const allPhotosImage = document.getElementById('all-photos-image');
    const finalCollectionMessage = document.getElementById('final-collection-message');

    // Elementos das Seções (para navegação)
    const loveMeterSection = document.getElementById('love-meter-section');
    const gallerySection = document.getElementById('gallery-section');
    const timerSection = document.getElementById('timer-section');
    // allPhotosCollectionSection já foi declarado acima
    const restartBtn = document.getElementById('restart-btn');

    let timerInterval;
    let allPhotosSlideshowInterval;
    let loveReached100 = false;

    // --- Lógica dos Corações Flutuantes ---
    function createFloatingHeart() {
        const heartEl = document.createElement('div');
        heartEl.classList.add('floating-heart');
        heartEl.innerHTML = ['❤️', '💖', '💕', '💓', '💗'][Math.floor(Math.random() * 5)];
        heartEl.style.left = Math.random() * 100 + 'vw';
        const randomSize = Math.random() * 15 + 15 + 'px';
        heartEl.style.fontSize = randomSize;
        const animationDuration = Math.random() * 5 + 5 + 's';
        heartEl.style.animationDuration = animationDuration;
        const sway = (Math.random() * 10 - 5) + 'vw';
        heartEl.style.setProperty('--sway', sway);
        document.body.appendChild(heartEl);
        setTimeout(() => {
            heartEl.remove();
        }, parseFloat(animationDuration) * 1000 + 100);
    }
    setInterval(createFloatingHeart, 700);

    // --- Lógica da Seção 1: Medidor de Amor ---
    loveSlider.addEventListener('input', () => {
        const value = parseInt(loveSlider.value);
        percentageValue.textContent = value;
        heart.style.transform = `scale(${1 + (value / 500)})`;

        if (value === 100) {
            loveMessage.textContent = "EU SABIA! Te amo infinitamente mais! ❤️";
            loveMessage.classList.remove('hidden');
            if (!loveReached100) {
                loveReached100 = true;
                toGalleryBtn.classList.remove('hidden');
                loveSlider.disabled = true;
                function fireConfetti() {
                    const duration = 5 * 1000;
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999, scalar: 1.2, colors: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#C71585'] };
                    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
                    const interval = setInterval(function() {
                        const timeLeft = animationEnd - Date.now();
                        if (timeLeft <= 0) return clearInterval(interval);
                        const particleCount = 60 * (timeLeft / duration);
                        myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                        myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                    }, 250);
                }
                fireConfetti();
            }
        } else if (value > 0 && value < 100) {
            loveMessage.textContent = "Poxa, só isso seu amor por mim? 😢";
            loveMessage.classList.remove('hidden');
            toGalleryBtn.classList.add('hidden');
        } else { // value === 0
            loveMessage.classList.add('hidden');
            toGalleryBtn.classList.add('hidden');
        }
    });

    // --- Lógica da Seção 2: Galeria de Fotos ---
    const ourPhotos = [
        { src: "img/1 passeio.jpg", caption: "Nossa primeira aventura! ❤️" },
        { src: "img/viagem praia.jpg", caption: "Aquela viagem... " },
        { src: "img/diversao.jpg", caption: "Momentos de pura diversão! 😄" },
        { src: "img/celebrando.jpg", caption: "Celebrando a vida e o amor! 🎉" },
        // !!! ADICIONE SUAS FOTOS (ATÉ UMAS 5-7 AQUI) !!!
        // Exemplo: { src: "caminho/para/sua/foto.jpg", caption: "Sua legenda aqui" }
    ];
    let currentPhotoIndex = 0;

    function showPhoto(index) {
        if (ourPhotos.length === 0) {
             galleryImage.src = "https://via.placeholder.com/600x400/ccc/000?text=Adicione+fotos+na+galeria";
             imageCaption.textContent = "Personalize com suas memórias!";
             prevImageBtn.disabled = true; nextImageBtn.disabled = true;
             toTimerBtn.classList.remove('hidden'); return;
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
    nextImageBtn.addEventListener('click', () => { if (currentPhotoIndex < ourPhotos.length - 1) { currentPhotoIndex++; showPhoto(currentPhotoIndex); } });
    prevImageBtn.addEventListener('click', () => { if (currentPhotoIndex > 0) { currentPhotoIndex--; showPhoto(currentPhotoIndex); } });

    // --- Lógica da Seção 3: Termômetro Dinâmico ---
    // !!! SUBSTITUA PELA DATA REAL DO SEU NAMORO !!!
    // Exemplo: const anniversaryStartDate = new Date('2024-05-18T20:00:00'); // SE O NAMORO COMEÇOU ANO PASSADO NESTA DATA E HORA
    const nowForAccurateReference = new Date('2025-05-18T00:00:00'); // Usar a data atual real para o cálculo de "1 ano atrás"
    const anniversaryStartDate = new Date(nowForAccurateReference.getFullYear() - 1, nowForAccurateReference.getMonth(), nowForAccurateReference.getDate(), nowForAccurateReference.getHours(), nowForAccurateReference.getMinutes(), nowForAccurateReference.getSeconds());
    // A linha acima é um exemplo para simular 1 ano exato.
    // VOCÊ DEVE SUBSTITUÍ-LA PELA DATA E HORA REAIS DO INÍCIO DO NAMORO. Por exemplo:
    // const anniversaryStartDate = new Date('2024-05-18T19:30:00'); // (Ano-Mês-DiaTHora:Minuto:Segundo)

    function animateNumberUpdate(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'numberUpdate 0.5s ease-in-out';
    }
    function updateTimer() {
        const now = new Date();
        const diff = now - anniversaryStartDate;
        if (diff < 0) { daysEl.textContent = 0; hoursEl.textContent = 0; minutesEl.textContent = 0; secondsEl.textContent = 0; return; }
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        if (daysEl.textContent !== String(d)) { daysEl.textContent = d; animateNumberUpdate(daysEl); }
        if (hoursEl.textContent !== String(h)) { hoursEl.textContent = h; animateNumberUpdate(hoursEl); }
        if (minutesEl.textContent !== String(m)) { minutesEl.textContent = m; animateNumberUpdate(minutesEl); }
        if (secondsEl.textContent !== String(s)) { secondsEl.textContent = s; animateNumberUpdate(secondsEl); }
    }

    // --- Lógica da Seção 4: Coleção Completa de Fotos ---
    // !!! ESTE É O BLOCO QUE VOCÊ ESTAVA PROCURANDO !!!
    // !!! ADICIONE SUAS ~20 FOTOS AQUI !!!
    const allOurSpecialPhotos = [
        { src: "img/foto1.jpg" }, { src: "img/foto8.jpg" }, { src: "img/foto15.jpg" },
        { src: "img/foto2.jpg" }, { src: "img/foto9.jpg" }, { src: "img/foto16.jpg" },
        { src: "img/foto3.jpg" }, { src: "img/foto10.jpg" }, { src: "img/foto17.jpg" },
        { src: "img/foto4.jpg" }, { src: "img/foto11.jpg" }, { src: "img/foto18.jpg" },
        { src: "img/foto5.jpg" }, { src: "img/foto12.jpg" }, { src: "img/foto19.jpg" },
        { src: "img/foto_6.jpg" }, { src: "img/foto13.jpg" }, { src: "img/foto20.jpg" },
        { src: "img/foto_7.jpg" }, { src: "img/foto14.jpg" }
        // Adicione objetos apenas com 'src', ex: { src: "caminho/para/foto_nova.jpg" }
        // Lembre-se de colocar suas fotos na pasta 'img' ou ajustar o caminho.
    ];
    let currentAllPhotoIndex = -1;

    function displayNextSpecialPhoto() {
        currentAllPhotoIndex++;
        if (currentAllPhotoIndex < allOurSpecialPhotos.length) {
            allPhotosImage.src = allOurSpecialPhotos[currentAllPhotoIndex].src;
            allPhotosImage.style.animation = 'none';
            allPhotosImage.offsetHeight; 
            allPhotosImage.style.animation = 'fadeInImage 1s ease-in-out';
        } else {
            clearInterval(allPhotosSlideshowInterval);
            allPhotosImage.classList.add('hidden');
            finalCollectionMessage.textContent = "Você é muito especial para mim... Te amo! ❤️";
            finalCollectionMessage.classList.remove('hidden');
        }
    }

    function startAllPhotosSlideshow() {
        currentAllPhotoIndex = -1;
        allPhotosImage.classList.remove('hidden');
        finalCollectionMessage.classList.add('hidden');
        
        if (allOurSpecialPhotos.length === 0) {
            allPhotosImage.src = "https://via.placeholder.com/600x400/ccc/000?text=Adicione+fotos+na+cole%C3%A7%C3%A3o";
            finalCollectionMessage.textContent = "Ops! Parece que não há fotos na coleção. Adicione algumas no array 'allOurSpecialPhotos' em script.js!";
            finalCollectionMessage.classList.remove('hidden');
            return;
        }

        displayNextSpecialPhoto();
        allPhotosSlideshowInterval = setInterval(displayNextSpecialPhoto, 3000); // Troca a cada 3 segundos
    }

    // --- Navegação entre Seções ---
    function showSection(sectionToShow) {
        if (timerInterval) clearInterval(timerInterval);
        if (allPhotosSlideshowInterval) clearInterval(allPhotosSlideshowInterval);

        [loveMeterSection, gallerySection, timerSection, allPhotosCollectionSection].forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active-section');
        });
        sectionToShow.classList.remove('hidden');
        sectionToShow.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (sectionToShow === timerSection) {
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
        } else if (sectionToShow === allPhotosCollectionSection) {
            startAllPhotosSlideshow();
        }
    }

    toGalleryBtn.addEventListener('click', () => { showSection(gallerySection); showPhoto(currentPhotoIndex); });
    toTimerBtn.addEventListener('click', () => { showSection(timerSection); });
    toAllPhotosBtn.addEventListener('click', () => { showSection(allPhotosCollectionSection); });

    restartBtn.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
        if (allPhotosSlideshowInterval) clearInterval(allPhotosSlideshowInterval);

        loveSlider.value = 0;
        percentageValue.textContent = '0';
        heart.style.transform = 'scale(1)';
        loveMessage.classList.add('hidden');
        toGalleryBtn.classList.add('hidden');
        loveSlider.disabled = false;
        loveReached100 = false;

        currentPhotoIndex = 0;
        
        finalCollectionMessage.classList.add('hidden');
        allPhotosImage.classList.remove('hidden');
        allPhotosImage.src = ""; 
        currentAllPhotoIndex = -1;

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