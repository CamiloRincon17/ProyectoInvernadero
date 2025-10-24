document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    const logoutConfirmModal = new bootstrap.Modal(document.getElementById('logoutConfirmModal'));
    const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
    const userInfoModal = new bootstrap.Modal(document.getElementById('userInfoModal'));
    const addSensorModal = new bootstrap.Modal(document.getElementById('addSensorModal'));

    // Check for saved email
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
    }

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginScreen.classList.add('d-none');
        mainApp.classList.remove('d-none');
        initializeCharts();
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
        initializeCharts();
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

    // Profile modal functionality
    document.getElementById('profileInfo').addEventListener('click', function(e) {
        e.preventDefault();
        profileModal.show();
    });

    // Logout from dropdown
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showLogoutModal();
    });

    document.getElementById('logoutBtn2').addEventListener('click', showLogoutModal);

    // User info modal functionality
    document.querySelectorAll('.clickable-user').forEach(user => {
        user.addEventListener('click', function() {
            const userId = this.getAttribute('data-user');
            showUserInfo(userId);
        });
    });

    // Add sensor functionality
    document.getElementById('addSensorBtn').addEventListener('click', function() {
        addNewSensor();
    });

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
            
            // Initialize charts when stats tab is opened
            if (tab === 'stats') {
                setTimeout(initializeCharts, 100);
            }
        });
    });

    // Initialize Charts with static report data (completely static, no updates)
    function initializeCharts() {
        // Temperature Chart - Weekly Report (STATIC DATA)
        const tempCtx = document.getElementById('temperatureChart');
        if (tempCtx && !tempCtx.chart) {
            tempCtx.chart = new Chart(tempCtx, {
                type: 'line',
                data: {
                    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                    datasets: [{
                        label: 'Temperatura Promedio (°C)',
                        data: [24.5, 26.2, 25.8, 27.1, 28.3, 26.9, 25.4],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false, // Completely disable all animations
                    hover: {
                        animationDuration: 0 // Disable hover animations
                    },
                    responsiveAnimationDuration: 0, // Disable responsive animations
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Reporte Semanal - Temperatura',
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#374151'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 20,
                            max: 30,
                            grid: {
                                color: 'rgba(0,0,0,0.1)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 10
                                },
                                callback: function(value) {
                                    return value + '°C';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 10
                                }
                            }
                        }
                    },
                    elements: {
                        point: {
                            hoverRadius: 6,
                            radius: 4
                        },
                        line: {
                            tension: 0.3
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    layout: {
                        padding: {
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10
                        }
                    }
                }
            });
        }

        // Humidity Chart - Weekly Report (STATIC DATA)
        const humidityCtx = document.getElementById('humidityChart');
        if (humidityCtx && !humidityCtx.chart) {
            humidityCtx.chart = new Chart(humidityCtx, {
                type: 'line',
                data: {
                    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                    datasets: [{
                        label: 'Humedad Promedio (%)',
                        data: [68, 72, 65, 70, 63, 67, 69],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false, // Completely disable all animations
                    hover: {
                        animationDuration: 0 // Disable hover animations
                    },
                    responsiveAnimationDuration: 0, // Disable responsive animations
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Reporte Semanal - Humedad',
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#374151'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 50,
                            max: 80,
                            grid: {
                                color: 'rgba(0,0,0,0.1)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 10
                                },
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 10
                                }
                            }
                        }
                    },
                    elements: {
                        point: {
                            hoverRadius: 6,
                            radius: 4
                        },
                        line: {
                            tension: 0.3
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    layout: {
                        padding: {
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10
                        }
                    }
                }
            });
        }
    }

    // Simulate real-time data updates (only for sensor cards, not charts)
    function updateSensorData() {
        // Update temperature sensor card only
        const tempElement = document.querySelector('.sensor-card[data-sensor="temperature"] .display-6');
        if (tempElement) {
            const currentTemp = parseInt(tempElement.textContent);
            const newTemp = currentTemp + (Math.random() - 0.5) * 2;
            tempElement.textContent = Math.round(newTemp) + '°C';
            
            // Update alert status
            const alertCard = tempElement.closest('.sensor-card');
            if (newTemp > 30) {
                alertCard.classList.add('alert');
                alertCard.classList.remove('normal');
                alertCard.querySelector('.sensor-status .badge').textContent = 'Alerta';
                alertCard.querySelector('.sensor-status .badge').className = 'badge bg-danger';
            } else {
                alertCard.classList.add('normal');
                alertCard.classList.remove('alert');
                alertCard.querySelector('.sensor-status .badge').textContent = 'Normal';
                alertCard.querySelector('.sensor-status .badge').className = 'badge bg-success';
            }
        }

        // Update humidity sensor card only
        const humidityElement = document.querySelector('.sensor-card[data-sensor="humidity"] .display-6');
        if (humidityElement && !humidityElement.closest('.sensor-card').classList.contains('alert')) {
            const currentHumidity = parseInt(humidityElement.textContent);
            const newHumidity = currentHumidity + (Math.random() - 0.5) * 4;
            humidityElement.textContent = Math.round(newHumidity) + '%';
        }

        // Update light sensor card only
        const lightElement = document.querySelector('.sensor-card[data-sensor="light"] .display-6');
        if (lightElement) {
            const currentLight = parseInt(lightElement.textContent);
            const newLight = currentLight + (Math.random() - 0.5) * 3;
            lightElement.textContent = Math.round(newLight) + '%';
        }

        // Update irrigation sensor card only
        const irrigationElement = document.querySelector('.sensor-card[data-sensor="irrigation"] .display-6');
        if (irrigationElement) {
            const currentIrrigation = parseInt(irrigationElement.textContent);
            const newIrrigation = currentIrrigation + (Math.random() - 0.5) * 2;
            irrigationElement.textContent = Math.round(newIrrigation) + '%';
        }
    }

    // Update sensor cards every 30 seconds (charts remain static)
    setInterval(updateSensorData, 30000);

    // User data
    const usersData = {
        juan: {
            name: 'Juan Pérez',
            role: 'Administrador del Proyecto',
            email: 'juan.perez@invernadero.com',
            projectRole: 'Supervisor General',
            lastActivity: 'Hace 2 minutos',
            location: 'Oficina Principal',
            status: 'online',
            avatar: 'bg-success'
        },
        maria: {
            name: 'María García',
            role: 'Especialista en Cultivos',
            email: 'maria.garcia@invernadero.com',
            projectRole: 'Monitoreo de Cultivos',
            lastActivity: 'Hace 5 minutos',
            location: 'Zona Norte del Invernadero',
            status: 'online',
            avatar: 'bg-primary'
        },
        carlos: {
            name: 'Carlos López',
            role: 'Técnico en Sistemas',
            email: 'carlos.lopez@invernadero.com',
            projectRole: 'Mantenimiento de Sensores',
            lastActivity: 'Hace 1 hora',
            location: 'Taller Técnico',
            status: 'offline',
            avatar: 'bg-warning'
        },
        ana: {
            name: 'Ana Martínez',
            role: 'Analista de Datos',
            email: 'ana.martinez@invernadero.com',
            projectRole: 'Análisis de Rendimiento',
            lastActivity: 'Hace 3 minutos',
            location: 'Laboratorio de Análisis',
            status: 'online',
            avatar: 'bg-info'
        }
    };

    // Show user info modal
    function showUserInfo(userId) {
        const user = usersData[userId];
        if (user) {
            document.getElementById('userName').textContent = user.name;
            document.getElementById('userRole').textContent = user.role;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userProjectRole').textContent = user.projectRole;
            document.getElementById('userLastActivity').textContent = user.lastActivity;
            document.getElementById('userLocation').textContent = user.location;
            
            const statusElement = document.getElementById('userStatus');
            statusElement.textContent = user.status === 'online' ? 'En línea' : 'Desconectado';
            statusElement.className = `badge ${user.status === 'online' ? 'bg-success' : 'bg-secondary'} mt-2`;
            
            const avatarElement = document.getElementById('userAvatarLarge');
            avatarElement.className = `user-avatar-large mx-auto mb-3 ${user.avatar}`;
            
            userInfoModal.show();
        }
    }

    // Add new sensor functionality
    function addNewSensor() {
        const name = document.getElementById('sensorName').value;
        const type = document.getElementById('sensorType').value;
        const location = document.getElementById('sensorLocation').value;
        const value = document.getElementById('sensorValue').value;
        const unit = document.getElementById('sensorUnit').value;

        if (!name || !type || !location || !value || !unit) {
            alert('Por favor, completa todos los campos');
            return;
        }

        // Create new sensor element
        const sensorConfig = {
            temperature: { icon: 'bi-thermometer', bg: 'bg-danger', name: 'Temperatura' },
            humidity: { icon: 'bi-droplet', bg: 'bg-primary', name: 'Humedad' },
            light: { icon: 'bi-sun', bg: 'bg-warning', name: 'Luz' },
            irrigation: { icon: 'bi-lightning', bg: 'bg-success', name: 'Riego' },
            ph: { icon: 'bi-droplet-half', bg: 'bg-info', name: 'pH' },
            co2: { icon: 'bi-cloud', bg: 'bg-secondary', name: 'CO2' }
        };

        const config = sensorConfig[type];
        const sensorId = `sensor-${Date.now()}`;

        const newSensorHTML = `
            <div class="col-6">
                <div class="card sensor-card normal new-sensor" data-sensor="${sensorId}">
                    <div class="card-body">
                        <div class="sensor-header">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <div class="sensor-icon ${config.bg}">
                                    <i class="bi ${config.icon} text-white"></i>
                                </div>
                                <div class="sensor-info">
                                    <h6 class="card-title mb-0 fw-semibold">${name}</h6>
                                    <small class="text-muted">${location}</small>
                                </div>
                            </div>
                            <div class="sensor-status">
                                <span class="badge bg-success">Normal</span>
                            </div>
                        </div>
                        <div class="sensor-value">
                            <p class="display-6 fw-bold mb-1">${value}${unit}</p>
                            <div class="sensor-trend">
                                <i class="bi bi-arrow-right text-muted"></i>
                                <small class="text-muted">Nuevo sensor</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add to sensors container
        document.getElementById('sensorsContainer').insertAdjacentHTML('beforeend', newSensorHTML);

        // Save to localStorage
        const sensors = JSON.parse(localStorage.getItem('customSensors') || '[]');
        sensors.push({
            id: sensorId,
            name,
            type,
            location,
            value,
            unit,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('customSensors', JSON.stringify(sensors));

        // Clear form and close modal
        document.getElementById('addSensorForm').reset();
        addSensorModal.hide();

        // Show success message
        showNotification('Sensor agregado exitosamente', 'success');
    }

    // Load custom sensors on page load
    function loadCustomSensors() {
        const sensors = JSON.parse(localStorage.getItem('customSensors') || '[]');
        sensors.forEach(sensor => {
            const sensorConfig = {
                temperature: { icon: 'bi-thermometer', bg: 'bg-danger', name: 'Temperatura' },
                humidity: { icon: 'bi-droplet', bg: 'bg-primary', name: 'Humedad' },
                light: { icon: 'bi-sun', bg: 'bg-warning', name: 'Luz' },
                irrigation: { icon: 'bi-lightning', bg: 'bg-success', name: 'Riego' },
                ph: { icon: 'bi-droplet-half', bg: 'bg-info', name: 'pH' },
                co2: { icon: 'bi-cloud', bg: 'bg-secondary', name: 'CO2' }
            };

            const config = sensorConfig[sensor.type];
            const newSensorHTML = `
                <div class="col-6">
                    <div class="card sensor-card normal" data-sensor="${sensor.id}">
                        <div class="card-body">
                            <div class="sensor-header">
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <div class="sensor-icon ${config.bg}">
                                        <i class="bi ${config.icon} text-white"></i>
                                    </div>
                                    <div class="sensor-info">
                                        <h6 class="card-title mb-0 fw-semibold">${sensor.name}</h6>
                                        <small class="text-muted">${sensor.location}</small>
                                    </div>
                                </div>
                                <div class="sensor-status">
                                    <span class="badge bg-success">Normal</span>
                                </div>
                            </div>
                            <div class="sensor-value">
                                <p class="display-6 fw-bold mb-1">${sensor.value}${sensor.unit}</p>
                                <div class="sensor-trend">
                                    <i class="bi bi-arrow-right text-muted"></i>
                                    <small class="text-muted">Personalizado</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('sensorsContainer').insertAdjacentHTML('beforeend', newSensorHTML);
        });
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Load custom sensors when app starts
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loadCustomSensors();
    }

    // Charts are completely static - no updates needed
});