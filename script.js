// DOM Elements
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.querySelector('.main-nav');

// Mobile Menu Toggle
/* @tweakable mobile menu toggle behavior */
const mobileMenuSettings = {
    slideInDuration: 300,
    slideInEasing: 'ease-in-out'
};

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (mainNav.style.display === 'flex') {
            mainNav.style.display = 'none';
        } else {
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'column';
            mainNav.style.position = 'absolute';
            mainNav.style.top = '100%';
            mainNav.style.left = '0';
            mainNav.style.width = '100%';
            mainNav.style.backgroundColor = 'white';
            mainNav.style.padding = '1rem';
            mainNav.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            
            // Adjust navigation items for mobile
            const navList = mainNav.querySelector('.nav-list');
            navList.style.flexDirection = 'column';
            navList.style.width = '100%';
            
            // Adjust dropdowns for mobile
            const dropdowns = mainNav.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('click', function(e) {
                    const dropdownContent = this.querySelector('.dropdown-content');
                    
                    if (dropdownContent.style.display === 'block') {
                        dropdownContent.style.display = 'none';
                    } else {
                        // Hide all other dropdown contents
                        document.querySelectorAll('.dropdown-content').forEach(content => {
                            content.style.display = 'none';
                        });
                        
                        // Show this dropdown content
                        dropdownContent.style.display = 'block';
                        dropdownContent.style.position = 'static';
                        dropdownContent.style.boxShadow = 'none';
                        dropdownContent.style.opacity = '1';
                        dropdownContent.style.visibility = 'visible';
                        dropdownContent.style.transform = 'none';
                    }
                    
                    // Prevent the click from navigating (for the parent links)
                    e.preventDefault();
                });
            });
        }
    });
}

// Search Toggle
if (searchToggle && searchOverlay && searchClose) {
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        setTimeout(() => {
            const searchInput = searchOverlay.querySelector('.search-input');
            if (searchInput) searchInput.focus();
        }, 100);
    });
    
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close search with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip for dropdown toggles or links that don't point to an ID
        if (href === '#' || !document.querySelector(href)) {
            return;
        }
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
        });
    });
});

// Animated Wave Effects on Scroll
/* @tweakable wave animation properties */
const waveSettings = {
    amplitude: 20,
    frequency: 0.05,
    speed: 0.1
};

function animateWavesOnScroll() {
    const waves = document.querySelectorAll('.wave-separator svg path');
    
    waves.forEach(wave => {
        const initialD = wave.getAttribute('d');
        
        window.addEventListener('scroll', () => {
            const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            
            // Simple wave distortion based on scroll
            const distortion = Math.sin(scrollPercentage * Math.PI * 2) * waveSettings.amplitude;
            
            // Apply distortion to middle control points of the path
            // This is simplified and would need to be adapted to your specific path structure
            const parts = initialD.split(' ');
            if (parts.length > 5) {
                parts[1] = (parseInt(parts[1]) + distortion).toString();
                wave.setAttribute('d', parts.join(' '));
            }
        });
    });
}

// Only initialize complex animations if not on mobile
if (window.innerWidth > 768) {
    // animateWavesOnScroll(); // Uncomment if you want to enable this effect
}

// Filter functionality for starters section
const filterButtons = document.querySelectorAll('.filter-button');
const starterCards = document.querySelectorAll('.starter-card');

/* @tweakable filter animation settings */
const filterAnimationSettings = {
    fadeOutDuration: 200,
    fadeInDuration: 300,
    easing: 'ease-in-out'
};

if (filterButtons.length && starterCards.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            starterCards.forEach(card => {
                const categories = card.getAttribute('data-categories').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    // Show card with animation
                    card.style.opacity = '0';
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.transition = `opacity ${filterAnimationSettings.fadeInDuration}ms ${filterAnimationSettings.easing}`;
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    // Hide card with animation
                    card.style.transition = `opacity ${filterAnimationSettings.fadeOutDuration}ms ${filterAnimationSettings.easing}`;
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, filterAnimationSettings.fadeOutDuration);
                }
            });
        });
    });
}

