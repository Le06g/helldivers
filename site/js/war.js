document.addEventListener('DOMContentLoaded', function() {
    // Initialize war page
    initializeWarPage();
    
    // Set up auto-updating
    setInterval(updateWarData, 5000);
});

function initializeWarPage() {
    // Set initial time
    updateTime();
    
    // Set up map interactions
    setupMapControls();
    
    // Initialize system tooltips
    initializeSystemTooltips();
    
    // Set up auto-updating stats
    updateWarData();
}

function updateTime() {
    const now = new Date();
    const options = { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('update-time').textContent = now.toLocaleDateString('en-US', options) + ' ' + now.toLocaleTimeString('en-US', options);
}

function setupMapControls() {
    // Zoom buttons
    document.querySelector('.zoom-in').addEventListener('click', function() {
        const map = document.querySelector('.galaxy-map');
        const currentScale = parseFloat(map.style.transform.replace('scale(', '').replace(')', '')) || 1;
        map.style.transform = `scale(${Math.min(currentScale + 0.1, 2)})`;
    });
    
    document.querySelector('.zoom-out').addEventListener('click', function() {
        const map = document.querySelector('.galaxy-map');
        const currentScale = parseFloat(map.style.transform.replace('scale(', '').replace(')', '')) || 1;
        map.style.transform = `scale(${Math.max(currentScale - 0.1, 0.5)})`;
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter systems
            document.querySelectorAll('.system').forEach(system => {
                if (filter === 'all' || system.classList.contains(filter)) {
                    system.style.display = 'block';
                } else {
                    system.style.display = 'none';
                }
            });
        });
    });
}

function initializeSystemTooltips() {
    // Add click handlers to all systems
    document.querySelectorAll('.system').forEach(system => {
        system.addEventListener('click', function() {
            const systemName = this.dataset.name;
            const systemStatus = Array.from(this.classList)
                .filter(c => c !== 'system')
                .map(c => c.toUpperCase())
                .join(' ');
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'system-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>${systemName}</h3>
                    <p>Status: ${systemStatus}</p>
                    <p>Liberation: ${Math.floor(Math.random() * 100)}%</p>
                    <p>Active Helldivers: ${Math.floor(Math.random() * 5000) + 1000}</p>
                    <button class="close-modal">CLOSE</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close button
            modal.querySelector('.close-modal').addEventListener('click', function() {
                modal.remove();
            });
        });
    });
}

function updateWarData() {
    // Update time
    updateTime();
    
    // Randomize stats slightly for realism
    updateStat('active-divers', 1287456, 10000);
    updateStat('casualties', 4567891, 5000);
    updateStat('missions', 8245678, 10000);
    updateStat('kills', 14892345671, 10000000);
    
    // Update liberation progress
    const progressBar = document.querySelector('.progress-fill');
    const currentProgress = parseFloat(progressBar.style.width) || 47;
    const randomChange = (Math.random() * 2) - 1; // -1 to 1
    let newProgress = currentProgress + randomChange;
    
    // Keep between 0 and 100
    newProgress = Math.max(0, Math.min(100, newProgress));
    
    progressBar.style.width = `${newProgress}%`;
    document.querySelector('.progress-percent').textContent = `${Math.round(newProgress)}%`;
    
    // Update time remaining
    const timeElement = document.querySelector('.time-value');
    const parts = timeElement.textContent.split(' ');
    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[2]);
    
    minutes -= 1;
    if (minutes < 0) {
        minutes = 59;
        hours -= 1;
    }
    
    timeElement.textContent = `${hours}h ${minutes}m`;
    
    // Randomly change some system statuses
    if (Math.random() > 0.7) {
        const systems = document.querySelectorAll('.system');
        const randomSystem = systems[Math.floor(Math.random() * systems.length)];
        
        const factions = ['super-earth', 'terminid', 'automaton', 'illuminate', 'contested'];
        const currentFaction = Array.from(randomSystem.classList)
            .filter(c => c !== 'system' && c !== 'system-status')[0];
        
        let newFaction;
        do {
            newFaction = factions[Math.floor(Math.random() * factions.length)];
        } while (newFaction === currentFaction);
        
        randomSystem.classList.remove(currentFaction);
        randomSystem.classList.add(newFaction);
    }
}

function updateStat(elementId, baseValue, maxChange) {
    const element = document.getElementById(elementId);
    if (element) {
        const randomChange = Math.floor(Math.random() * maxChange * 2) - maxChange;
        const newValue = baseValue + randomChange;
        element.textContent = newValue.toLocaleString();
    }
}

// Add modal styles dynamically
const style = document.createElement('style');
style.textContent = `
.system-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.system-modal .modal-content {
    background-color: var(--secondary);
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    border-left: 5px solid var(--primary);
}

.system-modal h3 {
    color: var(--primary);
    margin-bottom: 1rem;
}

.system-modal p {
    margin-bottom: 0.5rem;
}

.system-modal .close-modal {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.system-modal .close-modal:hover {
    background-color: #c1121f;
}
`;
document.head.appendChild(style);