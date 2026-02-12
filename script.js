/* ===============================================
   VALENTINE INTERACTIVE WEBSITE - SCRIPT.JS
   Enhanced 2026 Edition - Mobile-First Optimized
   For Israt Jahan Payel
   =============================================== */

// ===============================================
// CONFIGURATION & CUSTOMIZATION POINTS
// ===============================================

// 🔧 CUSTOMIZATION POINT: Set your special countdown date
// Format: 'YYYY-MM-DDTHH:MM:SS'
// Example: Valentine's Day 2026
const SPECIAL_DATE = new Date('2026-02-14T00:00:00');

// 🔧 CUSTOMIZATION POINT: Add your romantic quotes here
// You can add as many as you want! More quotes = more variety
const ROMANTIC_QUOTES = [
    "Payel, in a sea of people, my eyes will always search for you. 💕",
    "You are my favorite notification, Payel. 📱💖",
    "I love you more than coffee, and that's saying a latte! ☕❤️",
    "You're the reason I believe in love at first sight, Payel! 👀💘",
    "If kisses were snowflakes, I'd send you a blizzard. ❄️💋",
    "You're the peanut butter to my jelly, the cheese to my macaroni. 🥜🧀",
    "I love you to the moon and back, and then some more! 🌙✨",
    "You make my heart skip a beat, Payel... and I'm not even running! 💓🏃",
    "Every love story is beautiful, but ours is my favorite. 📖💕",
    "You're my today and all of my tomorrows, Payel. ☀️🌟",
    "I fall for you more and more every day. 🍂❤️",
    "You're the Wi-Fi to my heart... I'm always connected! 📶💖",
    "Home is wherever I'm with you. 🏡💑",
    "You're my happy place, Payel. 😊💝",
    "I love you more than pizza, and that's amore! 🍕❤️",
    "You're the missing piece to my puzzle. 🧩💕",
    "With you, every moment is magical. ✨💖",
    "You're my sunshine on a cloudy day. ☀️🌧️",
    "I love you even when you steal all the blankets! 🛏️😂",
    "You're my favorite hello and hardest goodbye. 👋💔",
    "Together is my favorite place to be. 🤝💕",
    "You're the best thing that's ever been mine. 💎❤️",
    "I love you more than words can espresso! ☕💬",
    "Payel, you're my person, my love, my everything. 👫💖"
];

// 🔧 CUSTOMIZATION POINT: Customize quiz questions
// Change questions, answers, and correct answer index (0-3)
const QUIZ_QUESTIONS = [
    {
        emoji: "🎬",
        question: "What's our favorite thing to do together?",
        answers: [
            "CUDDLING",
            "KISSING",
            "TAKING PHOTOS",
            "GOSSIPING ABOUT LIFE"
        ],
        correct: 1 // Index of correct answer (1 = SECOND option)
    },
    {
        emoji: "🍕",
        question: "What was our first meal together?",
        answers: [
            "COLD COFFEE",
            "Pizza",
            "Pasta",
            "Burgers"
        ],
        correct: 0 // Index of correct answer (0 = FIRST option)
    },
    {
        emoji: "🎵",
        question: "What song reminds you of us?",
        answers: [
            "Perfect by Ed Sheeran",
            "Lover by Taylor Swift",
            "Thinking Out Loud",
            "All of Me by John Legend"
        ],
        correct: 1 // Index of correct answer (1 = SECOND option)
    },
    {
        emoji: "🌟",
        question: "Which street food did we fight over the most?",
        answers: [
            
            "PIZZA",
            "Fuchka",
            "YOUR LIPS",
            "Everything! 💕"
        ],
        correct: 1 // Index of correct answer (1 = SECOND option)
    },
    {
        emoji: "💭",
        question: "If you could describe our love in one word?",
        answers: [
            "Magical ✨",
            "Perfect 💯",
            "Eternal ♾️",
            "Unforgettable 💖"
        ],
        correct: 3 
    }
];

// ===============================================
// GLOBAL VARIABLES
// ===============================================

