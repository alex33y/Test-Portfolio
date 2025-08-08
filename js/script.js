// This JavaScript provides the dynamic functionality of the site,
        // such as navigating between pages, opening the mobile menu,
        // and handling the image gallery modal.
        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIcon = document.getElementById('menu-icon');
            const closeIcon = document.getElementById('close-icon');
            const sections = document.querySelectorAll('.page-section');
            const imageGrid = document.getElementById('image-grid');
            const commissionsForm = document.getElementById('commission-form');

            // Initialize dynamic elements
            document.getElementById('current-year').textContent = new Date().getFullYear();

            // Populate the image gallery
            const imgPath = 'images/';
            const images = [
                'image.jpg',
                'imagetik1.jpg',
                'imagetik2.jpg',
                'imagetik3.jpg'
            ].map(file => imgPath + file);
            images.forEach((src, index) => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';
                item.innerHTML = `
                    <img src="${src}" alt="Art Piece ${index + 1}">
                    <div class="portfolio-item-overlay"><span>View</span></div>
                `;
                item.addEventListener('click', () => openModal(src));
                imageGrid.appendChild(item);
            });

            

            // Function to handle page navigation
            function showPage(pageId) {
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(pageId).classList.add('active');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === pageId) {
                        link.classList.add('active');
                    }
                });
            }

            // Page navigation event listeners
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageId = link.getAttribute('data-page');
                    showPage(pageId);
                    mobileMenu.classList.remove('open');
                    menuIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                });
            });

            // Mobile menu toggle
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
                const isOpen = mobileMenu.classList.contains('open');
                menuIcon.style.display = isOpen ? 'none' : 'block';
                closeIcon.style.display = isOpen ? 'block' : 'none';
            });

            // Commission form submission
            commissionsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(commissionsForm);
                const data = Object.fromEntries(formData.entries());
                console.log('Commission request submitted:', data);
                // Instead of a native alert(), which is blocked in this sandbox,
                // you would use a custom message box or dialog in a real app.
                // For demonstration, a console log is used here.
                alert('Thank you for your inquiry! I will get back to you soon.');
                commissionsForm.reset();
            });

            // Modal functionality
            function openModal(src) {
                const modalOverlay = document.createElement('div');
                modalOverlay.className = 'modal-overlay';
                modalOverlay.addEventListener('click', () => closeModal(modalOverlay));

                const modalContent = document.createElement('div');
                modalContent.className = 'modal-content';
                modalContent.addEventListener('click', (e) => e.stopPropagation());

                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Enlarged art piece';

                const closeBtn = document.createElement('button');
                closeBtn.className = 'modal-close-btn';
                closeBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                `;
                closeBtn.addEventListener('click', () => closeModal(modalOverlay));

                modalContent.appendChild(img);
                modalContent.appendChild(closeBtn);
                modalOverlay.appendChild(modalContent);
                document.body.appendChild(modalOverlay);
            }

            function closeModal(modalElement) {
                modalElement.remove();
            }
        });