const buildings = {
    "Main-Building": {
        name: "Main Building",
        rooms: [
            { name: "Room 101 - Principal's Office", floor: 1, image: "IMG_1910.jpg" },
            { name: "Room 102 - Admin Office", floor: 1, image: "room102.jpg" },
            { name: "Room 201 - Classroom A", floor: 2, image: "room201.jpg" },
            { name: "Room 202 - Classroom B", floor: 2, image: "room202.jpg" },
            { name: "Room 301 - Faculty Room", floor: 3, image: "room301.jpg" }
        ]
    },
    "MRM-Building": {
        name: "MRM Building",
        rooms: [
            { name: "Physics Lab", floor: 1 },
            { name: "Math Room", image: "mrm.png", floor: 1 },
            { name: "Chemistry Lab", floor: 1 },
            { name: "Biology Lab", floor: 2 },
            { name: "Prep Room", floor: 2 }
        ]
    },
    "ARM-Building": {
        name: "ARM Building",
        rooms: [
            { name: "Reading Area", floor: 1 },
            { name: "Computer Lab", floor: 1 },
            { name: "Study Rooms", floor: 2 },
            { name: "Archives", floor: 2 }
        ]
    },
    "Cover-Court": {
        name: "Cover Court",
        rooms: [
            { name: "Main Court", floor: 1 },
            { name: "Bleachers", floor: 1 },
            { name: "Comfore-Room", floor: 1 }
        ]
    },
    "ERM-Building": {
        name: "ERM Building",
        rooms: [
            { name: "Comfort-Room", floor: 1 },
            { name: "Room 101", floor: 1 },
            { name: "Room 102", floor: 1 },
            { name: "Room 103", floor: 1 },
            { name: "Room 104", floor: 1 },
            { name: "Room 105", floor: 1 },
            { name: "Room 201", floor: 2 },
            { name: "Room 202", floor: 2 },
            { name: "Room 203", floor: 2 },
            { name: "Room 204", floor: 2 },
            { name: "Room 205", floor: 2 },
            { name: "Room 301", floor: 3 },
            { name: "Room 302", floor: 3 },
            { name: "Room 303", floor: 3 },
            { name: "Room 304", floor: 3 },
            { name: "Room 305", floor: 3 }
        ]
    },
    "Canteen": {
        name: "Canteen",
        rooms: [
            { name: "Dining Hall", floor: 1 },
            { name: "Storage", floor: 1 },
            { name: "Comfort-Room", floor: 1 }
        ]
    }
};

const disasterGuides = {
    fire: {
        name: "🔥 Fire Emergency",
        steps: [
            "Stay calm and alert others nearby",
            "Activate the nearest fire alarm",
            "Evacuate immediately using the nearest safe exit",
            "Do NOT use elevators",
            "Stay low to avoid smoke inhalation",
            "Feel doors before opening - if hot, use alternative route",
            "Proceed to the designated assembly point outside",
            "Do not re-enter the building until authorized"
        ]
    },
    earthquake: {
        name: "🏗️ Earthquake Emergency",
        steps: [
            "DROP to the ground immediately",
            "Take COVER under a sturdy desk or table",
            "HOLD ON until shaking stops",
            "Stay away from windows and heavy objects",
            "If outdoors, move to an open area away from buildings",
            "After shaking stops, evacuate the building calmly",
            "Watch for falling debris and aftershocks",
            "Gather at the designated assembly point"
        ]
    },
    hurricane: {
        name: "🌀 Hurricane/Typhoon Emergency",
        steps: [
            "Listen to emergency broadcasts and alerts",
            "Move to designated safe rooms or shelter areas",
            "Stay away from windows and exterior walls",
            "Avoid upper floors if possible",
            "Keep emergency supplies accessible",
            "Do not leave shelter until all-clear is given",
            "Be prepared for power outages",
            "Follow evacuation orders if issued"
        ]
    }
};

// Navigation links work directly through HTML href

// Building click handler
document.querySelectorAll('.building').forEach(building => {
    building.addEventListener('click', function() {
        const buildingId = this.dataset.building;
        showBuildingDetails(buildingId);
    });
});

function showBuildingDetails(buildingId) {
    const building = buildings[buildingId];
    const detailsDiv = document.getElementById('buildingDetails');
    
    let html = `
        <div class="building-detail active">
            <h2>${building.name}</h2>
            <p>Click on any room to view disaster evacuation guides:</p>
            <div class="room-grid">
    `;
    
    building.rooms.forEach((room, index) => {
        html += `
            <div class="room-card" onclick="showDisasterGuide('${buildingId}', ${index})">
                <strong>${room.name}</strong><br>
                <small style="color: #999;">Floor ${room.floor}</small>
            </div>
        `;
    });
    
    html += `
            </div>
            <div id="disasterGuideContainer"></div>
            <button class="back-btn" onclick="closeBuildingDetails()">← Back to Map</button>
        </div>
    `;
    
    detailsDiv.innerHTML = html;
    detailsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showDisasterGuide(buildingId, roomIndex) {
    const building = buildings[buildingId];
    const room = building.rooms[roomIndex];
    const container = document.getElementById('disasterGuideContainer');
    
    let html = `
        <div class="disaster-guide active">
            <h3>Emergency Evacuation Guides for ${room.name}</h3>
            <div class="disaster-tabs">
                <button class="disaster-tab active" onclick="showDisasterContent('fire')">Fire</button>
                <button class="disaster-tab" onclick="showDisasterContent('earthquake')">Earthquake</button>
                <button class="disaster-tab" onclick="showDisasterContent('hurricane')">Hurricane</button>
            </div>
    `;
    
    Object.keys(disasterGuides).forEach(type => {
        const guide = disasterGuides[type];
        html += `
            <div class="disaster-content ${type === 'fire' ? 'active' : ''}" id="${type}Content">
                <h4>${guide.name}</h4>
                <div class="exit-route">
                    <strong>📍 Primary Exit Route:</strong> Use stairwell ${room.floor === 1 ? 'A' : 'B'} → Exit to ${room.floor === 1 ? 'East' : 'North'} courtyard → Assembly Point
                </div>
                <p><strong>Emergency Steps:</strong></p>
                <ol>
        `;
        
        guide.steps.forEach(step => {
            html += `<li>${step}</li>`;
        });
        
        html += `
                </ol>
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

function showDisasterContent(type) {
    document.querySelectorAll('.disaster-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.disaster-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(type + 'Content').classList.add('active');
}

function closeBuildingDetails() {
    document.getElementById('buildingDetails').innerHTML = '';
}