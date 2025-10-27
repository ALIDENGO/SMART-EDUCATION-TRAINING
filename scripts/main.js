/**
 * Smart Education Training - Interactive Screens
 * Main JavaScript file for handling interactions
 */

// ===================================
// Global State Management
// ===================================
const AppState = {
    currentScreen: 'home',
    quizAnswers: [],
    currentQuestion: 0,
    touchFeedbackEnabled: true
};

// ===================================
// DOM Ready
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===================================
// App Initialization
// ===================================
function initializeApp() {
    console.log('Smart Education Training - Initializing...');
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize touch feedback
    initializeTouchFeedback();
    
    // Initialize screen interactions
    initializeHomeScreen();
    initializeLessonsScreen();
    initializeExercisesScreen();
    initializeQuizScreen();
    initializeResourcesScreen();
    
    console.log('App initialized successfully!');
}

// ===================================
// Navigation System
// ===================================
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const screenId = this.getAttribute('data-screen');
            switchScreen(screenId);
        });
    });
}

function switchScreen(screenId) {
    // Update active screen
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        AppState.currentScreen = screenId;
    }
    
    // Update active navigation button
    const allNavButtons = document.querySelectorAll('.nav-btn');
    allNavButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeNavButton = document.querySelector(`[data-screen="${screenId}"]`);
    if (activeNavButton) {
        activeNavButton.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Touch Feedback System
// ===================================
function initializeTouchFeedback() {
    const touchFeedback = document.getElementById('touch-feedback');
    
    // Add click/touch feedback to all interactive elements
    document.addEventListener('click', function(e) {
        if (!AppState.touchFeedbackEnabled) return;
        
        const target = e.target.closest('.interactive, button');
        if (target) {
            showTouchFeedback(e.clientX, e.clientY);
        }
    });
    
    // Touch events for mobile
    document.addEventListener('touchstart', function(e) {
        if (!AppState.touchFeedbackEnabled || !e.touches[0]) return;
        
        const target = e.target.closest('.interactive, button');
        if (target) {
            showTouchFeedback(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
}

function showTouchFeedback(x, y) {
    const feedback = document.getElementById('touch-feedback');
    if (!feedback) return;
    
    feedback.style.left = x + 'px';
    feedback.style.top = y + 'px';
    feedback.classList.add('active');
    
    setTimeout(() => {
        feedback.classList.remove('active');
    }, 300);
}

// ===================================
// Home Screen Interactions
// ===================================
function initializeHomeScreen() {
    const welcomeCards = document.querySelectorAll('#home-screen .welcome-card');
    
    welcomeCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleHomeAction(action);
        });
    });
}

function handleHomeAction(action) {
    switch(action) {
        case 'start-lesson':
            switchScreen('lessons');
            break;
        case 'practice':
            switchScreen('exercises');
            break;
        case 'test':
            switchScreen('quiz');
            break;
        case 'explore':
            switchScreen('resources');
            break;
    }
}

// ===================================
// Lessons Screen Interactions
// ===================================
function initializeLessonsScreen() {
    const lessonCards = document.querySelectorAll('.lesson-card');
    
    lessonCards.forEach(card => {
        card.addEventListener('click', function() {
            const lesson = this.getAttribute('data-lesson');
            openLesson(lesson);
        });
    });
}

function openLesson(lessonId) {
    console.log(`Opening lesson: ${lessonId}`);
    
    // Show notification
    showNotification(`Ouverture de la leçon: ${lessonId}`, 'info');
    
    // In a real app, this would load the lesson content
    // For now, we'll just show a message
}

// ===================================
// Exercises Screen Interactions
// ===================================
function initializeExercisesScreen() {
    const exerciseButtons = document.querySelectorAll('#exercises-screen .btn-primary');
    
    exerciseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exerciseItem = this.closest('.exercise-item');
            const exerciseTitle = exerciseItem.querySelector('h3').textContent;
            startExercise(exerciseTitle);
        });
    });
}

function startExercise(exerciseTitle) {
    console.log(`Starting exercise: ${exerciseTitle}`);
    showNotification(`Démarrage de: ${exerciseTitle}`, 'success');
}

// ===================================
// Quiz Screen Interactions
// ===================================
function initializeQuizScreen() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    
    // Quiz option selection
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            quizOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store answer
            const answer = this.getAttribute('data-answer');
            AppState.quizAnswers[AppState.currentQuestion] = answer;
            
            console.log(`Selected answer: ${answer}`);
        });
    });
    
    // Navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => navigateQuiz(-1));
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => navigateQuiz(1));
    }
}

function navigateQuiz(direction) {
    const newQuestion = AppState.currentQuestion + direction;
    
    if (newQuestion >= 0 && newQuestion < 10) {
        AppState.currentQuestion = newQuestion;
        console.log(`Navigating to question ${newQuestion + 1}`);
        
        // Update question counter
        const counter = document.querySelector('.question-counter');
        if (counter) {
            counter.textContent = `${newQuestion + 1} / 10`;
        }
        
        showNotification(`Question ${newQuestion + 1} de 10`, 'info');
    }
}

// ===================================
// Resources Screen Interactions
// ===================================
function initializeResourcesScreen() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('click', function() {
            const resourceType = this.querySelector('h3').textContent;
            openResource(resourceType);
        });
    });
}

function openResource(resourceType) {
    console.log(`Opening resource: ${resourceType}`);
    showNotification(`Accès à: ${resourceType}`, 'info');
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#50C878' : type === 'info' ? '#4A90E2' : '#F5A623',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===================================
// Utility Functions
// ===================================

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Keyboard Navigation Support
// ===================================
document.addEventListener('keydown', function(e) {
    // Arrow keys for quiz navigation
    if (AppState.currentScreen === 'quiz') {
        if (e.key === 'ArrowLeft') {
            navigateQuiz(-1);
        } else if (e.key === 'ArrowRight') {
            navigateQuiz(1);
        }
    }
    
    // Number keys for screen navigation (1-5)
    if (e.key >= '1' && e.key <= '5') {
        const screens = ['home', 'lessons', 'exercises', 'quiz', 'resources'];
        const screenIndex = parseInt(e.key) - 1;
        if (screens[screenIndex]) {
            switchScreen(screens[screenIndex]);
        }
    }
});

// ===================================
// Export for testing (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        switchScreen,
        showNotification,
        navigateQuiz
    };
}

console.log('Smart Education Training - Scripts loaded successfully!');
