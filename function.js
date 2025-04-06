document.addEventListener('DOMContentLoaded', () => {
            const links = document.querySelectorAll('nav a');
            const modals = document.querySelectorAll('.modal');
            const closeButtons = document.querySelectorAll('.close-button');
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const navLinks = document.querySelectorAll('nav ul li');

            // Функция для открытия модального окна
            function openModal(modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                }
            }

            // Функция для закрытия модального окна
            function closeModal(modal) {
                modal.style.display = 'none';
            }

            // ----- Фильтр списка ссылок (теперь через поле поиска) -----
            function filterLinks() {
                const filterValue = searchInput.value.trim().toLowerCase();

                navLinks.forEach(link => {
                    const linkText = link.textContent.toLowerCase();
                    if (linkText.includes(filterValue)) {
                        link.style.display = 'block';
                    } else {
                        link.style.display = 'none';
                    }
                });
            }

            // Обработчик события input в поле поиска (теперь это фильтр)
            searchInput.addEventListener('input', filterLinks);

            // Обработчик клика на кнопку "Фильтр"
            searchButton.addEventListener('click', (event) => {
                event.preventDefault();
                filterLinks();
            });

            //  Обработчик нажатия Enter в поле поиска
            searchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    filterLinks();
                }
            });

            // Обработчики кликов для ссылок (открывают модальные окна)
            links.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const modalId = link.dataset.modal;
                    openModal(modalId);
                });
            });

            // Обработчики кликов для кнопок закрытия
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const modal = button.closest('.modal');
                    if (modal) {
                        closeModal(modal);
                    }
                });
            });

            // Закрытие модального окна при клике вне его области
            window.addEventListener('click', (event) => {
                modals.forEach(modal => {
                    if (event.target === modal) {
                        closeModal(modal);
                    }
                });
            });

            // -----  Перетаскивание модальных окон -----
            modals.forEach(modal => {
                const header = modal.querySelector('.modal-header');
                let isDragging = false;
                let offsetX, offsetY;

                if (header) {
                    header.addEventListener('mousedown', (e) => {
                        isDragging = true;
                        offsetX = e.clientX - modal.offsetLeft;
                        offsetY = e.clientY - modal.offsetTop;
                        modal.style.cursor = 'grabbing';
                    });

                    document.addEventListener('mouseup', () => {
                        isDragging = false;
                        modal.style.cursor = 'grab';
                    });

                    document.addEventListener('mousemove', (e) => {
                        if (!isDragging) return;
                        modal.style.left = (e.clientX - offsetX) + 'px';
                        modal.style.top = (e.clientY - offsetY) + 'px';
                    });
                }
            });
        });