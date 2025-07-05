// Objeto para armazenar os intervalos de piscar do cursor para cada campo
const cursorIntervals = {};
// Objeto para armazenar os intervalos de digitação para cada campo
const typingIntervals = {};

/**
 * Aplica o efeito de digitação a um elemento.
 * @param {string} elementId O ID do elemento SPAN ou DIV onde a mensagem será exibida.
 * @param {string} message A mensagem a ser digitada.
 */
function applyTypingEffect(elementId, message) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Limpa quaisquer intervalos anteriores para este elemento
    clearInterval(cursorIntervals[elementId]);
    clearInterval(typingIntervals[elementId]);

    element.textContent = ''; // Limpa o conteúdo inicial do elemento
    let i = 0;
    let currentText = '';
    const typingSpeed = 70; // Milissegundos por caractere
    const cursorBlinkSpeed = 500; // Milissegundos para o piscar do cursor

    // Função para piscar o cursor
    const blinkCursor = () => {
        if (element.textContent.endsWith('|')) {
            element.textContent = element.textContent.slice(0, -1); // Remove o cursor
        } else {
            element.textContent += '|'; // Adiciona o cursor
        }
    };

    // Inicia o piscar do cursor
    cursorIntervals[elementId] = setInterval(blinkCursor, cursorBlinkSpeed);

    // Inicia a digitação da mensagem
    typingIntervals[elementId] = setInterval(() => {
        if (i < message.length) {
            // Remove o cursor temporariamente para adicionar a letra
            if (element.textContent.endsWith('|')) {
                element.textContent = element.textContent.slice(0, -1);
            }
            currentText += message.charAt(i);
            element.textContent = currentText + '|'; // Adiciona a letra e recoloca o cursor
            i++;
        } else {
            // A mensagem terminou de digitar
            clearInterval(typingIntervals[elementId]); // Para a digitação

            // Faz o cursor piscar por mais um tempo e depois desaparece
            setTimeout(() => {
                clearInterval(cursorIntervals[elementId]); // Para o piscar
                if (element.textContent.endsWith('|')) {
                    element.textContent = element.textContent.slice(0, -1); // Remove o cursor final
                }
            }, 2000); // Pisca por mais 2 segundos depois de terminar a digitação
        }
    }, typingSpeed);
}

/**
 * Valida um campo do formulário e exibe feedback.
 * @param {HTMLInputElement | HTMLTextAreaElement} inputElement O elemento input ou textarea a ser validado.
 */
function validateField(inputElement) {
    // Determina o ID do SPAN de erro associado
    const errorSpanId = inputElement.id + '-error';
    const errorElement = document.getElementById(errorSpanId);
    
    // Limpa quaisquer efeitos de digitação e mensagens anteriores para o campo de erro específico
    clearInterval(cursorIntervals[errorSpanId]);
    clearInterval(typingIntervals[errorSpanId]);
    errorElement.textContent = '';
    errorElement.style.color = ''; // Remove a cor de erro

    let errorMessage = '';

    // Lógica de validação para cada campo
    if (inputElement.id === 'name') {
        if (inputElement.value.trim().length < 3) {
            errorMessage = "Hmm, o nome deve ter pelo menos 3 letras. Pode verificar?";
        }
    } else if (inputElement.id === 'email') {
        // Expressão regular simples para validação de e-mail (pode ser mais robusta)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputElement.value.trim())) {
            errorMessage = "Ops, este e-mail parece inválido";
        }
    } else if (inputElement.id === 'subject') {
        if (inputElement.value.trim().length < 5) {
            errorMessage = "O assunto é um pouco curto (mínimo 5 caracteres)";
        }
    } else if (inputElement.id === 'mensagem') {
        if (inputElement.value.trim().length < 10) {
            errorMessage = "Mensagem um pouco curta (mínimo 10 caracteres)";
        }
    }

    // Se houver uma mensagem de erro, exibe-a com o efeito de digitação
    if (errorMessage) {
        errorElement.style.color = 'red'; // Define a cor para a mensagem de erro
        applyTypingEffect(errorSpanId, errorMessage);
        return false; // Indica que o campo tem erro
    }
    return true; // Indica que o campo está válido
}

// Adiciona os event listeners aos campos do formulário quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const formFields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        // Opcional: Limpar o erro enquanto o usuário digita novamente
        field.addEventListener('input', () => {
            const errorSpanId = field.id + '-error';
            const errorElement = document.getElementById(errorSpanId);
            if (errorElement) {
                // Ao começar a digitar, limpa a mensagem de erro
                clearInterval(cursorIntervals[errorSpanId]);
                clearInterval(typingIntervals[errorSpanId]);
                errorElement.textContent = '';
                errorElement.style.color = '';
            }
            // **Importante:** Também limpa a mensagem de sucesso se ela estiver visível
            const successMessageElement = document.getElementById('success-message');
            if (successMessageElement) {
                clearInterval(cursorIntervals['success-message']);
                clearInterval(typingIntervals['success-message']);
                successMessageElement.textContent = '';
                successMessageElement.style.color = '';
            }
        });
    });
});

// Event listener para o SUBMIT do formulário
document.getElementById('contactForm').addEventListener('submit', (event) => {
    // SEMPRE previne o comportamento padrão de envio do formulário
    event.preventDefault(); 

    let hasErrors = false;
    const formFields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    // Valida todos os campos e verifica se há erros
    formFields.forEach(field => {
        // validateField retorna true/false, usamos isso para verificar se há erros
        if (!validateField(field)) { 
            hasErrors = true;
        }
    });

    const successMessageElement = document.getElementById('success-message');
    // Limpa qualquer mensagem de sucesso anterior antes de prosseguir
    clearInterval(cursorIntervals['success-message']);
    clearInterval(typingIntervals['success-message']);
    successMessageElement.textContent = ''; // Limpa o texto
    successMessageElement.style.color = ''; // Remove qualquer cor

    if (!hasErrors) {
        // SE NÃO HOUVER ERROS, EXIBE A MENSAGEM DE SUCESSO
        const successText = "Formulário validado com sucesso! Unicesumar, " +
            "Atividade MAPA, curso de Análise e Desenvolvimento de Sistemas - Programação Front End. " +
            "Desenvolvido por Adriano Ribeiro da Costa em junho de 2025, RA24002127-5. Obrigado professor " +
            "Edmar Alves Senne e professora Elina Mylen, vocês são incríveis! Até a próxima!";
        
        applyTypingEffect('success-message', successText); // Aplica o efeito de digitação

        // Limpar os campos do formulário após um pequeno delay para a mensagem ser lida
        // O tempo de delay considera o tempo da digitação + um tempo extra para leitura
        setTimeout(() => {
            event.target.reset(); // Limpa todos os campos do formulário
            // Limpar a mensagem de sucesso após mais um tempo
            setTimeout(() => {
                clearInterval(cursorIntervals['success-message']);
                clearInterval(typingIntervals['success-message']);
                successMessageElement.textContent = '';
                successMessageElement.style.color = '';
            }, 5000); // Mensagem de sucesso desaparece após 5 segundos
        }, successText.length * 70 + 2500); // Calcula o tempo para a digitação da mensagem + 2.5 segundos
    }

});