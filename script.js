// Food pools have been moved to food-data.js
// using getFoodData(gender) to retrieve them


let currentWeeklyPlan = [];

function generateWeeklyPlan(gender = 'female') {
    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
    const plan = [];

    // Simple shuffle helper
    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    const pools = getFoodData(gender);
    let morningChoices = shuffle(pools.morning);
    let lunchChoices = shuffle(pools.lunch);
    let dinnerChoices = shuffle(pools.evening);

    days.forEach((day, i) => {
        // Reuse choices if we run out (though we have 10 each for 7 days)
        const breakfast = morningChoices[i % morningChoices.length];
        const lunch = lunchChoices[i % lunchChoices.length];
        const dinner = dinnerChoices[i % dinnerChoices.length];

        plan.push({
            day: day,
            meals: [
                { type: "Sáng", name: breakfast.name, desc: breakfast.desc },
                { type: "Trưa", name: lunch.name, desc: lunch.desc },
                { type: "Tối", name: dinner.name, desc: dinner.desc }
            ]
        });
    });

    return plan;
}


// Mapping moment.js day to our index (Mon=0, ..., Sun=6)
const dayMap = {
    1: 0, // Monday
    2: 1, // Tuesday
    3: 2, // Wednesday
    4: 3, // Thursday
    5: 4, // Friday
    6: 5, // Saturday
    0: 6  // Sunday
};

// Real-time Slider Value Updates
// Real-time Slider Value Updates with Stepper Buttons
['weight', 'height', 'age'].forEach(id => {
    const slider = document.getElementById(id);
    const display = document.getElementById(id + '-val');
    const btnDec = document.querySelector(`.btn-step[data-target="${id}"][data-action="dec"]`);
    const btnInc = document.querySelector(`.btn-step[data-target="${id}"][data-action="inc"]`);

    const updateUI = () => {
        display.innerText = slider.value;
        
        const val = parseFloat(slider.value);
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);

        if (btnDec) btnDec.disabled = val <= min;
        if (btnInc) btnInc.disabled = val >= max;
        
        // Update track/thumb progress if desired, but default is fine
    };

    slider.addEventListener('input', updateUI);

    // Initial state
    updateUI();

    if (btnDec) {
        btnDec.addEventListener('click', () => {
            slider.stepDown();
            slider.dispatchEvent(new Event('input'));
        });
    }

    if (btnInc) {
        btnInc.addEventListener('click', () => {
            slider.stepUp();
            slider.dispatchEvent(new Event('input'));
        });
    }
});

document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

// 1. Calculate BMR (Mifflin-St Jeor Formula)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 2. Calculate TDEE
    const tdee = bmr * activity;

    // 3. Calculate Target Calories based on goal
    let target = tdee;
    if (goal === 'lose-slow') target -= 250;
    else if (goal === 'lose-medium') target -= 500;
    else if (goal === 'lose-fast') target -= 1000;

    // Minimum safety calories
    const minCal = (gender === 'male' ? 1500 : 1200);
    target = Math.max(target, minCal);

    // 4. Calculate BMI
    const bmi = weight / ((height / 100) ** 2);
    let bmiStatus = "";
    if (bmi < 18.5) bmiStatus = "Thiếu cân";
    else if (bmi < 24.9) bmiStatus = "Bình thường";
    else if (bmi < 29.9) bmiStatus = "Tiền béo phì";
    else bmiStatus = "Béo phì";

    // 5. Update UI
    currentWeeklyPlan = generateWeeklyPlan(gender);
    displayResults(bmi, bmiStatus, bmr, tdee, target);

    // 6. Send Event to Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', 'calculate_meal_plan', {
            'event_category': 'engagement',
            'event_label': 'Calculation Result',
            'value': 1
        });
    }
});


function displayResults(bmi, bmiStatus, bmr, tdee, target) {
    const bmiValEl = document.getElementById('bmi-val');
    const bmiStatusEl = document.getElementById('bmi-status');

    bmiValEl.innerText = bmi.toFixed(1);
    bmiStatusEl.innerText = bmiStatus;

    // Reset classes
    bmiValEl.classList.remove('bmi-normal', 'bmi-warning', 'bmi-danger');
    bmiStatusEl.classList.remove('bmi-normal', 'bmi-warning', 'bmi-danger');

    // Apply colored classes based on BMI
    if (bmi >= 18.5 && bmi < 24.9) {
        bmiValEl.classList.add('bmi-normal');
        bmiStatusEl.classList.add('bmi-normal');
    } else if (bmi < 18.5 || (bmi >= 24.9 && bmi < 29.9)) {
        bmiValEl.classList.add('bmi-warning');
        bmiStatusEl.classList.add('bmi-warning');
    } else {
        bmiValEl.classList.add('bmi-danger');
        bmiStatusEl.classList.add('bmi-danger');
    }

    document.getElementById('bmr-val').innerText = Math.round(bmr);
    document.getElementById('tdee-val').innerText = Math.round(tdee);
    document.getElementById('target-calories').innerText = Math.round(target);

    // Show results section, hide empty state
    document.getElementById('empty-state').classList.add('d-none');
    document.getElementById('results-section').classList.remove('d-none');

    renderMealPlan();
}

function renderMealPlan() {
    const container = document.getElementById('meal-plan-container');
    container.innerHTML = '';

    const todayIndex = dayMap[moment().day()];
    
    // Determine current meal type based on time
    const hour = moment().hour();
    let currentMealType = "";
    if (hour < 10) currentMealType = "Sáng";
    else if (hour < 14) currentMealType = "Trưa";
    else currentMealType = "Tối";

    currentWeeklyPlan.forEach((dayData, index) => {
        const isToday = index === todayIndex;
        
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-6 col-xl-4';

        let mealsHtml = '';
        dayData.meals.forEach(meal => {
            const isCurrentMeal = isToday && meal.type === currentMealType;
            const highlightClass = isCurrentMeal ? 'current-meal-highlight' : '';
            
            mealsHtml += `
            <div class="meal-item ${highlightClass}">
                <span class="badge bg-light text-dark mb-1">${meal.type}</span>
                <span class="meal-item-title">${meal.name}</span>
                <span class="meal-item-desc">${meal.desc}</span>
            </div>`;
        });

        cardCol.innerHTML = `
            <div class="glass-card meal-card p-3 position-relative ${isToday ? 'today' : ''}">
                ${isToday ? '<span class="today-badge">Hôm nay</span>' : ''}
                <h5 class="fw-bold mb-3 ${isToday ? 'text-primary' : ''}">${dayData.day}</h5>
                <div class="meal-list">
                    ${mealsHtml}
                </div>
            </div>
        `;
        container.appendChild(cardCol);
    });
}

