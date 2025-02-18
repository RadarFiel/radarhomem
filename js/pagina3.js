document.addEventListener('DOMContentLoaded', function () {
    // Obtém o parâmetro 'pessoa' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const pessoa = urlParams.get('pessoa'); // homem ou mulher

    // Seleciona os elementos de imagem e áudio pelo ID
    const imgElement = document.getElementById('imgaudio');
    const audioElement = document.getElementById('audiomp3');

    // Verifica se os elementos existem
    if (imgElement && audioElement) {
        // Verifica o valor do parâmetro 'pessoa' e ajusta a imagem e o áudio 
        if (pessoa === 'homem') {
            imgElement.src = 'https://i.ibb.co/27mDL9M/HOMEM.png';
            audioElement.src = 'https://espiaodesegredo.com/wp-content/uploads/2024/09/0919.mp3';
        } else if (pessoa === 'mulher') {
            imgElement.src = 'https://i.ibb.co/K2YQ8nF/MULHER.png';
            audioElement.src = 'https://espiaodesegredo.com/wp-content/uploads/2024/09/mulher.mp3';
        }
    } else {
        console.error('Elementos de imagem ou áudio não encontrados!');
    }

    // Função para definir o player e eventos de áudio
    const player = new Plyr('.plyr', {
        controls: ['play', 'progress', 'current-time', 'duration']
    });

    const audioElementPlyr = document.querySelector('.plyr');
    const currentTimeElement = document.querySelector('.plyr__time--current');
    const durationElement = document.querySelector('.plyr__time--duration');
    const microphoneIcon = document.querySelector('.microphone-icon');

    // Verifica se os elementos do controle de áudio existem antes de tentar manipulá-los
    if (audioElementPlyr && currentTimeElement && durationElement && microphoneIcon) {
        currentTimeElement.classList.add('hide'); // Adiciona a classe 'hide' ao iniciar

        audioElementPlyr.addEventListener('play', function () {
            currentTimeElement.classList.remove('hide');
            durationElement.classList.add('hide');
            microphoneIcon.classList.add('blue'); // Adiciona a classe 'blue' para alterar a cor do ícone
            audioElementPlyr.classList.add('blue'); // Adiciona a classe 'blue' para alterar o background do controle deslizante
            audioElementPlyr.style.setProperty('--range-thumb-background', '#3db8ee');
        });

        audioElementPlyr.addEventListener('pause', function () {
            currentTimeElement.classList.add('hide');
            durationElement.classList.remove('hide');
        });
    } else {
        console.error('Elementos de controle de áudio não encontrados!');
    }

    const audioContainer = document.getElementById('audioContainer');
    const playPauseButton = audioContainer?.querySelector('.plyr__controls button[data-plyr="play"]');
    const audioBox = document.querySelector('.audio-box');

    // Verifica se os elementos de áudio e controle existem antes de adicionar eventos
    if (audioContainer && playPauseButton && audioBox) {
        audioContainer.addEventListener('click', function () {
            playPauseButton.click();
        });

        playPauseButton.addEventListener('click', function () {
            playPauseButton.click();
        });

        audioBox.addEventListener('click', function (event) {
            event.stopPropagation();
            playPauseButton.click();
        });
    } else {
        if (!audioContainer) {
            console.error('Elemento audioContainer não encontrado!');
        }
        if (!playPauseButton) {
            console.error('Elemento playPauseButton não encontrado!');
        }
        if (!audioBox) {
            console.error('Elemento audioBox não encontrado!');
        }
    }

    // Quando o usuário acessa a pagina3.html, marcamos no localStorage
    sessionStorage.setItem('accessedFinalPage', 'true');

    var urlBackRedirect = 'https://radarfiel.github.io/backredirect/'; // lembre-se de usar a url sem espaços

    // Formata a URL para redirecionamento
    urlBackRedirect = urlBackRedirect.trim() +
        (urlBackRedirect.indexOf("?") > 0 ? '&' : '?') +
        document.location.search.replace('?', '').toString();

    // Adiciona duas entradas no histórico para manipulação
    history.pushState({}, "", location.href);
    history.pushState({}, "", location.href);

    // Função para redirecionar para a página de backredirect
    function redirectToBack() {
        setTimeout(function () {
            location.href = urlBackRedirect;
        }, 1);
    }

    // Detecta o uso do botão de voltar do navegador
    window.onpopstate = redirectToBack;

    // Verifica se o site está sendo executado localmente (file://)
    if (window.location.protocol === 'file:') {
        // Destrói o conteúdo da página
        document.body.innerHTML = '<h1>AQUI SEU CURIOSO!</h1><img src="https://espiaodesegredo.com/wp-content/uploads/2022/07/weekend-ending-middle-finger.gif" alt="Curioso GIF">';
    }

    const pessoaParam = urlParams.get('pessoa'); // homem ou mulher
    let phoneNumber = urlParams.get('number'); // número da pessoa

    // Adiciona o prefixo +55 ao número
    if (!phoneNumber.startsWith('+55')) {
        phoneNumber = `+55${phoneNumber.replace(/\D/g, '')}`;
    }

    // Função para formatar o número no estilo +55 {DDD} 9
    function getPhoneInitial(number) {
        let cleanNumber = number.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (cleanNumber.startsWith('55')) {
            cleanNumber = cleanNumber.slice(2); // Remove o prefixo 55
        }

        const match = cleanNumber.match(/^(\d{2})(\d)/); // Extrai o DDD e o primeiro dígito do número
        if (match) {
            return `+55 ${match[1]} ${match[2]}`;
        }
        return '+55'; // Retorno padrão caso a formatação não corresponda
    }

    // Função para converter os bytes da imagem para base64 e formatar
    function formatBase64Image(dadosImagem) {
        const imagemBase64 = btoa(dadosImagem);
        const linhaSemBarra = imagemBase64.replace(/\//g, "_");
        return linhaSemBarra.replace(/[^a-zA-Z0-9_]/g, "");
    }

    // Função para buscar a foto de perfil usando a nova API
async function fetchProfilePicture(phoneNumber) {
    const apiUrl = `https://radarfiel.com/api/whats.php?numero=${phoneNumber}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.profilePictureUrl) {
            const base64Image = formatBase64Image(data.profilePictureUrl);
            return base64Image;
        } else {
            return formatBase64Image('https://i.ibb.co/dBTfnyy/Design-sem-nome-2.jpg');
        }
    } catch (error) {
        return formatBase64Image('https://i.ibb.co/dBTfnyy/Design-sem-nome-2.jpg');
    }
}


    // Função para buscar a cidade e o nome do motel usando a nova API PHP
    async function fetchCityAndMotel() {
        let userCity = 'Desconhecida';
        let motelNome = 'Motel não localizado';

        // Busca a cidade
        try {
            const response = await fetch("https://ipapi.co/json/");
            const result = await response.json();
            userCity = result.city || 'Desconhecida';

            // Busca o nome do motel usando a nova API em PHP
            const apiUrl = `https://vejawhats.site/api/motel.php?cidade=${encodeURIComponent(userCity)}`;
            const motelResponse = await fetch(apiUrl);
            const motelData = await motelResponse.json();

            if (motelData.status === 'success') {
                motelNome = motelData.motel.name || 'Motel não localizado';
            }

            setMapImage(userCity, motelNome);
            updateCityAndMotel(userCity, motelNome); // Atualiza o nome da cidade e motel no HTML
        } catch (error) {
            console.error('Erro ao buscar a cidade e motel:', error);
            setMapImage(userCity, motelNome);
            updateCityAndMotel(userCity, motelNome); // Atualiza o nome da cidade e motel no HTML
        }
    }

    // Função para atualizar o nome da cidade e do motel no HTML
    function updateCityAndMotel(city, motel) {
        // Define o nome da cidade
        const cityNameElement = document.getElementById('city-name');
        if (cityNameElement) {
            cityNameElement.textContent = city;
        }

        // Define o nome do motel
        const motelNameElement = document.getElementById('motel-name');
        if (motelNameElement) {
            motelNameElement.textContent = motel;
        }
    }

    function setMapImage(city, motel) {
        const mapImage = document.getElementById('map-image');
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=512x312&maptype=roadmap&markers=color:red%7C${encodeURIComponent(motel)}+${encodeURIComponent(city)}&key=AIzaSyAREgeFZ0TzPNlq2JhR7452ZH5GFvGq2WQ`;
        mapImage.src = mapUrl;
    }

    // Função para definir o texto com base no gênero
    function updateTextByGender() {
        const genderSensitiveText = document.getElementById('gender-sensitive-text');
        if (pessoaParam === 'homem') {
            genderSensitiveText.innerHTML = '13 mensagens continham a palavra / semelhante "<strong>Gostosa</strong>"';
        } else {
            genderSensitiveText.innerHTML = '13 mensagens continham a palavra / semelhante "<strong>Gostoso</strong>"';
        }
    }

    // Função para definir as URLs das imagens com base no gênero
    async function setImageUrl() {
        const base64Image = await fetchProfilePicture(phoneNumber);

        const primeiraIMGHomem = `https://res.cloudinary.com/dcrbilmuv/image/upload/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/e_pixelate:9/fl_layer_apply,x_-292,y_900/l_hqei4bnym6ocodhjhoi6/e_pixelate:9/fl_layer_apply,x_-232,y_930/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/e_pixelate:9/fl_layer_apply,x_-292,y_503/l_hqei4bnym6ocodhjhoi6/e_pixelate:9/fl_layer_apply,x_-232,y_533/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/e_pixelate:9/fl_layer_apply,x_-292,y_340/l_hqei4bnym6ocodhjhoi6/e_pixelate:9/fl_layer_apply,x_-232,y_370/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/fl_layer_apply,x_-292,y_-145/l_hqei4bnym6ocodhjhoi6/fl_layer_apply,x_-232,y_-107/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/fl_layer_apply,x_-292,y_-635/l_hqei4bnym6ocodhjhoi6/fl_layer_apply,x_-232,y_-595/co_rgb:FFFFFF,l_text:roboto_45_bold_normal_left:${getPhoneInitial(phoneNumber)}/fl_layer_apply,x_-265,y_-957/vxa1octya6in31xp5hjd.jpg`;

        const primeiraIMGMulher = `https://res.cloudinary.com/dcrbilmuv/image/upload/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/e_pixelate:9/fl_layer_apply,x_-292,y_750/l_hqei4bnym6ocodhjhoi6/e_pixelate:9/fl_layer_apply,x_-232,y_790/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/e_pixelate:9/fl_layer_apply,x_-292,y_573/l_hqei4bnym6ocodhjhoi6/e_pixelate:9/fl_layer_apply,x_-232,y_613/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/e_pixelate:9/fl_layer_apply,x_-292,y_397/l_hqei4bnym6ocodhjhoi6/e_pixelate:9/fl_layer_apply,x_-232,y_437/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/e_pixelate:9/fl_layer_apply,x_-292,y_220/l_hqei4bnym6ocodhjhoi6/e_pixelate:9/fl_layer_apply,x_-232,y_260/l_fetch:${base64Image},w_130,h_130,c_fit,r_max/fl_layer_apply,x_-292,y_-334/l_hqei4bnym6ocodhjhoi6/fl_layer_apply,x_-232,y_-294/co_rgb:FFFFFF,l_text:roboto_45_bold_normal_left:${getPhoneInitial(phoneNumber)}/fl_layer_apply,x_-265,y_-800/xduhgl2xccfsssdsgopi.jpg`;

        const segundaIMGHomem = `https://res.cloudinary.com/dcrbilmuv/image/upload/co_rgb:000000,l_text:roboto_55_normal_left:${getPhoneInitial(phoneNumber)}/fl_layer_apply,g_center,x_-217,y_-70/co_rgb:000000,l_text:roboto_55_normal_left:${getPhoneInitial(phoneNumber)}/fl_layer_apply,g_center,x_-217,y_160/qdpxpv8omom54dmmpr5t.jpg`;

        const segundaIMGMulher = `https://res.cloudinary.com/dcrbilmuv/image/upload/co_rgb:000000,l_text:roboto_55_normal_left:${getPhoneInitial(phoneNumber)}/fl_layer_apply,g_center,x_-217,y_-70/co_rgb:000000,l_text:roboto_55_normal_left:${getPhoneInitial(phoneNumber)}/fl_layer_apply,g_center,x_-217,y_160/y0uumku4qzmoehssgb48.jpg`;

        const terceiraIMGHomem = 'assets/images/homem-fotos.jpg';
        const terceiraIMGMulher = 'assets/images/mulher-fotos.jpg';

        // Define as URLs das imagens com base no sexo
        document.getElementById('primeira-imagem').src = pessoaParam === 'homem' ? primeiraIMGHomem : primeiraIMGMulher;
        document.getElementById('segunda-imagem').src = pessoaParam === 'homem' ? segundaIMGHomem : segundaIMGMulher;
        document.getElementById('terceira-imagem').src = pessoaParam === 'homem' ? terceiraIMGHomem : terceiraIMGMulher;

        // Chama a função para buscar cidade e motel
        fetchCityAndMotel();
        updateTextByGender();
    }

    // Chama a função para definir as URLs das imagens
    setImageUrl();

    let messageCounts = {
        "mensagem suspeita encontrada": 1,
        "foto suspeita encontrada": 1,
        "localização suspeita encontrada": 1,
        "ligação suspeita encontrada": 1,
        "mensagem apagada encontrada": 1,
        "mensagem arquivada encontrada": 1
    };

    // Função para gerar notificações aleatórias
    function createNotification() {
        const notificationContainer = document.getElementById('notification-container');

        // Randomiza a mensagem a ser exibida
        const messages = Object.keys(messageCounts);
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const messageCount = messageCounts[randomMessage];

        // Atualiza a contagem da mensagem
        messageCounts[randomMessage] += 1;

        // Cria o elemento da notificação
        const notification = document.createElement('div');
        notification.classList.add('notification');

        notification.innerHTML = `
            <img src="assets/images/icone.png" alt="WhatsApp">
            <div class="notification-text">
                <strong>RadarFiel</strong><br>
                ${messageCount} ${randomMessage}
            </div>
            <button class="close-btn">×</button>
        `;

        // Adiciona evento para fechar a notificação ao clicar no "x"
        notification.querySelector('.close-btn').addEventListener('click', function () {
            closeNotification(notification);
        });

        // Adiciona evento para exibir o popup ao clicar na notificação
        notification.addEventListener('click', function () {
            showPopup();
        });

        // Adiciona a notificação ao container
        notificationContainer.appendChild(notification);

        // Remove a notificação após 3 segundos automaticamente, se não for fechada
        setTimeout(() => {
            closeNotification(notification);
        }, 3000);

        // Permite fechar a notificação arrastando para o lado
        notification.addEventListener('touchstart', handleSwipeStart, false);
        notification.addEventListener('touchmove', handleSwipeMove, false);
        notification.addEventListener('touchend', handleSwipeEnd.bind(null, notification), false);
    }

    // Função para fechar a notificação com animação
    function closeNotification(notification) {
        notification.style.animation = 'slide-out 0.5s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 500); // Aguarda o tempo da animação para remover
    }

    // Funções de controle para detectar o movimento de swipe (arrastar)
    let swipeStartX = 0;

    function handleSwipeStart(event) {
        swipeStartX = event.touches[0].clientX;
    }

    function handleSwipeMove(event) {
        const currentX = event.touches[0].clientX;
        const diffX = currentX - swipeStartX;

        if (diffX > 0) {
            event.target.style.transform = `translateX(${diffX}px)`;
        }
    }

    function handleSwipeEnd(notification, event) {
        const diffX = event.changedTouches[0].clientX - swipeStartX;

        if (diffX > 150) {
            closeNotification(notification); // Fechar a notificação se arrastada o suficiente
        } else {
            notification.style.transform = 'translateX(0)'; // Voltar à posição original
        }
    }

    // Função para exibir o popup
    function showPopup() {
        const popupOverlay = document.getElementById('popup-overlay');
        popupOverlay.style.display = 'flex';
    }

    // Função para fechar o popup
    function closePopup() {
        const popupOverlay = document.getElementById('popup-overlay');
        popupOverlay.style.display = 'none';
    }

    // Adiciona o evento de fechar o popup
    document.querySelector('.close-popup').addEventListener('click', closePopup);

    // Função para gerar notificações a cada intervalo de tempo aleatório
    function startNotifications() {
        setTimeout(() => {
            createNotification(); // Primeira notificação após 15 segundos

            setInterval(() => {
                createNotification(); // Notificações subsequentes variando de 8 a 20 segundos
            }, Math.floor(Math.random() * 12000) + 8000); // A cada 8 a 20 segundos
        }, 15000); // Primeira notificação após 15 segundos
    }

    // Iniciar as notificações
    startNotifications();
});
