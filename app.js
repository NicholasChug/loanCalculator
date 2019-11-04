// Listen for Submit
document.getElementById('loan-form').addEventListener('click', function(e) {
    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


// Calculate Results
function calculateResults() {
    console.log('Calculating Results!');

    // UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    // isFinite
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Display after Interval
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'none';

        showError('Please check your numbers')
    }

}

// Show Error
function showError(error) {
    // Create a Div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading');

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // Create Text Node and Append to Div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error Above Heading
    card.insertBefore(errorDiv, heading);

    // Clear Error after 3 Seconds
    setTimeout(clearError, 3000);
}

// Clear Error Function
function clearError() {
    document.querySelector('.alert').remove();
}