let currentQuizQuestion = 0;
let quizScore = 0;
let currentPhotoIndex = 0;
let totalPhotos = 0;
let countdownInterval = null;
let secretButtonFound = false;
let bgMusicPlaying = false;
let voicePlaying = false;

// ===============================================
// DOM ELEMENTS
// ===============================================

const elements = {
    // Audio
    bgMusic: document.getElementById('bgMusic'),
    musicToggle: document.getElementById('musicToggle'),
    voiceMessage: document.getElementById('voiceMessage'),
    playVoiceBtn: document.getElementById('playVoiceBtn'),
    voiceVisualizer: document.getElementById('voiceVisualizer'),
    
    // Welcome & Hero
    enterWebsite: document.getElementById('enterWebsite'),
    welcomeSection: document.getElementById('welcome'),
    heroSection: document.getElementById('hero'),
    startJourney: document.getElementById('startJourney'),
    
    // Quote
    randomQuote: document.getElementById('randomQuote'),
    refreshQuote: document.getElementById('refreshQuote'),
    
    // Quiz
    quizContent: document.getElementById('quizContent'),
    quizResult: document.getElementById('quizResult'),
    progressFill: document.getElementById('progressFill'),
    currentQuestion: document.getElementById('currentQuestion'),
    totalQuestions: document.getElementById('totalQuestions'),
    finalScore: document.getElementById('finalScore'),
    resultEmoji: document.getElementById('resultEmoji'),
    resultTitle: document.getElementById('resultTitle'),
    resultMessage: document.getElementById('resultMessage'),
    
    // Carousel
    carouselTrack: document.getElementById('carouselTrack'),
    prevPhoto: document.getElementById('prevPhoto'),
    nextPhoto: document.getElementById('nextPhoto'),
    carouselDots: document.getElementById('carouselDots'),
    
    // Countdown
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    countdownMessage: document.getElementById('countdownMessage'),
    
    // Secret Hunt
    secretButton: document.getElementById('secretButton'),
    secretHuntArea: document.getElementById('secretHuntArea'),
    secretFound: document.getElementById('secretFound'),
    huntHint: document.getElementById('huntHint'),
    
    // Final Surprise
    revealSurprise: document.getElementById('revealSurprise'),
    surpriseModal: document.getElementById('surpriseModal'),
    closeModal: document.getElementById('closeModal'),
    
    // Canvas
    sakuraCanvas: document.getElementById('sakuraCanvas'),
    confettiCanvas: document.getElementById('confettiCanvas'),
    kissContainer: document.getElementById('kissContainer')
};

// ===============================================
// INITIALIZATION
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('💖 Valentine Website Initialized for Israt Jahan Payel');
    
    // Setup all features
    setupSakuraAnimation();
    setupAudioControls();
    setupWelcomeScreen();
    setupHeroSection();
    setupQuoteSection();
    setupQuiz();
    setupPhotoCarousel();
    setupCountdown();
    setupSecretHunt();
    setupVoiceMessage();
    setupFinalSurprise();
    setupKissEffect();
    setupSectionNavigation();
    
    // Display initial quote
    displayRandomQuote();
}

// ===============================================
// SECTION NAVIGATION SYSTEM
// ===============================================

function setupSectionNavigation() {
    // Get all next section buttons
    const nextButtons = document.querySelectorAll('.next-section-btn');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextSectionId = button.getAttribute('data-next');
            showSection(nextSectionId);
        });
    });
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (section) {
        // Hide current section with animation
        const currentSection = document.querySelector('.section:not(.hidden-section)');
        if (currentSection && currentSection !== section) {
            currentSection.style.opacity = '0';
            setTimeout(() => {
                currentSection.classList.add('hidden-section');
            }, 300);
        }
        
        // Show next section
        setTimeout(() => {
            section.classList.remove('hidden-section');
            section.style.opacity = '0';
            section.style.visibility = 'visible';
            section.style.height = 'auto';
            
            // Smooth scroll to section
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Fade in
            setTimeout(() => {
                section.style.opacity = '1';
            }, 100);
        }, 400);
    }
}

