// Function to check if a string contains only digits
function onlyDigits(s) {
    return /^[0-9]+$/.test(s);
}

// Function to rotate a character based on the key
function rotate(c, key) {
    if (/[A-Z]/.test(c)) {
        return String.fromCharCode(((c.charCodeAt(0) - 65 + key) % 26) + 65);
    } else if (/[a-z]/.test(c)) {
        return String.fromCharCode(((c.charCodeAt(0) - 97 + key) % 26) + 97);
    }
    return c;
}

// Main encryption function
function caesarCipher(key, plaintext) {
    if (!onlyDigits(key)) {
        updateStatus("ERROR: Key must contain only digits");
        return null;
    }

    key = parseInt(key) % 26;
    let ciphertext = "";
    
    for (let i = 0; i < plaintext.length; i++) {
        ciphertext += rotate(plaintext[i], key);
    }

    return ciphertext;
}

// Function to handle typing animation
function typeWriter(text, element, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        playKeySound();
        setTimeout(() => typeWriter(text, element, index + 1), 50);
    }
}

// Function to play keyboard sound
function playKeySound() {
    const sound = document.getElementById('keySound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio playback failed:', e));
}

// Function to update status bar
function updateStatus(message) {
    const status = document.getElementById('status');
    status.textContent = message;
}

// Function to handle key input
function handleKeyInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const key = document.getElementById('key');
        const plaintext = document.getElementById('plaintext');
        
        if (document.activeElement === key) {
            plaintext.focus();
        } else if (document.activeElement === plaintext) {
            handleEncrypt();
        }
    }
}

// Main function to handle encryption
function handleEncrypt() {
    const output = document.getElementById('output');
    const key = document.getElementById('key').value;
    const plaintext = document.getElementById('plaintext').value;

    // Clear previous output
    output.textContent = '';
    
    if (!key || !plaintext) {
        updateStatus("ERROR: Both key and text are required");
        return;
    }

    updateStatus("PROCESSING...");
    
    const ciphertext = caesarCipher(key, plaintext);
    
    if (ciphertext !== null) {
        setTimeout(() => {
            updateStatus("ENCRYPTION COMPLETE");
            typeWriter(ciphertext, output);
        }, 500);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add sound effect to all inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('keydown', playKeySound);
        input.addEventListener('keydown', handleKeyInput);
    });

    // Set initial focus to key input
    document.getElementById('key').focus();

    // Initialize system status
    updateStatus("SYSTEM READY");
});
