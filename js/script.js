document.addEventListener('DOMContentLoaded', () => {
    const inputTelefone = document.getElementById('telefone');
    const msgErro = document.getElementById('telefone-erro');
    const form = document.querySelector('form');

    // 1. Aplica a máscara dinâmica enquanto o usuário digita
    inputTelefone.addEventListener('input', (e) => {
        let valor = e.target.value;

        // Remove tudo que não for dígito
        valor = valor.replace(/\D/g, '');

        // Limita a 11 dígitos (DDD + 9 dígitos)
        if (valor.length > 11) {
            valor = valor.slice(0, 11);
        }

        // Aplica a formatação dinamicamente
        if (valor.length > 10) {
            // Celular: (XX) XXXXX-XXXX
            valor = valor.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (valor.length > 6) {
            // Fixo ou Celular incompleto: (XX) XXXX-XXXX
            valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (valor.length > 2) {
            // DDD formatado: (XX) XXXX...
            valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (valor.length > 0) {
            // Apenas DDD inicial
            valor = valor.replace(/^(\d*)/, '($1');
        }

        e.target.value = valor;
    });

    // 2. Valida o campo ao perder o foco (blur) ou ao enviar
    function validarTelefone() {
        // Remove caracteres não numéricos para verificar a quantidade de dígitos reais
        const apenasNumeros = inputTelefone.value.replace(/\D/g, '');

        // Um telefone no Brasil deve ter 10 (fixo) ou 11 (celular) dígitos com DDD
        if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
            msgErro.style.display = 'block';
            inputTelefone.style.borderColor = 'red';
            return false;
        } else {
            msgErro.style.display = 'none';
            inputTelefone.style.borderColor = 'green';
            return true;
        }
    }

    inputTelefone.addEventListener('blur', validarTelefone);

    // 3. Impede o envio do formulário se o telefone for inválido
    if (form) {
        form.addEventListener('submit', (e) => {
            if (!validarTelefone()) {
                e.preventDefault(); // Cancela o envio
                inputTelefone.focus();
            }
        });
    }
});