// Food pools for Vietnamese dishes (optimized for weight loss/health)
const foodPools = {
    morning: [
        { name: "Phở gà (ít bánh)", desc: "Nước dùng trong, nhiều rau thơm, ức gà xé" },
        { name: "Bún mọc", desc: "Nước dùng thanh, mọc nạc, nhiều dọc mùng" },
        { name: "Cháo yến mạch thịt bằm", desc: "Yến mạch, thịt nạc bằm, hành lá, tiêu" },
        { name: "Bánh mì đen & Trứng ốp", desc: "2 lát bánh mì nguyên cám, 1 trứng, xà lách" },
        { name: "Sữa chua & Hạt điều", desc: "Sữa chua không đường, ngũ cốc hạt, trái cây ít ngọt" },
        { name: "Khoai lang luộc & Sữa hạt", desc: "1 củ khoai vừa, 200ml sữa hạnh nhân không đường" },
        { name: "Trứng xào cà chua & Bánh mì", desc: "1 quả trứng, cà chua, bánh mì đen" },
        { name: "Bún thang (nhỏ)", desc: "Nhiều rau, trứng thái chỉ, giò lụa nạc, gà xé" },
        { name: "Xôi đậu xanh (nhỏ)", desc: "Lượng xôi vừa phải, ăn kèm muối vừng" },
        { name: "Nui lứt nấu thịt băm", desc: "Nui gạo lứt, nước dùng rau củ, thịt nạc" }
    ],
    lunch: [
        { name: "Ức gà áp chảo & Súp lơ", desc: "150g gà, súp lơ xanh luộc, nửa bát cơm lứt" },
        { name: "Bò xào thiên lý", desc: "100g thịt bò mỏng, hoa thiên lý, ít dầu mỡ" },
        { name: "Tôm rim mặn ngọt & Rau cải", desc: "150g tôm, cải chíp luộc, nửa bát cơm lứt" },
        { name: "Cá thu kho & Rau muống", desc: "1 khúc cá thu nhỏ, rau muống luộc lấy nước chanh" },
        { name: "Thịt lợn luộc & Dưa chuột", desc: "100g thịt thăn luộc, dưa chuột tươi, canh rau ngót" },
        { name: "Mực xào cần tỏi", desc: "150g mực, cần tây, tỏi tây, ít cơm lứt" },
        { name: "Đậu phụ sốt cà chua", desc: "2 bìa đậu, cà chua tươi, canh rau cải" },
        { name: "Gà rang gừng & Bắp cải", desc: "100g gà bỏ da, bắp cải luộc, 1 bát cơm lứt" },
        { name: "Cá diêu hồng hấp gừng", desc: "Cá hấp, nhiều rau sống cuốn, không ăn kèm bún" },
        { name: "Canh chua cá lóc", desc: "Cá lóc, dứa, cà chua, dọc mùng, ít cơm" }
    ],
    evening: [
        { name: "Salad ức gà xé", desc: "Ức gà, xà lách, sốt mè, nhiều dưa chuột" },
        { name: "Canh đậu phụ rong biển", desc: "Đậu phụ, rong biển, tôm khô/thịt băm, thanh đạm" },
        { name: "Cá hồi nướng măng tây", desc: "100g cá hồi, măng tây, bí đỏ luộc" },
        { name: "Nộm sứa & Rau thơm", desc: "Sứa, đu đủ xanh, cà rốt, lạc rang ít" },
        { name: "Canh bí đỏ nấu tôm", desc: "Bí đỏ, tôm tươi, rau dền/mồng tơi" },
        { name: "Lẩu rau nấm (mini)", desc: "Nấm các loại, đậu phụ, rau xanh, không mì" },
        { name: "Súp gà ngô non", desc: "Gà xé, ngô ngọt, nấm hương, ít bột năng" },
        { name: "Bún xào rau củ", desc: "Bún gạo lứt, nhiều rau cải, mộc nhĩ, đậu phụ" },
        { name: "Thịt bò trộn salad", desc: "Bò tái lăn, xà lách, hành tây, cà chua bi" },
        { name: "Trái cây & Hạt chia", desc: "Táo/Bưởi, sữa hạt, hạt chia (nhẹ bụng)" }
    ]
};

let currentWeeklyPlan = [];

function generateWeeklyPlan() {
    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
    const plan = [];

    // Simple shuffle helper
    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    let morningChoices = shuffle(foodPools.morning);
    let lunchChoices = shuffle(foodPools.lunch);
    let dinnerChoices = shuffle(foodPools.evening);

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
    const gender = document.getElementById('gender').value;
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
    currentWeeklyPlan = generateWeeklyPlan();
    displayResults(bmi, bmiStatus, bmr, tdee, target);
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

    currentWeeklyPlan.forEach((dayData, index) => {
        const isToday = index === todayIndex;
        
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-6 col-xl-4';

        let mealsHtml = '';
        dayData.meals.forEach(meal => {
            mealsHtml += `
            <div class="meal-item">
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

