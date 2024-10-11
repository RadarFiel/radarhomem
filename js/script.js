(function() {
    function detectDevice() {
        // Verifica se é um dispositivo móvel
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Se não for dispositivo móvel, redireciona para /curioso.html
        if (!isMobile) {
            window.location.href = "/curioso.html";
        }
    }

    function detectEmulation() {
        const mobileMaxWidth = 768; // Largura máxima considerada como dispositivo móvel

        // Verifica se a largura da janela está dentro do esperado para dispositivos móveis
        if (window.innerWidth > mobileMaxWidth) {
            // Se a largura for maior que o máximo permitido para dispositivos móveis, redireciona
            window.location.href = "/curioso.html";
        }
    }

    // Executa a detecção de dispositivo
    detectDevice();

    // Adiciona um listener para detectar mudanças no tamanho da janela (emulação de dispositivo)
    window.addEventListener('resize', detectEmulation);
})();
