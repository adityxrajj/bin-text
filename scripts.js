document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const inputText = document.getElementById('inputText');
    const outputBinary = document.getElementById('outputBinary');
    const charCount = document.getElementById('charCount');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    const resetBtn = document.getElementById('resetBtn');
    const notification = document.getElementById('notification');

    // Update character count and convert button state
    inputText.addEventListener('input', function () {
        const length = this.value.length;
        charCount.textContent = length;
        convertBtn.disabled = length === 0;
    });

    // Convert text to binary
    convertBtn.addEventListener('click', function () {
        const text = inputText.value;
        if (!text) {
            showNotification('Please enter some text first!', 'warning');
            return;
        }

        try {
            let binaryOutput = '';
            for (let i = 0; i < text.length; i++) {
                const binary = text[i].charCodeAt(0).toString(2).padStart(8, '0');
                binaryOutput += binary + ' ';
            }

            outputBinary.value = binaryOutput.trim();
            copyBtn.disabled = false;
            showNotification('Conversion successful!', 'success');
        } catch (error) {
            showNotification('Error converting text!', 'error');
        }
    });

    // Copy binary output
    copyBtn.addEventListener('click', function () {
        if (!outputBinary.value) {
            showNotification('No binary to copy!', 'warning');
            return;
        }

        outputBinary.select();
        try {
            document.execCommand('copy');
            showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            showNotification('Failed to copy text!', 'error');
        }
        window.getSelection().removeAllRanges();
    });

    // Reset all fields
    resetBtn.addEventListener('click', function () {
        inputText.value = '';
        outputBinary.value = '';
        charCount.textContent = '0';
        convertBtn.disabled = true;
        copyBtn.disabled = true;
        showNotification('Fields reset!', 'success');
    });

    // Show notification
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
});