// ===============================================
// WELCOME SCREEN
// ===============================================

function setupWelcomeScreen() {
    elements.enterWebsite.addEventListener('click', () => {
        // Hide welcome, show hero
        elements.welcomeSection.style.opacity = '0';
        
        setTimeout(() => {
            elements.welcomeSection.style.display = 'none';
            showSection('hero');
        }, 500);
    });
}

// ===============================================
// CHERRY BLOSSOM ANIMATION (CANVAS)
// ===============================================

function setupSakuraAnimation() {
    const canvas = elements.sakuraCanvas;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Sakura petal class
    class Petal {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 15 + 10;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            // Reset if out of bounds
            if (this.y > canvas.height + 20) {
                this.reset();
            }
            
            if (this.x < -20 || this.x > canvas.width + 20) {
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.globalAlpha = this.opacity;
            
            // Draw petal (simplified flower shape)
            ctx.fillStyle = '#ffb3d9';
            ctx.beginPath();
            
            // Five petals
            for (let i = 0; i < 5; i++) {
                const angle = (i * 72) * Math.PI / 180;
                const x = Math.cos(angle) * this.size;
                const y = Math.sin(angle) * this.size;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.quadraticCurveTo(0, 0, x, y);
                }
            }
            
            ctx.closePath();
            ctx.fill();
            
            // Center
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    // Create petals
    const petals = [];
    const petalCount = 25; // Reduced for mobile performance
    
    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
        // Stagger initial positions
        petals[i].y = Math.random() * canvas.height;
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===============================================
// AUDIO CONTROLS
// ===============================================

function setupAudioControls() {
    // Background music toggle
    elements.musicToggle.addEventListener('click', () => {
        if (bgMusicPlaying) {
            elements.bgMusic.pause();
            elements.musicToggle.classList.remove('playing');
            elements.musicToggle.innerHTML = '<span class="music-icon">🔇</span>';
        } else {
            elements.bgMusic.play().catch(e => {
                console.log('Audio play failed:', e);
                alert('⚠️ Please add your background music file to: assets/audio/background-music.mp3');
            });
            elements.musicToggle.classList.add('playing');
            elements.musicToggle.innerHTML = '<span class="music-icon">🎵</span>';
        }
        bgMusicPlaying = !bgMusicPlaying;
    });
    
    // Auto-play music on first user interaction (browser policy compliant)
    const autoPlayMusic = () => {
        if (!bgMusicPlaying) {
            elements.bgMusic.volume = 0;
            elements.bgMusic.play().then(() => {
                // Fade in volume
                let volume = 0;
                const fadeIn = setInterval(() => {
                    if (volume < 0.3) {
                        volume += 0.01;
                        elements.bgMusic.volume = volume;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 100);
                
                bgMusicPlaying = true;
                elements.musicToggle.classList.add('playing');
            }).catch(e => console.log('Auto-play prevented:', e));
        }
        
        // Remove listener after first interaction
        document.removeEventListener('click', autoPlayMusic);
    };
    
    document.addEventListener('click', autoPlayMusic, { once: true });
}

// ===============================================
// HERO SECTION
// ===============================================

function setupHeroSection() {
    elements.startJourney.addEventListener('click', () => {
        showSection('quote-section');
    });
}

// ===============================================
// QUOTE SECTION
// ===============================================

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * ROMANTIC_QUOTES.length);
    const quote = ROMANTIC_QUOTES[randomIndex];
    
    // Fade out
    elements.randomQuote.style.opacity = '0';
    
    setTimeout(() => {
        elements.randomQuote.textContent = quote;
        // Fade in
        elements.randomQuote.style.opacity = '1';
    }, 300);
}

function setupQuoteSection() {
    elements.refreshQuote.addEventListener('click', () => {
        displayRandomQuote();
        
        // Rotate animation
        elements.refreshQuote.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            elements.refreshQuote.style.transform = '';
        }, 600);
    });
}

// ===============================================
// LOVE QUIZ
// ===============================================

