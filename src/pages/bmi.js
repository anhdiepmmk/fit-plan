/* BMI Calculator Styles */
import '../styles/global.css'
import './bmi.css'

// BMI Calculator Logic
const form = document.getElementById('bmi-form');
const needle = document.getElementById('bmi-needle-group');
const bmiValueEl = document.getElementById('bmi-value');
const bmiCategoryEl = document.getElementById('bmi-category');
const bmiDetailsEl = document.getElementById('bmi-details');
const btnClear = document.getElementById('btn-clear');

// BMI Categories
const BMI_CATEGORIES = [
    { max: 18.5, label: 'Gầy', className: 'underweight' },
    { max: 25, label: 'Bình thường', className: 'normal' },
    { max: 30, label: 'Thừa cân', className: 'overweight' },
    { max: 35, label: 'Béo phì độ I', className: 'obesity' },
    { max: 40, label: 'Béo phì độ II', className: 'obesity' },
    { max: Infinity, label: 'Béo phì độ III', className: 'obesity' }
];

// Convert BMI to needle angle (180 degree arc, BMI 15-40 range)
function bmiToAngle(bmi) {
    const minBMI = 15;
    const maxBMI = 40;
    const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
    // Map BMI 15-40 to angle -180 to 0 degrees
    const angle = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 180 - 180;
    return angle;
}

// Get BMI category object
function getCategory(bmi) {
    for (const category of BMI_CATEGORIES) {
        if (bmi < category.max) return category;
    }
    return BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
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
    needle.style.transform = `translate(150px, 150px) rotate(${angle}deg)`;
}

// Reset needle to initial position
function resetNeedle() {
    needle.style.transform = 'translate(150px, 150px) rotate(-180deg)';
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
    const categoryObj = getCategory(bmi);
    const metrics = calculateMetrics(weight, height, bmi);
    
    // Update display
    bmiValueEl.textContent = bmi.toFixed(1);
    bmiCategoryEl.textContent = categoryObj.label;
    // Check if categoryObj.className adds text colors like text-danger etc.
    // We added text-underweight, text-normal, etc to bmi.css
    bmiCategoryEl.className = `text-${categoryObj.className}`;
    
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
    bmiCategoryEl.className = '';
    bmiDetailsEl.classList.add('d-none');
    resetNeedle();
    
    // Remove validation states
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
});

// Initialize needle position
resetNeedle();
