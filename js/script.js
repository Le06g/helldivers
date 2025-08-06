// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const year = new Date().getFullYear();
    document.querySelectorAll('footer p:first-child').forEach(el => {
        el.textContent = el.textContent.replace('2023', year);
    });

    // Contact form submission
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents page reload
    
        // Get form data
        const name = event.target.name.value;
        const email = event.target.email.value;
        const message = event.target.message.value;
    
        // Log to console
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);
    });
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message to Super Earth Command. A recruitment officer will contact you soon.');
            this.reset();
        });
    }
    

    // War page specific functionality
    if (document.getElementById('galaxy-map')) {
        initializeWarMap();
        updateWarStats();
    }

    // Update time on war page
    if (document.getElementById('update-time')) {
        updateTime();
        setInterval(updateTime, 60000); // Update every minute
    }
});

function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('update-time').textContent = now.toLocaleDateString('en-US', options);
}

function initializeWarMap() {
    const galaxyMap = document.getElementById('galaxy-map');
    
    // Clear any existing content
    galaxyMap.innerHTML = '';
    
    // Create planets
    const planetNames = [
        'Super Earth', 'Angel\'s Venture', 'Crimson Shore', 'Iron Reach', 'Frozen Wastes',
        'Terminus', 'Helios', 'Draco', 'Orion', 'Pegasus',
        'Andromeda', 'Cygnus', 'Lyra', 'Vega', 'Sirius',
        'Tarsus', 'Kestrel', 'Phoenix', 'Raven', 'Hawk',
        'Vanguard', 'Sentinel', 'Patrol', 'Watch', 'Guard'
    ];
    
    const factions = ['super-earth', 'terminid', 'automaton', 'illuminate', 'contested'];
    
    for (let i = 0; i < 25; i++) {
        const planet = document.createElement('div');
        planet.className = 'planet';
        
        // Randomly assign a faction (Super Earth is always first planet)
        if (i === 0) {
            planet.classList.add('super-earth');
        } else {
            const factionIndex = Math.floor(Math.random() * factions.length);
            planet.classList.add(factions[factionIndex]);
        }
        
        // Add planet name as tooltip
        planet.setAttribute('title', planetNames[i]);
        
        // Add small label for Super Earth
        if (i === 0) {
            const label = document.createElement('span');
            label.textContent = 'SE';
            label.style.fontSize = '0.7rem';
            label.style.fontWeight = 'bold';
            planet.appendChild(label);
        }
        
        galaxyMap.appendChild(planet);
    }
    
    // Add click event to planets
    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('click', function() {
            const planetName = this.getAttribute('title');
            alert(`Selected planet: ${planetName}\nStatus: ${this.classList[1].replace('-', ' ')}`);
        });
    });
}

function updateWarStats() {
    // Simulate changing war stats
    const activeDivers = document.getElementById('active-divers');
    const liberated = document.getElementById('liberated');
    const eliminated = document.getElementById('eliminated');
    const stratagems = document.getElementById('stratagems');
    
    if (activeDivers) {
        // Randomize numbers slightly for realism
        const baseDivers = 1245678;
        const randomFactor = Math.floor(Math.random() * 10000) - 5000;
        activeDivers.textContent = (baseDivers + randomFactor).toLocaleString();
    }
    
    if (liberated) {
        const baseLiberated = 347;
        const randomChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        liberated.textContent = (baseLiberated + randomChange).toLocaleString();
    }
    
    if (eliminated) {
        const baseEliminated = 12894231455;
        const randomAdd = Math.floor(Math.random() * 1000000);
        eliminated.textContent = (baseEliminated + randomAdd).toLocaleString();
    }
    
    if (stratagems) {
        const baseStratagems = 89456123;
        const randomAdd = Math.floor(Math.random() * 10000);
        stratagems.textContent = (baseStratagems + randomAdd).toLocaleString();
    }
    
    // Update progress bar (simulate progress)
    const progressBar = document.getElementById('order-progress');
    if (progressBar) {
        const currentWidth = parseInt(progressBar.style.width) || 42;
        const randomChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        let newWidth = currentWidth + randomChange;
        
        // Keep between 0 and 100
        newWidth = Math.max(0, Math.min(100, newWidth));
        
        progressBar.style.width = `${newWidth}%`;
        document.getElementById('progress-text').textContent = `${newWidth}% Complete`;
    }
    
    // Update time remaining
    const timeRemaining = document.getElementById('time-remaining');
    if (timeRemaining) {
        const parts = timeRemaining.textContent.split(' ');
        let days = parseInt(parts[0]);
        let hours = parseInt(parts[1]);
        let minutes = parseInt(parts[2]);
        
        // Decrement time
        minutes -= 1;
        if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
                hours = 23;
                days -= 1;
            }
        }
        
        // Update display
        timeRemaining.textContent = `${days}d ${hours}h ${minutes}m`;
    }
    
    // Update every 5 seconds for demo purposes
    setTimeout(updateWarStats, 5000);
}