function setupQuiz() {
    elements.totalQuestions.textContent = QUIZ_QUESTIONS.length;
    displayQuestion();
}

function displayQuestion() {
    if (currentQuizQuestion >= QUIZ_QUESTIONS.length) {
        showQuizResults();
        return;
    }
    
    const question = QUIZ_QUESTIONS[currentQuizQuestion];
    
    // Update progress
    const progress = ((currentQuizQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.currentQuestion.textContent = currentQuizQuestion + 1;
    
    // Build question HTML
    const questionHTML = `
        <div class="question-card">
            <span class="question-emoji">${question.emoji}</span>
            <h3 class="question-text">${question.question}</h3>
            <div class="answer-options">
                ${question.answers.map((answer, index) => `
                    <button class="answer-btn" data-index="${index}">
                        ${answer}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    elements.quizContent.innerHTML = questionHTML;
    
    // Add event listeners to answer buttons
    const answerButtons = elements.quizContent.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => handleAnswerClick(e, question.correct));
    });
}

function handleAnswerClick(event, correctIndex) {
    const selectedButton = event.target;
    const selectedIndex = parseInt(selectedButton.dataset.index);
    
    // Mark as selected
    selectedButton.classList.add('selected');
    
    // Check if correct
    if (selectedIndex === correctIndex) {
        quizScore++;
    }
    
    // Disable all buttons
    const allButtons = elements.quizContent.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => btn.disabled = true);
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuizQuestion++;
        displayQuestion();
    }, 800);
}

function showQuizResults() {
    // Hide quiz content
    elements.quizContent.style.display = 'none';
    elements.quizResult.classList.remove('hidden');
    
    // Calculate percentage
    const percentage = (quizScore / QUIZ_QUESTIONS.length) * 100;
    
    // Set result content based on score
    let emoji, title, message;
    
    if (percentage === 100) {
        emoji = '🎉';
        title = 'Perfect Score!';
        message = 'Payel, you know us better than anyone! We truly are soulmates! 💕';
    } else if (percentage >= 80) {
        emoji = '🌟';
        title = 'Amazing!';
        message = 'You know us so well! Our connection is incredible! ✨';
    } else if (percentage >= 60) {
        emoji = '💖';
        title = 'Great Job!';
        message = 'You definitely pay attention to the little things! 😊';
    } else {
        emoji = '💕';
        title = 'Not Bad!';
        message = 'We still have so many memories to create together! 🥰';
    }
    
    elements.resultEmoji.textContent = emoji;
    elements.resultTitle.textContent = title;
    elements.resultMessage.textContent = message;
    elements.finalScore.textContent = quizScore;
}

// ===============================================
// PHOTO CAROUSEL
// ===============================================

function setupPhotoCarousel() {
    const slides = elements.carouselTrack.querySelectorAll('.carousel-slide');
    totalPhotos = slides.length;
    
    // Create dots
    for (let i = 0; i < totalPhotos; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        elements.carouselDots.appendChild(dot);
    }
    
    // Navigation buttons
    elements.prevPhoto.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
        updateCarousel();
    });
    
    elements.nextPhoto.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
        updateCarousel();
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    elements.carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    elements.carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next photo
            currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
            updateCarousel();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous photo
            currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
            updateCarousel();
        }
    }
}

function goToSlide(index) {
    currentPhotoIndex = index;
    updateCarousel();
}

function updateCarousel() {
    const slideWidth = elements.carouselTrack.querySelector('.carousel-slide').offsetWidth;
    elements.carouselTrack.style.transform = `translateX(-${currentPhotoIndex * slideWidth}px)`;
    
    // Update dots
    const dots = elements.carouselDots.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPhotoIndex);
    });
    
    // Update slide active state
    const slides = elements.carouselTrack.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentPhotoIndex);
    });
}

// ===============================================
// COUNTDOWN TIMER
// ===============================================

function setupCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const difference = SPECIAL_DATE - now;
    
    if (difference <= 0) {
        // Event has passed
        elements.days.textContent = '00';
        elements.hours.textContent = '00';
        elements.minutes.textContent = '00';
        elements.seconds.textContent = '00';
        elements.countdownMessage.textContent = 'The special day is here! 🎉';
        clearInterval(countdownInterval);
        return;
    }
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update display with leading zeros
    elements.days.textContent = String(days).padStart(2, '0');
    elements.hours.textContent = String(hours).padStart(2, '0');
    elements.minutes.textContent = String(minutes).padStart(2, '0');
    elements.seconds.textContent = String(seconds).padStart(2, '0');
    
    // Update message based on time remaining
    if (days === 0) {
        elements.countdownMessage.textContent = 'The big day is almost here! 💖';
    } else if (days <= 7) {
        elements.countdownMessage.textContent = 'Just days away from something special! ✨';
    } else {
        elements.countdownMessage.textContent = 'Every moment with you is precious ✨';
    }
}

// ===============================================
// SECRET BUTTON HUNT
// ===============================================

function setupSecretHunt() {
    // Position button randomly after a delay
    setTimeout(() => {
        positionSecretButton();
    }, 2000);
    
    // Button click handler
    elements.secretButton.addEventListener('click', () => {
        if (!secretButtonFound) {
            secretButtonFound = true;
            elements.secretButton.style.display = 'none';
            elements.huntHint.style.display = 'none';
            elements.secretFound.classList.remove('hidden');
            
            // Create particle burst effect
            createSecretBurst();
        }
    });
    
    // Touch/mouse movement detection for mobile and desktop
    let repositionTimeout;
    
    function handleMovement(x, y) {
        if (secretButtonFound) return;
        
        const rect = elements.secretButton.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(x - buttonCenterX, 2) + 
            Math.pow(y - buttonCenterY, 2)
        );
        
        // If touch/mouse is close, make button visible
        if (distance < 120) {
            elements.secretButton.classList.add('visible');
            clearTimeout(repositionTimeout);
        } else {
            elements.secretButton.classList.remove('visible');
        }
        
        // Reposition if button hasn't been found in a while
        clearTimeout(repositionTimeout);
        repositionTimeout = setTimeout(() => {
            if (!secretButtonFound && !elements.secretButton.classList.contains('visible')) {
                positionSecretButton();
            }
        }, 5000);
    }
    
    // Mouse movement for desktop
    elements.secretHuntArea.addEventListener('mousemove', (e) => {
        handleMovement(e.clientX, e.clientY);
    });
    
    // Touch movement for mobile
    elements.secretHuntArea.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        handleMovement(touch.clientX, touch.clientY);
    });
}

function positionSecretButton() {
    const area = elements.secretHuntArea.getBoundingClientRect();
    const buttonSize = 70;
    
    const maxX = area.width - buttonSize - 40;
    const maxY = area.height - buttonSize - 40;
    
    const randomX = Math.random() * maxX + 20;
    const randomY = Math.random() * maxY + 20;
    
    elements.secretButton.style.left = `${randomX}px`;
    elements.secretButton.style.top = `${randomY}px`;
}

function createSecretBurst() {
    const burst = document.createElement('div');
    burst.style.position = 'absolute';
    burst.style.left = '50%';
    burst.style.top = '50%';
    burst.style.transform = 'translate(-50%, -50%)';
    burst.style.fontSize = '4rem';
    burst.style.pointerEvents = 'none';
    burst.innerHTML = '🎊🎉✨💖🎊';
    
    elements.secretHuntArea.appendChild(burst);
    
    setTimeout(() => {
        burst.remove();
    }, 2000);
}

// ===============================================
// VOICE MESSAGE
// ===============================================

