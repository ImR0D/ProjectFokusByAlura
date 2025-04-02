
const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const bannerImage = document.querySelector('.app__image');
const bannerTitle = document.querySelector('.app__title');
const cardButtons = document.querySelectorAll('.app__card-button');
const playAudioButton = document.querySelector('.toggle-checkbox');
const startFokusButton = document.querySelector('#start-pause');
const startPauseTextBtn = document.querySelector("#start-pause span");
const imageStartPause = document.querySelector('.app__card-primary-button-icon');
const appCardTimer = document.querySelector('#timer');

var intervalId = null;

const musicPath = 'sons/music/';
const soundActionsPath = 'sons/actions/';

const playList = {
     0: new Audio(musicPath + 'luna-rise-part-one.mp3'),
     1: new Audio(musicPath + 'meditation-balinese-music-143993540_nw_prev.mp3'),
     2: new Audio(musicPath + '10-min-meditation-abundant-and-music-142138427_nw_prev.mp3'),
     3: new Audio(musicPath + 'cosmic-meditation-music-132411541_nw_prev.mp3'),
     4: new Audio(musicPath + 'infini-sad-acoustic-ballad-without-music-143928540_nw_prev.mp3'),
     5: new Audio(musicPath + 'acoustic-guitar-sad-melancholy-music-129789806_nw_prev.mp3'),
     6: new Audio(musicPath + 'built-different-flowing-and-urgent-music-221061019_nw_prev.mp3'),
     7: new Audio(musicPath + '249243052_nw_prev.mp3'),
     8: new Audio(musicPath + '172112107-call-destiny-epic-cinematic-mo.mp3'),
     9: new Audio(musicPath + '132703013-motivational-inspiring-emotion.mp3'),
    10: new Audio(musicPath + '065390791-inspirational-uplifting-spirit.mp3'),
};

const stopBeep = new Audio(soundActionsPath + "pause.mp3");
const playBeep = new Audio(soundActionsPath + "play.wav");
const restBeep = new Audio(soundActionsPath + "beep.mp3");

let focusSize = Object.keys(playList).length;
let audioPlaying = null;
let audioPlayingDuration = 0;

let bannerImages = {
    'foco': 'imagens/foco.png',
    'descanso-curto': 'imagens/descanso-curto.png',
    'descanso-longo': 'imagens/descanso-longo.png'
}

let bannerTitles = {
    'foco': 'Otimize sua produtividade,\n<strong class="app__title-strong">mergulhe no que importa<strong>',
    'descanso-curto': 'Que tal dar uma respirada?\n<strong class="app__title-strong">Faça uma pausa curta!<strong>',
    'descanso-longo': 'Hora de voltar à superfície.\n<strong class="app__title-strong">Faça uma pausa longa.<strong>',
}

let timerFoco = 1500;
let timerDescansoCurto = 300;
let timerDescansoLongo = 900;

let countdown = timerFoco;

focoBtn.addEventListener('click', () => {
    resetAllEventsOnChangeRestType();
    alterarContexto("foco");
    setActiveButton("foco");
    countdown = timerFoco;
    updateDisplayTime();
});

curtoBtn.addEventListener('click', () => {
    resetAllEventsOnChangeRestType();
    alterarContexto("descanso-curto");
    setActiveButton("curto");
    countdown = timerDescansoCurto;
    updateDisplayTime();
});

longoBtn.addEventListener('click', () => {
    resetAllEventsOnChangeRestType();
    alterarContexto("descanso-longo");
    setActiveButton("longo"); 
    countdown = timerDescansoLongo;
    updateDisplayTime();
});

playAudioButton.addEventListener('click', () => {
    stopPlayedSound();
    playAudioListRandomized();
    if (!playAudioButton.checked) {
        clearTimeout();
    }
});

//Contextos Disponíveis:
//foco; descanso-curto; descanso-longo

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    bannerImage.setAttribute('src', bannerImages[contexto])
    bannerTitle.innerHTML = bannerTitles[contexto];
}

