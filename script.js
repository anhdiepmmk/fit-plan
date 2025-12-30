// Meal Plan Data
const mealPlanData = [
    {
        day: "Thứ 2",
        meals: [
            { type: "Sáng", name: "Bánh mì đen & Trứng ốp la", desc: "2 lát bánh mì, 1 quả trứng, salad" },
            { type: "Trưa", name: "Ức gà áp chảo & Bông cải xanh", desc: "150g ức gà, bông cải luộc, nửa bát cơm lứt" },
            { type: "Tối", name: "Cá thu kho & Rau muống luộc", desc: "100g cá thu, rau muống, canh bí xanh" }
        ]
    },
    {
        day: "Thứ 3",
        meals: [
            { type: "Sáng", name: "Yến mạch & Sữa chua không đường", desc: "1 hũ sữa chua, 30g yến mạch, trái cây" },
            { type: "Trưa", name: "Bò xào đỗ que", desc: "100g thịt bò, đỗ que xào ít dầu, 1 bát cơm lứt" },
            { type: "Tối", name: "Salad ức gà xé", desc: "100g ức gà, xà lách, dưa chuột, sốt mè" }
        ]
    },
    {
        day: "Thứ 4",
        meals: [
            { type: "Sáng", name: "Khoai lang luộc & Sữa hạt", desc: "1 củ khoai vừa, 200ml sữa hạnh nhân" },
            { type: "Trưa", name: "Tôm rim & Rau cải chíp", desc: "150g tôm, cải chíp luộc, nửa bát cơm lứt" },
            { type: "Tối", name: "Canh đậu phụ nấu rong biển", desc: "2 bìa đậu, rong biển, 100g thịt băm" }
        ]
    },
    {
        day: "Thứ 5",
        meals: [
            { type: "Sáng", name: "Phở gà (ít bánh nhiều rau)", desc: "1 tô phở nhỏ, nhiều hành và rau thơm" },
            { type: "Trưa", name: "Thịt lợn luộc & Dưa chuột", desc: "100g thịt thăn, dưa chuột, canh rau ngót" },
            { type: "Tối", name: "Cá hồi nướng măng tây", desc: "100g cá hồi, măng tây, bí đỏ luộc" }
        ]
    },
    {
        day: "Thứ 6",
        meals: [
            { type: "Sáng", name: "Trứng xào cà chua & Bánh mì", desc: "1 quả trứng, 2 cà chua, 1 lát bánh mì đen" },
            { type: "Trưa", name: "Mực xào dứa", desc: "150g mực, dứa, cần tây, nửa bát cơm lứt" },
            { type: "Tối", name: "Đậu bắp luộc & Thịt băm", desc: "Đậu bắp, 100g thịt nạc băm, canh chua" }
        ]
    },
    {
        day: "Thứ 7",
        meals: [
            { type: "Sáng", name: "Bún chả (ăn vừa đủ)", desc: "Nửa suất bún, nhiều rau sống" },
            { type: "Trưa", name: "Lẩu rau nấm", desc: "Nhiều loại nấm, rau xanh, đậu phụ, ít tôm" },
            { type: "Tối", name: "Trái cây & Hạt điều", desc: "Táo, bưởi, 5-7 hạt điều" }
        ]
    },
    {
        day: "Chủ Nhật",
        meals: [
            { type: "Sáng", name: "Xôi gấc (lượng nhỏ)", desc: "1 nắm nhỏ xôi, nửa quả trứng luộc" },
            { type: "Trưa", name: "Gà rang gừng & Bắp cải", desc: "100g gà, bắp cải luộc, 1 bát cơm lứt" },
            { type: "Tối", name: "Canh bí đỏ nấu tôm", desc: "Bí đỏ, 50g tôm, rau xanh tùy chọn" }
        ]
    }
];

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

    mealPlanData.forEach((dayData, index) => {
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