// Intersection Observer for Fade-In Animations
const fadeInElementsWithStarters = document.querySelectorAll('.section-header, .tool-card, .prompt-card, .community-feature, .news-card, .starter-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Set initial styles and observe elements
fadeInElementsWithStarters.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// Handle newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // This would be replaced with your actual newsletter subscription logic
            alert(`Thank you for subscribing with: ${email}`);
            emailInput.value = '';
        }
    });
}

// AI Chatbot Functionality
/* @tweakable chatbot appearance and behavior settings */
const chatbotSettings = {
    initialGreeting: "Hi there! I'm your vibe coding assistant. Ask me anything about AI-powered coding, tools like Cursor, prompting techniques, or how to get started!",
    responseDelay: 1000, // milliseconds to simulate "thinking"
    maxMessages: 100, // maximum number of messages to store
    avatarBgColor: "#9013FE",
    userBubbleColor: "#4A90E2",
    botBubbleColor: "#f8f9fa",
    typingIndicatorText: "AI assistant is typing..."
};

// Initialize chat functionality
const chatMessages = document.getElementById('chatMessages');
const userMessageInput = document.getElementById('userMessage');
const sendMessageButton = document.getElementById('sendMessage');

let conversationHistory = [];

// Add event listeners if elements exist
if (userMessageInput && sendMessageButton && chatMessages) {
    // Send message when button is clicked
    sendMessageButton.addEventListener('click', () => {
        sendUserMessage();
    });
    
    // Send message when Enter key is pressed in input field
    userMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
}

