document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('custom-alert');
    const closeButton = document.querySelector('.close-button');
    const alertMessage = document.getElementById('alert-message');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const revealEmailBtn = document.getElementById('revealEmailBtn');
    const emailDisplay = document.getElementById('emailDisplay');
    const dateTimeElement = document.getElementById('date-time');

    function showModal(message) {
        alertMessage.textContent = message;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    showModal('Thank you for your message! I will get back to you shortly.');
                    contactForm.reset();
                } else {
                    showModal('There was a problem with your submission. Please try again.');
                }
            } catch (error) {
                showModal('There was a problem with your submission. Please try again.');
            }
        });
    }

    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('mouseover', () => {
            image.style.transform = 'scale(1.05)';
        });
        image.addEventListener('mouseout', () => {
            image.style.transform = 'scale(1)';
        });
    });

    // Scroll to top button functionality
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    revealEmailBtn.addEventListener('click', () => {
        emailDisplay.style.display = 'block';
        revealEmailBtn.style.display = 'none'; // Hide the button after revealing the email
    });

    function updateDateTime() {
        const now = new Date();
        const formattedDateTime = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        dateTimeElement.textContent = `Current Date and Time: ${formattedDateTime}`;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    // === WAPH Code Experiments ===

    // 1. JokeAPI
    async function fetchJoke() {
        try {
            const res = await fetch("https://v2.jokeapi.dev/joke/Any?format=txt");
            const joke = await res.text();
            const jokeDisplay = document.getElementById("jokeDisplay");
            if (jokeDisplay) jokeDisplay.textContent = joke;
        } catch {
            const jokeDisplay = document.getElementById("jokeDisplay");
            if (jokeDisplay) jokeDisplay.textContent = "Failed to load joke.";
        }
    }
    fetchJoke();
    setInterval(fetchJoke, 60000);

    // 2. Weatherbit API (replace YOUR_API_KEY)
    async function fetchWeather() {
        try {
            const response = await fetch("https://api.weatherbit.io/v2.0/current?city=Dayton&country=US&key=3e06a630aae04d4d9d41ee93fa947a7c");
            const data = await response.json();
            const temp = data.data[0].temp;
            const desc = data.data[0].weather.description;
            const weatherDisplay = document.getElementById("weatherDisplay");
            if (weatherDisplay) {
                weatherDisplay.textContent = `It’s ${temp}°C with ${desc}.`;
            }
        } catch {
            const weatherDisplay = document.getElementById("weatherDisplay");
            if (weatherDisplay) {
                weatherDisplay.textContent = "Could not load weather data.";
            }
        }
    }
    fetchWeather();

    // 3. Visitor Cookie Greeting
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 86400000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }

    function getCookie(name) {
        const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return match ? match.pop() : null;
    }

    function showGreeting() {
        const greetingEl = document.getElementById("greetingMessage");
        if (!greetingEl) return;

        const lastVisit = getCookie("lastVisit");
        const now = new Date().toLocaleString();

        if (!lastVisit) {
            greetingEl.textContent = "Welcome to my homepage!";
        } else {
            greetingEl.textContent = `Welcome back! Your last visit was ${lastVisit}`;
        }

        setCookie("lastVisit", now, 365);
    }
    showGreeting();
});
