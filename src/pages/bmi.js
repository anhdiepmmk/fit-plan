/* BMI Calculator Styles */
import '../styles/global.css'
import './bmi.css'

// BMI Calculator Logic
const form = document.getElementById('bmi-form');
const needle = document.getElementById('bmi-needle');
const bmiValueEl = document.getElementById('bmi-value');
const bmiCategoryEl = document.getElementById('bmi-category');
const bmiDetailsEl = document.getElementById('bmi-details');
const btnClear = document.getElementById('btn-clear');

// BMI Categories
const BMI_CATEGORIES = {
    underweight: { max: 18.5, label: 'Thiếu cân', labelEn: 'Underweight' },
    normal: { max: 25, label: 'Bình thường', labelEn: 'Normal' },
    overweight: { max: 30, label: 'Thừa cân', labelEn: 'Overweight' },
    obesity: { max: Infinity, label: 'Béo phì', labelEn: 'Obesity' }
};

// Convert BMI to needle angle (180 degree arc, BMI 15-40 range)
function bmiToAngle(bmi) {
    const minBMI = 15;
    const maxBMI = 40;
    const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
    // Map BMI 15-40 to angle -90 to 90 degrees
    const angle = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 180 - 90;
    return angle;
}

// Get BMI category
function getCategory(bmi) {
    if (bmi < BMI_CATEGORIES.underweight.max) return 'underweight';
    if (bmi < BMI_CATEGORIES.normal.max) return 'normal';
    if (bmi < BMI_CATEGORIES.overweight.max) return 'overweight';
    return 'obesity';
}

// Calculate BMI
function calculateBMI(weight, heightCm) {
    const heightM = heightCm / 100;
    return weight / (heightM * heightM);
}

// Calculate additional metrics
function calculateMetrics(weight, heightCm, bmi) {
    const heightM = heightCm / 100;
    
    // Healthy weight range (BMI 18.5 - 25)
    const minHealthyWeight = 18.5 * heightM * heightM;
    const maxHealthyWeight = 25 * heightM * heightM;
    
    // BMI Prime (ratio to upper normal BMI of 25)
    const bmiPrime = bmi / 25;
    
    // Ponderal Index
    const ponderalIndex = weight / (heightM * heightM * heightM);
    
    return {
        healthyWeight: `${minHealthyWeight.toFixed(1)} – ${maxHealthyWeight.toFixed(1)} kg`,
        bmiPrime: bmiPrime.toFixed(2),
        ponderalIndex: `${ponderalIndex.toFixed(1)} kg/m³`
    };
}

// Update gauge needle with animation
function updateNeedle(bmi) {
    const angle = bmiToAngle(bmi);
    needle.style.transform = `rotate(${angle}deg)`;
}

// Reset needle to initial position
function resetNeedle() {
    needle.style.transform = 'rotate(-90deg)';
}

// Form validation
function validateForm() {
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    
    let valid = true;
    
    if (isNaN(age) || age < 2 || age > 120) {
        document.getElementById('age').classList.add('is-invalid');
        valid = false;
    } else {
        document.getElementById('age').classList.remove('is-invalid');
    }
    
    if (isNaN(height) || height <= 0) {
        document.getElementById('height').classList.add('is-invalid');
        valid = false;
    } else {
        document.getElementById('height').classList.remove('is-invalid');
    }
    
    if (isNaN(weight) || weight <= 0) {
        document.getElementById('weight').classList.add('is-invalid');
        valid = false;
    } else {
        document.getElementById('weight').classList.remove('is-invalid');
    }
    
    return valid;
}

// Handle form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    
    // Calculate BMI
    const bmi = calculateBMI(weight, height);
    const category = getCategory(bmi);
    const metrics = calculateMetrics(weight, height, bmi);
    
    // Update display
    bmiValueEl.textContent = bmi.toFixed(1);
    bmiCategoryEl.textContent = BMI_CATEGORIES[category].label;
    bmiCategoryEl.className = `bmi-category ${category}`;
    
    // Update additional info
    document.getElementById('healthy-weight').textContent = metrics.healthyWeight;
    document.getElementById('bmi-prime').textContent = metrics.bmiPrime;
    document.getElementById('ponderal-index').textContent = metrics.ponderalIndex;
    bmiDetailsEl.classList.remove('d-none');
    
    // Animate needle
    updateNeedle(bmi);
});

// Handle clear button
btnClear.addEventListener('click', () => {
    form.reset();
    bmiValueEl.textContent = '--';
    bmiCategoryEl.textContent = '--';
    bmiCategoryEl.className = 'bmi-category';
    bmiDetailsEl.classList.add('d-none');
    resetNeedle();
    
    // Remove validation states
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
});

// Initialize needle position
resetNeedle();