// Function to send user message
async function sendUserMessage() {
    const userMessage = userMessageInput.value.trim();
    
    if (userMessage === '') return;
    
    // Add user message to chat
    addMessageToChat('user', userMessage);
    
    // Clear input field
    userMessageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process with AI and get response
    try {
        const aiResponse = await getAIResponse(userMessage);
        
        // Remove typing indicator after delay
        setTimeout(() => {
            removeTypingIndicator();
            
            // Add AI response to chat
            addMessageToChat('bot', aiResponse);
            
            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, chatbotSettings.responseDelay);
    } catch (error) {
        console.error('Error getting AI response:', error);
        removeTypingIndicator();
        addMessageToChat('bot', "I'm sorry, I encountered an error processing your request. Please try again later.");
    }
}

// Function to add message to chat
function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(sender);
    
    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    
    if (sender === 'bot') {
        avatar.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="20" fill="${chatbotSettings.avatarBgColor}"/>
                <path d="M15,15 Q20,10 25,15 L25,25 Q20,30 15,25 Z" fill="#ffffff"/>
            </svg>
        `;
    } else {
        avatar.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="20" fill="${chatbotSettings.userBubbleColor}"/>
                <path d="M20,15 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M10,25 Q20,35 30,25 Q30,35 20,30 Q10,35 10,25" fill="#ffffff"/>
            </svg>
        `;
    }
    
    const content = document.createElement('div');
    content.classList.add('message-content');
    content.innerHTML = `<p>${message}</p>`;
    
    messageElement.appendChild(avatar);
    messageElement.appendChild(content);
    
    chatMessages.appendChild(messageElement);
    
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('chat-message', 'bot', 'typing-indicator');
    
    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    avatar.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="${chatbotSettings.avatarBgColor}"/>
            <path d="M15,15 Q20,10 25,15 L25,25 Q20,30 15,25 Z" fill="#ffffff"/>
        </svg>
    `;
    
    const content = document.createElement('div');
    content.classList.add('message-content');
    content.innerHTML = `<p>${chatbotSettings.typingIndicatorText}</p>`;
    
    typingElement.appendChild(avatar);
    typingElement.appendChild(content);
    
    chatMessages.appendChild(typingElement);
    
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to get AI response
async function getAIResponse(userMessage) {
    // Add the user message to conversation history
    const newMessage = {
        role: "user",
        content: userMessage,
    };
    conversationHistory.push(newMessage);
    
    // Only keep the last 10 messages to prevent context overflow
    conversationHistory = conversationHistory.slice(-10);
    
    try {
        // Call the AI model
        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a friendly and knowledgeable assistant specializing in vibe coding - the practice of using AI tools to generate code from natural language prompts. You provide helpful, concise answers about AI coding tools (especially Cursor, Claude, and Replit), prompting techniques, and the benefits and challenges of vibe coding. Keep responses under 3 sentences when possible. Always be accurate but optimistic about the potential of AI-powered coding."
                },
                ...conversationHistory,
            ],
        });
        
        const response = completion.content;
        
        // Add the AI response to conversation history
        conversationHistory.push({
            role: "assistant",
            content: response
        });
        
        return response;
    } catch (error) {
        console.error('Error getting AI response:', error);
        return "I'm sorry, I encountered an error. Please try again later.";
    }
}

// Initialize with greeting if chat exists
if (chatMessages) {
    // Wait for DOM to be fully loaded
    window.addEventListener('DOMContentLoaded', () => {
        // Add the initial greeting
        setTimeout(() => {
            const initialGreeting = chatbotSettings.initialGreeting;
            const initialMessage = {
                role: "assistant",
                content: initialGreeting
            };
            conversationHistory.push(initialMessage);
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Tool directory category filtering
    const toolCards = document.querySelectorAll('.tool-card');
    const filterButtons = document.querySelectorAll('.filter-button');
    const toolSearch = document.getElementById('toolSearch');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the filter group and reset active state for all buttons in that group
                const parentGroup = this.closest('.button-group');
                if (parentGroup) {
                    parentGroup.querySelectorAll('.filter-button').forEach(btn => {
                        btn.classList.remove('active');
                    });
                }
                
                // Set this button as active
                this.classList.add('active');
                
                // Apply filters from all active buttons
                applyFilters();
            });
        });
    }
    
    // Tool search functionality
    if (toolSearch) {
        toolSearch.addEventListener('input', function() {
            applyFilters();
        });
    }
    
    function applyFilters() {
        // Get active category and price filters
        const activeCategory = document.querySelector('.filter-group:first-child .button-group .filter-button.active');
        const activePrice = document.querySelector('.filter-group:nth-child(2) .button-group .filter-button.active');
        const searchTerm = toolSearch ? toolSearch.value.toLowerCase() : '';
        
        const categoryFilter = activeCategory ? activeCategory.getAttribute('data-filter') : 'all';
        const priceFilter = activePrice ? activePrice.getAttribute('data-filter') : 'all';
        
        // Apply filters to tool cards
        toolCards.forEach(card => {
            const categories = card.getAttribute('data-categories').split(' ');
            const nameElement = card.querySelector('h3');
            const descriptionElement = card.querySelector('.tool-description');
            
            // Check if card matches search term
            const name = nameElement ? nameElement.textContent.toLowerCase() : '';
            const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';
            const matchesSearch = searchTerm === '' || 
                name.includes(searchTerm) || 
                description.includes(searchTerm);
            
            // Check if card matches category filter
            const matchesCategory = categoryFilter === 'all' || categories.includes(categoryFilter);
            
            // Check if card matches price filter
            const matchesPrice = priceFilter === 'all' || categories.includes(priceFilter);
            
            // Show/hide based on all filters
            if (matchesSearch && matchesCategory && matchesPrice) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    /* @tweakable animation settings for filtering */
    const filterAnimationOptions = {
        duration: 300,
        easing: 'ease-in-out',
        fadeDelay: 50
    };
    
    // Smooth scrolling for anchor links on page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip for dropdown toggles or invalid anchors
            if (targetId === '#' || !document.querySelector(targetId)) {
                return;
            }
            
            e.preventDefault();
            
            /* @tweakable scroll behavior */
            const scrollOptions = {
                offset: 80, // Header height offset
                behavior: 'smooth',
                duration: 800
            };
            
            const targetElement = document.querySelector(targetId);
            const headerOffset = scrollOptions.offset;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: scrollOptions.behavior
            });
        });
    });
    
    // Animated entrance for content sections
    const fadeInElements = document.querySelectorAll('.content-section .section-header, .tool-card, .starter-card, .concept-card, .tutorial-card, .review-card, .comparison-table-container, .figure-card');
    
    /* @tweakable entrance animation settings */
    const entranceAnimationOptions = {
        threshold: 0.15,
        baseDelay: 50,
        staggerDelay: 100,
        translateY: 30
    };
    
    // Set initial styles
    fadeInElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = `translateY(${entranceAnimationOptions.translateY}px)`;
        element.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    });
    
    // Observe elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, entranceAnimationOptions.baseDelay + (index * entranceAnimationOptions.staggerDelay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: entranceAnimationOptions.threshold
    });
    
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});