function setActiveButton(contexto) {
    var classNameButton = null;
    cardButtons.forEach(element => {
        classNameButton = element.className;
        if (classNameButton.match('active')) {
            element.classList.remove('active');
        }
        if (classNameButton.match(contexto)) {
            element.classList.add('active');
        }
    });
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function playAudioListRandomized() {
    if (playAudioButton.checked) {
        faixa = getRandomInt(0, focusSize);
        audioPlaying = playList[faixa];
        audioPlaying.play();
        audioPlayingDuration = audioPlaying.duration;
        registerEvent();
    }
}

function stopPlayedSound() {
    Object.keys(playList).forEach((element) => {
        playList[element].pause()
        playList[element].currentTime = 0;
    })
}

registerEvent = function() { 
    setTimeout(() => {
        stopPlayedSound();
        playAudioListRandomized();
    }, audioPlayingDuration * 1000)
}


startFokusButton.addEventListener('click', fokusEventInterval);

let isStarted = false;
function fokusEventInterval() {
    if (isStarted) {
        isStarted = false;
        stopBeep.play();
        pauseInterval();
        return;
    } else {
        isStarted = true;
        playBeep.play();
        playInterval();
    }
}

function playInterval() {    
    if (intervalId) {
        return;
    }
    imageStartPause.setAttribute('src', '/imagens/pause.png');
    startPauseTextBtn.textContent = "Pausar";
    intervalId = setInterval(contagemRegressiva, 1000);
}

function pauseInterval() {
    imageStartPause.setAttribute('src', '/imagens/play_arrow.png');
    startPauseTextBtn.textContent = "Começar";
    clearInterval(intervalId);
    intervalId = null;
}


function contagemRegressiva() {
    updateDisplayTime();
    if (countdown <= 0) {
        restBeep.play();
        pauseInterval();
        if (playAudioButton.checked) {
            playAudioButton.click();
        };
        intervalId = 5
        return;
    }
    countdown -= 1;
}


function updateDisplayTime() {
    const time = new Date(countdown*1000);
    const formattedTime = time.toLocaleString('pt-BR', {minute: '2-digit', second: '2-digit'});
    appCardTimer.textContent = `${formattedTime}`;
}


updateDisplayTime();


// Códigos Refatorados
/*
const FokusPage = document.querySelector('html');
const ButtonFoco = document.querySelector('.app__card-button--foco');
const ButtonCurto = document.querySelector('.app__card-button--curto');
const ButtonLongo = document.querySelector('.app__card-button--longo');
const CardButtonsContainer = document.querySelectorAll('.app__card-list')[0];
const BannerImageContainer = document.querySelector('.app__image');
const BannerTitleContainer = document.querySelector('.app__title');
const ListCardButtons = document.querySelectorAll('.app__card-button');
const ButtonToggleAudio = document.querySelector('.toggle-checkbox');
const SwitchPlayPauseButton = document.querySelector('#start-pause');
const LabelPlayPauseButton = document.querySelector("#start-pause span");
const IconPlayPauseButton = document.querySelector('.app__card-primary-button-icon');
const CountdownTimer = document.querySelector('#timer');
const timerFoco =  1500;
const timerShort = 300;
const timerLong =  900;
const musicPath = 'sons/music/';
const soundActionsPath = 'sons/actions/';
const stopBeep = new Audio(soundActionsPath + "pause.mp3");
const playBeep = new Audio(soundActionsPath + "play.wav");
const restBeep = new Audio(soundActionsPath + "beep.mp3");

let audioPlayingDuration = 0;
let currentContext = "foco";
let countdown = timerFoco;
let currentMusicPlaying = undefined;
let intervalid = null;
*/

//  ========================================================
//                  List, Arrays and Tuples
//  ========================================================
/*
const PlayList = {
     0: new Audio(musicPath + 'luna-rise-part-one.mp3'),
     1: new Audio(musicPath + 'meditation-balinese-music-143993540_nw_prev.mp3'),
     2: new Audio(musicPath + '10-min-meditation-abundant-and-music-142138427_nw_prev.mp3'),
     3: new Audio(musicPath + 'cosmic-meditation-music-132411541_nw_prev.mp3'),
     4: new Audio(musicPath + 'infini-sad-acoustic-ballad-without-music-143928540_nw_prev.mp3'),
     5: new Audio(musicPath + 'acoustic-guitar-sad-melancholy-music-129789806_nw_prev.mp3'),
     6: new Audio(musicPath + 'built-different-flowing-and-urgent-music-221061019_nw_prev.mp3'),
     7: new Audio(musicPath + '249243052_nw_prev.mp3'),
     8: new Audio(musicPath + '172112107-call-destiny-epic-cinematic-mo.mp3'),
     9: new Audio(musicPath + '132703013-motivational-inspiring-emotion.mp3'),
    10: new Audio(musicPath + '065390791-inspirational-uplifting-spirit.mp3'),
};
let playListSize = Object.keys(PlayList).length;

*/

/** Ao alterar o foco da página, selecionar o item específico:
 * #### ───────────────────────────────────
 * #### Opções disponíveis:
 * ##### 'foco';
 * ##### 'descanso-curto';
 * ##### 'descanso-longo';
 */

/*
let BannerImages = {
    'foco': 'imagens/foco.png',
    'short': 'imagens/descanso-curto.png',
    'long': 'imagens/descanso-longo.png'
}

*/

/** Ao alterar o foco da página, selecionar o item específico:
 * #### ───────────────────────────────────
 * #### Opções disponíveis:
 * ##### 'foco';
 * ##### 'descanso-curto';
 * ##### 'descanso-longo';
 */

/*

let BannerTitles = {
    'foco': 'Otimize sua produtividade,\n<strong class="app__title-strong">mergulhe no que importa<strong>',
    'short': 'Que tal dar uma respirada?\n<strong class="app__title-strong">Faça uma pausa curta!<strong>',
    'long': 'Hora de voltar à superfície.\n<strong class="app__title-strong">Faça uma pausa longa.<strong>',
}

let RestTimer = {
    'foco': (timerFoco * 1000),
    'short': (timerShort * 1000),
    'long': (timerLong * 1000),
}

*/

//  ========================================================
//                      Auxiliar Functions
//  ========================================================

/*

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

registerPlayMusicEvent = function(timeout) { 
    console.log(`Started Timeout ${(timeout/60).toFixed(2)}`);
    setTimeout(selectRandomMusic, timeout * 1000);
}

unregisterPlayMusicEvent = () => {
    console.log('Stopped Music Event')
    clearTimeout(selectRandomMusic);
}

function selectRandomMusic() {
    faixa = getRandomInt(0, playListSize);
    selectedAudio = PlayList[faixa];
    return selectedAudio;
}

*/

//  ========================================================
//                    Event Functions
//  ========================================================

/*

function playMusic() {
    if (currentMusicPlaying) {
        stopMusic()
        currentMusicPlaying = undefined;
        return;
    };
    if (!(ButtonToggleAudio.checked)) return;

    let selectedMusic = selectRandomMusic();
    selectedMusic.play();
    currentMusicPlaying = selectedMusic;
    audioPlayingDuration = selectedMusic.duration;
    registerPlayMusicEvent(audioPlayingDuration);
}

function stopMusic() {
    Object.keys(PlayList).forEach((element) => {
        PlayList[element].pause()
        PlayList[element].currentTime = 0;
    })
    unregisterPlayMusicEvent();
}


function startInterval() {
    if (countdown) {
        return;
    }
    SwitchPlayPauseButton.setAttribute('src', '/imagens/pause.png');
    LabelPlayPauseButton.textContent = "Pausar";
    countdown = setInterval(contagemRegressiva, 1000);
}


function startCountdown() {
    updateCountdownTimer();
    if (countdown <= 0) {
        restBeep.play();
        pauseInterval();
        if (SwitchPlayPauseButton.checked) {
            SwitchPlayPauseButton.click();
        };
        intervalId = 5
        return;
    }
    countdown -= 1;
}

function pauseCountdown() {
    SwitchPlayPauseButton.setAttribute('src', '/imagens/play_arrow.png');
    LabelPlayPauseButton.textContent = "Começar";
    clearInterval(intervalId);
    countdown = null;
}

function stopCountdown() {
    
}

function changeActiveButton(btn) {
    parent = document.querySelectorAll('.app__card-button');

    // Remover quaisquer botão ativado
    parent.forEach(button => {
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        }
    });

    // Definir o botão selecionado como ativo
    btn.classList.add("active");
}

function changeContext(context) {
    htmlContext = (context) => {
        if (context == 'short') return 'descanso-curto'
        if (context == 'long') return 'descanso-longo'
        else return 'foco';
    }
    FokusPage.setAttribute('data-contexto', htmlContext());
    BannerImageContainer.setAttribute('src', BannerImages[context])
    BannerTitleContainer.innerHTML = BannerTitles[context];
}

function updateCountdownTimer(timer) {
    const time = new Date(timer);
    const formattedTime = time.toLocaleString('pt-BR', {minute: '2-digit', second: '2-digit'});
    CountdownTimer.textContent = `${formattedTime}`;
}
updateCountdownTimer(timerFoco * 1000);

function resetAllEventsOnChangeRestType() {}

*/
 
//  ========================================================
//                  Event Listener Buttons
//  ========================================================

/*
CardButtonsContainer.addEventListener('click', (e) => {
    element = e.target;
    parentElementType = String(element.localName).toLowerCase();
    
    if (parentElementType != 'button') {
        return;
    }

    elementContext = element.getAttribute('data-contexto');
    updateCountdownTimer(RestTimer[elementContext]);
    changeContext(elementContext)
    currentContext = elementContext;
})

ButtonFoco.addEventListener("click", () => {
    changeActiveButton(ButtonFoco);
})

ButtonCurto.addEventListener("click", () => {
    changeActiveButton(ButtonCurto);
})

ButtonLongo.addEventListener("click", () => {
    changeActiveButton(ButtonLongo);
})

ButtonToggleAudio.addEventListener("click", () => {
    console.log("Botão para Habilitar/Desabilitar Audio Clicado");
    playMusic();
})

SwitchPlayPauseButton.addEventListener("click", () => {
    console.log("Botão para iniciar/pausar/interromper a contagem Clicado");
    startInterval();
    startCountdown();
})

*/