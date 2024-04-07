const notificationsContainer = document.querySelector('.notifications'); // Контейнер уведомлений

// Функция создания уведомления
function showNotification(status, label, text) {
    // div Уведомления
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add('show');
    // content Уведомления
    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.classList.add(status === 'success' ? 'success' : 'error');
    icon.textContent = status === 'success' ? '✔' : '✖';
    const content = document.createElement('div');
    content.classList.add('content');
    const title = document.createElement('h2');
    title.textContent = label;
    const message = document.createElement('p');
    message.textContent = text;
    content.appendChild(title);
    content.appendChild(message);
    // Прогресс-бар
    const progressBarContainer = document.createElement('div');
    progressBarContainer.classList.add('progress-container');
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBarContainer.appendChild(progressBar);
    content.appendChild(progressBarContainer);

    notification.appendChild(icon);
    notification.appendChild(content);
    notificationsContainer.appendChild(notification);

    let interval;
    let progress = 0;

    // Процесс прогресс-бара
    interval = setInterval(() => {
        progress += 100 / 3000 * 100; // 3 seconds
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
            notification.classList.remove('show');
            notification.classList.add('hide');
            clearInterval(interval);
            setTimeout(() => {
                notificationsContainer.removeChild(notification);
            }, 500);
        }
    }, 100);

    // Остановка прогресс-бара при наведении
    notification.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // Возобновление прогресс-бара
    notification.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            progress += 100 / 3000 * 100; // 3 seconds
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                notification.classList.remove('show');
                notification.classList.add('hide');
                clearInterval(interval);
                setTimeout(() => {
                    notificationsContainer.removeChild(notification);
                }, 500);
            }
        }, 100);
    });
}

// Функция эмитации запроса
function simulateRequest() {
    const status = Math.random() > 0.5 ? 'success' : 'error';
    const label = status === 'success' ? 'Успешно' : 'Изменения не сохранены';
    const text = status === 'success' ? 'Изменения успешно сохранены' : 'Потеря интернет соеденения';
    showNotification(status, label, text);
}