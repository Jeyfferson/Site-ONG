document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENU HAMBÚRGUER (MOBILE)
       ========================================================================== */
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    /* ==========================================================================
       2. ACESSIBILIDADE E COMPORTAMENTO DO DROPDOWN
       ========================================================================== */
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                dropdownMenu.classList.toggle('show');
            }
        });
    }

    /* ==========================================================================
       3. INTERCEPTAÇÃO DE FORMULÁRIO E ALERTA MODAL
       ========================================================================== */
    const cadastroForm = document.querySelector('form');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita a recarga da página

            // Abre o modal de sucesso se o formulário for válido
            openModal(
                'Cadastro Realizado com Sucesso!',
                'Obrigado por se voluntariar para a ONG FLORECER. Entraremos em contato em breve através do seu WhatsApp.'
            );

            cadastroForm.reset();
        });
    }
});

/* ==========================================================================
   4. SISTEMA DINÂMICO DE MODAL
   ========================================================================== */
function openModal(title, message) {
    // Cria a estrutura do modal dinamicamente caso não exista
    let modalOverlay = document.querySelector('.modal-overlay');

    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-content" role="dialog" aria-modal="true">
                <button class="modal-close" aria-label="Fechar">&times;</button>
                <h3 class="modal-title" style="margin-bottom: 10px; color: var(--color-secondary);"></h3>
                <p class="modal-text" style="color: var(--color-text-muted);"></p>
                <button class="btn-primary modal-ok-btn" style="margin-top: 20px;">Entendido</button>
            </div>
        `;
        document.body.appendChild(modalOverlay);

        // Eventos de Fechamento
        const closeBtn = modalOverlay.querySelector('.modal-close');
        const okBtn = modalOverlay.querySelector('.modal-ok-btn');

        const closeModal = () => modalOverlay.classList.remove('active');

        closeBtn.addEventListener('click', closeModal);
        okBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Alimenta o conteúdo e abre
    modalOverlay.querySelector('.modal-title').textContent = title;
    modalOverlay.querySelector('.modal-text').textContent = message;
    modalOverlay.classList.add('active');
}