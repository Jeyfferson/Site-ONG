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
       3. MÁSCARAS DE FORMATAÇÃO EM TEMPO REAL (CPF E TELEFONE)
       ========================================================================== */

    // Formata CPF: 000.000.000-00 (remove caracteres não numéricos e evita duplicações)
    function formatarCPF(valor) {
        const apenasNumeros = valor.replace(/\D/g, '').slice(0, 11);
        return apenasNumeros
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    // Formata Telefone/WhatsApp: (00) 00000-0000 ou (00) 0000-0000
    function formatarTelefone(valor) {
        const apenasNumeros = valor.replace(/\D/g, '').slice(0, 11);
        if (apenasNumeros.length <= 10) {
            return apenasNumeros
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        }
        return apenasNumeros
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
    }

    // Aplica as máscaras nos inputs correspondentes enquanto o usuário digita
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            e.target.value = formatarCPF(e.target.value);
        });
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            e.target.value = formatarTelefone(e.target.value);
        });
    }

    /* ==========================================================================
       4. SISTEMA DE VALIDAÇÃO E REGRAS DOS CAMPOS
       ========================================================================== */
    const form = document.getElementById('cadastroForm') || document.querySelector('form');

    if (form) {
        // Mapeamento das regras lógicas de cada campo
        const campos = {
            nome: {
                input: document.getElementById('nome'),
                error: document.getElementById('error-nome'),
                validar: (valor) => {
                    const textoLimpo = valor.trim();
                    if (!textoLimpo) return 'O nome completo é obrigatório.';
                    if (/[0-9]/.test(textoLimpo)) return 'O nome não deve conter números.';
                    if (/[^a-zA-Zà-úÀ-Ú\s']/.test(textoLimpo)) return 'O nome não deve conter caracteres especiais.';
                    if (textoLimpo.split(/\s+/).length < 2) return 'Digite seu nome e sobrenome.';
                    return '';
                }
            },
            cpf: {
                input: document.getElementById('cpf'),
                error: document.getElementById('error-cpf'),
                validar: (valor) => {
                    const numerosApenas = valor.replace(/\D/g, '');
                    if (!numerosApenas) return 'O CPF é obrigatório.';
                    if (numerosApenas.length !== 11) return 'O CPF deve conter exatamente 11 dígitos.';
                    // Validação de dígitos repetidos (ex: 111.111.111-11)
                    if (/^(\d)\1{10}$/.test(numerosApenas)) return 'Digite um CPF válido.';
                    return '';
                }
            },
            email: {
                input: document.getElementById('email'),
                error: document.getElementById('error-email'),
                validar: (valor) => {
                    const textoLimpo = valor.trim();
                    if (!textoLimpo) return 'O e-mail é obrigatório.';
                    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!regexEmail.test(textoLimpo)) return 'Digite um e-mail válido (ex: nome@dominio.com).';
                    return '';
                }
            },
            telefone: {
                input: document.getElementById('telefone'),
                error: document.getElementById('error-telefone'),
                validar: (valor) => {
                    const numerosApenas = valor.replace(/\D/g, '');
                    if (!numerosApenas) return 'O telefone / WhatsApp é obrigatório.';
                    if (numerosApenas.length < 10 || numerosApenas.length > 11) {
                        return 'O telefone deve conter o DDD + 8 ou 9 dígitos.';
                    }
                    return '';
                }
            },
            // Validações para campos adicionais caso existam no seu formulário:
            mensagem: {
                input: document.getElementById('mensagem'),
                error: document.getElementById('error-mensagem'),
                validar: (valor) => {
                    if (valor && valor.trim().length > 0 && valor.trim().length < 10) {
                        return 'A mensagem deve ter pelo menos 10 caracteres.';
                    }
                    return '';
                }
            },
            termos: {
                input: document.getElementById('termos'),
                error: document.getElementById('error-termos'),
                validar: (input) => {
                    if (input && input.type === 'checkbox' && !input.checked) {
                        return 'Você precisa aceitar os termos para continuar.';
                    }
                    return '';
                }
            }
        };

        // Função de validação individual por campo
        function validarCampo(campoKey) {
            const campo = campos[campoKey];
            if (!campo || !campo.input || !campo.error) return true;

            // Para checkboxes passa o elemento input, para os demais passa o valor string
            const valorOuElemento = campo.input.type === 'checkbox' ? campo.input : campo.input.value;
            const mensagemErro = campo.validar(valorOuElemento);

            if (mensagemErro !== '') {
                campo.error.textContent = mensagemErro;
                campo.error.classList.add('active');
                campo.input.classList.add('input-error');
                return false; // Retorna Inválido
            } else {
                campo.error.textContent = '';
                campo.error.classList.remove('active');
                campo.input.classList.remove('input-error');
                return true; // Retorna Válido
            }
        }

        // Validação em tempo real (nos eventos 'input', 'blur' e 'change')
        Object.keys(campos).forEach(key => {
            const campo = campos[key];
            if (campo.input) {
                const eventoTipo = campo.input.type === 'checkbox' ? 'change' : 'input';
                campo.input.addEventListener(eventoTipo, () => validarCampo(key));
                campo.input.addEventListener('blur', () => validarCampo(key));
            }
        });

        /* ==========================================================================
           5. INTERCEPTAÇÃO RIGOROSA DO SUBMIT
           ========================================================================== */
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede recarga da página e envio padrão

            let formValido = true;

            // Valida obrigatoriamente todos os campos no momento do clique
            Object.keys(campos).forEach(key => {
                const ehValido = validarCampo(key);
                if (!ehValido) {
                    formValido = false;
                }
            });

            // Se houver qualquer erro, cancela e foca no primeiro campo com falha
            if (!formValido) {
                const primeiroErro = document.querySelector('.input-error');
                if (primeiroErro) {
                    primeiroErro.focus();
                }
                return; // Interrompe e NÃO abre o modal!
            }

            // SE ESTIVER 100% CORRETO: Dispara o modal de confirmação
            openModal(
                'Cadastro Realizado com Sucesso!',
                'Obrigado por se voluntariar para a ONG FLORECER. Entraremos em contato em breve através do seu WhatsApp.'
            );

            // Reseta o formulário e remove os estilos de erro/sucesso
            form.reset();
            Object.keys(campos).forEach(key => {
                if (campos[key].error) campos[key].error.classList.remove('active');
                if (campos[key].input) campos[key].input.classList.remove('input-error');
            });
        });
    }
});

/* ==========================================================================
   6. SISTEMA DINÂMICO DE MODAL
   ========================================================================== */
function openModal(title, message) {
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

        const closeBtn = modalOverlay.querySelector('.modal-close');
        const okBtn = modalOverlay.querySelector('.modal-ok-btn');

        const closeModal = () => modalOverlay.classList.remove('active');

        closeBtn.addEventListener('click', closeModal);
        okBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    modalOverlay.querySelector('.modal-title').textContent = title;
    modalOverlay.querySelector('.modal-text').textContent = message;
    modalOverlay.classList.add('active');
}