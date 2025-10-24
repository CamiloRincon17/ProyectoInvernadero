document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    const logoutConfirmModal = new bootstrap.Modal(document.getElementById('logoutConfirmModal'));

    // Check for saved email
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
    }

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginScreen.classList.add('d-none');
        mainApp.classList.remove('d-none');
    }

    // Login functionality
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value;
        
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('savedEmail', email);

        loginScreen.classList.add('d-none');
        mainApp.classList.remove('d-none');
    });

    // Password toggle
    document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.className = type === 'password' ? 'bi bi-eye password-toggle' : 'bi bi-eye-slash password-toggle';
    });

    // Logout functionality
    function logout() {
        localStorage.removeItem('isLoggedIn');
        mainApp.classList.add('d-none');
        loginScreen.classList.remove('d-none');
        document.getElementById('password').value = '';
    }

    // Show logout confirmation modal
    function showLogoutModal() {
        logoutConfirmModal.show();
    }

    // Navigate to settings tab
    document.getElementById('profileBtn').addEventListener('click', function() {
        document.querySelector('[data-tab="settings"]').click();
    });

    document.getElementById('logoutBtn2').addEventListener('click', showLogoutModal);

    // Handle logout confirmation
    document.getElementById('confirmLogoutBtn').addEventListener('click', function() {
        logout();
        logoutConfirmModal.hide();
    });

    // Tab navigation
    document.querySelectorAll('[data-tab]').forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('d-none');
            });
            
            // Show selected tab
            document.getElementById(tab + 'Tab').classList.remove('d-none');
            
            // Update active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});