function setupVoiceMessage() {
    elements.playVoiceBtn.addEventListener('click', () => {
        if (voicePlaying) {
            elements.voiceMessage.pause();
            elements.voiceMessage.currentTime = 0;
            voicePlaying = false;
            elements.playVoiceBtn.classList.remove('playing');
            elements.playVoiceBtn.innerHTML = '<span class="play-icon">▶</span><span class="play-text">Play My Message</span>';
            elements.voiceVisualizer.classList.remove('playing');
        } else {
            elements.voiceMessage.play().catch(e => {
                console.log('Voice message play failed:', e);
                alert('⚠️ Please add your voice message file to: assets/audio/voice-message.mp3');
            });
            voicePlaying = true;
            elements.playVoiceBtn.classList.add('playing');
            elements.playVoiceBtn.innerHTML = '<span class="play-icon">⏸</span><span class="play-text">Pause Message</span>';
            elements.voiceVisualizer.classList.add('playing');
        }
    });
    
    // Reset when audio ends
    elements.voiceMessage.addEventListener('ended', () => {
        voicePlaying = false;
        elements.playVoiceBtn.classList.remove('playing');
        elements.playVoiceBtn.innerHTML = '<span class="play-icon">▶</span><span class="play-text">Play Again</span>';
        elements.voiceVisualizer.classList.remove('playing');
    });
}

// ===============================================
// FINAL SURPRISE MODAL
// ===============================================

function setupFinalSurprise() {
    elements.revealSurprise.addEventListener('click', () => {
        showSurpriseModal();
    });
    
    elements.closeModal.addEventListener('click', () => {
        hideSurpriseModal();
    });
    
    // Close on overlay click
    elements.surpriseModal.querySelector('.modal-overlay').addEventListener('click', () => {
        hideSurpriseModal();
    });
}

function showSurpriseModal() {
    elements.surpriseModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Trigger confetti
    setTimeout(() => {
        createConfetti();
    }, 500);
    
    // Increase background music volume slightly
    if (bgMusicPlaying && elements.bgMusic.volume < 0.5) {
        let currentVolume = elements.bgMusic.volume;
        const volumeIncrease = setInterval(() => {
            if (currentVolume < 0.5) {
                currentVolume += 0.02;
                elements.bgMusic.volume = Math.min(currentVolume, 0.5);
            } else {
                clearInterval(volumeIncrease);
            }
        }, 100);
    }
}

function hideSurpriseModal() {
    elements.surpriseModal.classList.add('hidden');
    document.body.style.overflow = '';
    elements.confettiCanvas.style.display = 'none';
}

// ===============================================
// CONFETTI ANIMATION
// ===============================================

function createConfetti() {
    const canvas = elements.confettiCanvas;
    const ctx = canvas.getContext('2d');
    
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiColors = ['#ff6b9d', '#c06c84', '#f67280', '#ffd6e8', '#ffb3d9'];
    const confettiPieces = [];
    const confettiCount = 150;
    
    class ConfettiPiece {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 10 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height + 20) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    
    let animationFrameId;
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        animationFrameId = requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
    
    // Stop after 10 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 10000);
}

// ===============================================
// KISS EFFECT (Click anywhere on page)
// ===============================================

function setupKissEffect() {
    document.body.addEventListener('click', (e) => {
        // Don't create kiss marks on button clicks
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }
        
        createKissMark(e.clientX, e.clientY);
    });
    
    // Touch support for mobile
    document.body.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }
        
        const touch = e.touches[0];
        createKissMark(touch.clientX, touch.clientY);
    });
}

function createKissMark(x, y) {
    const kiss = document.createElement('div');
    kiss.classList.add('kiss-mark');
    kiss.textContent = '💋';
    kiss.style.left = `${x}px`;
    kiss.style.top = `${y}px`;
    
    elements.kissContainer.appendChild(kiss);
    
    // Remove after animation
    setTimeout(() => {
        kiss.remove();
    }, 1500);
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===============================================
// RESPONSIVE HANDLERS
// ===============================================

window.addEventListener('resize', debounce(() => {
    updateCarousel();
}, 250));

// ===============================================
// CONSOLE MESSAGE
// ===============================================

console.log(`
%c💖 Valentine's Day Special Website 💖
%cMade with love for Israt Jahan Payel
%cVersion: 2026 Enhanced Mobile Edition
`, 
'color: #ff6b9d; font-size: 24px; font-weight: bold;',
'color: #c06c84; font-size: 16px;',
'color: #f67280; font-size: 12px;'
);