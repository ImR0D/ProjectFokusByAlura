const HTMLPageContext = document.querySelector("html");

// OnLoad Body Event
document.body.onload = async () => {
    setTimerContext(CurrentContext);
    updateDisplayTime();
}

// ======================================================================
// Banner
// ======================================================================
const BannerContainerTitleNormal = document.querySelector('.app__title');
const BannerContainerTitleNormalText = BannerContainerTitleNormal.childNodes[0];
const BannerContainerTitleBold = document.querySelector('.app__title-strong');
const BannerContainerImage = document.querySelector('.app__image');

// ======================================================================
// Buttons
// ======================================================================
const ButtonListContainer = document.querySelector('.app__card-list');
const ButtonList = document.querySelectorAll('.app__card-button');
const ButtonFoco = document.querySelector('.app__card-button--foco');
const ButtonDescansoCurto = document.querySelector('.app__card-button--curto');
const ButtonDescansoLongo = document.querySelector('.app__card-button--longo')

// Toogle Switch
const ToggleMusicState = document.querySelector('.toggle-checkbox')
const ButtonSwitchMusic = document.querySelector('.toggle-switch');

// Button Start/Pause Pomodoro
const ButtonStartPause = document.querySelector('#start-pause');
const ImageStartPause = document.querySelector('.app__card-primary-button-icon')
const TextStartPause = ButtonStartPause.children[1];

// Timer
const TimerCardDisplay = document.querySelector("#timer");


// ======================================================================
// Variables: Page States
// ======================================================================
let CurrentContext = 'foco';
let CurrentAudioMusicPlaying = undefined;
let CurrentAudioMusicPlayingDurationInMinutes = 0;
let CurrentAudioMusicPlayingDurationInMilliseconds = 0;
let CurrentStartPauseButtonState = 'start';
let TimerCountdown = 0;
let TimerInterval = 0;

let hasMusicPlaying = () => {
    if (CurrentAudioMusicPlaying && CurrentAudioMusicPlayingDurationInMinutes > 0) return true;
    return false;
}

// ======================================================================
// Assets Selector & Paths
// ======================================================================

const BannerImages = {
    'foco':  'imagens/foco.png',
    'short': 'imagens/descanso-curto.png',
    'long':  'imagens/descanso-longo.png'
}

const BannerTitles = {
    'foco':  'Otimize sua produtividade',
    'short': 'Que tal dar uma respirada?',
    'long':  'Hora de voltar à superfície.'
}

const BannerSubTitles = {
    'foco':  'mergulhe no que importa',
    'short': 'Faça uma pausa curta!',
    'long':  'Faça uma pausa longa.'
}

const ContextTypes = {
    'foco':  'foco',
    'short': 'descanso-curto',
    'long':  'descanso-longo'
}

const ContextTimersInMinutes = {
    'foco':  25,
    'short': 5,
    'long':  15
}

const PathAssetsSoundMusics = "sons/music/"
const PathAssetsSoundActions = "sons/actions/"

const PlayList = {
    0: new Audio(PathAssetsSoundMusics + 'luna-rise-part-one.mp3'),
    1: new Audio(PathAssetsSoundMusics + 'meditation-balinese-music-143993540_nw_prev.mp3'),
    2: new Audio(PathAssetsSoundMusics + '10-min-meditation-abundant-and-music-142138427_nw_prev.mp3'),
    3: new Audio(PathAssetsSoundMusics + 'cosmic-meditation-music-132411541_nw_prev.mp3'),
    4: new Audio(PathAssetsSoundMusics + 'infini-sad-acoustic-ballad-without-music-143928540_nw_prev.mp3'),
    5: new Audio(PathAssetsSoundMusics + 'acoustic-guitar-sad-melancholy-music-129789806_nw_prev.mp3'),
    6: new Audio(PathAssetsSoundMusics + 'built-different-flowing-and-urgent-music-221061019_nw_prev.mp3'),
    7: new Audio(PathAssetsSoundMusics + '249243052_nw_prev.mp3'),
    8: new Audio(PathAssetsSoundMusics + '172112107-call-destiny-epic-cinematic-mo.mp3'),
    9: new Audio(PathAssetsSoundMusics + '132703013-motivational-inspiring-emotion.mp3'),
   10: new Audio(PathAssetsSoundMusics + '065390791-inspirational-uplifting-spirit.mp3'),
};
const PlayListSize = Object.keys(PlayList).length;

const ActionSoundPause = new Audio(PathAssetsSoundActions + "pause.mp3");
const ActionSoundPlay  = new Audio(PathAssetsSoundActions + "play.wav");
const ActionSoundBeep  = new Audio(PathAssetsSoundActions + "beep.mp3");
const ActionSoundSlide  = new Audio(PathAssetsSoundActions + "slide-click.mp3");

// ======================================================================
// Auxiliar Functions: Get Random Integer Value
// ======================================================================

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// ======================================================================
// Auxiliar Functions: Timers and Countdown
// ======================================================================

function convMinutesInSeconds(value) {
    return (value * 60);
}

function convMinutesInMiliseconds(value) {
    return convMinutesInSeconds(value) * 1000;
}

function convSecondsInMinutes(value) {
    return (value / 60);
}

function convMilisecondsInMinutes(value) {
    return convSecondsInMinutes(value) / 1000;
}

function Countdown() {
    updateDisplayTime();
    if (TimerCountdown <= 0) {
        ActionSoundBeep.play();
        stopCountdown();
        unregisterCountdownEvent();
        changePlayButtonState('start');
        if (hasMusicPlaying()) {
            stopMusic();
        }
        TimerCountdown = ContextTimersInMinutes[CurrentContext];
        updateDisplayTime();
        return;
    }
    TimerCountdown -= 0.01;
}

function startCountdown() {
    ActionSoundPlay.play()
    if (TimerInterval) {
        return;
    }
    changePlayButtonState('play');
    TimerInterval = registerCountdownEvent();
}

function stopCountdown() {
    ActionSoundPause.play()
    if (TimerCountdown <= 0) {
        changePlayButtonState('start');
    }
    clearInterval(TimerInterval);
    TimerInterval = null;
}

function updateDisplayTime() {
    const timer = new Date(convMinutesInMiliseconds(TimerCountdown) );
    const formattedTimer = timer.toLocaleString('pt-BR', {minute: '2-digit', second: '2-digit'});
    TimerCardDisplay.textContent = `${formattedTimer}`
}

// ======================================================================
// Auxiliar Functions: Page Context
// ======================================================================

function setContextAttribute(context) {
    HTMLPageContext.setAttribute('data-contexto', ContextTypes[context]);
}

function setContextElements(context) {
    BannerContainerImage.setAttribute('src', BannerImages[context])
    BannerContainerTitleNormalText.textContent = BannerTitles[context];
    BannerContainerTitleBold.textContent = BannerSubTitles[context]
}

function setTimerContext(context) {
    TimerCountdown = ContextTimersInMinutes[context];
}

function changePageContext(context) {
    setContextAttribute(context)
    setContextElements(context);
    setTimerContext(context);
    CurrentContext = context;
    updateDisplayTime();
}

// ======================================================================
// Auxiliar Functions: Toggle Button State
// ======================================================================

function setActiveButton(target) {
    if (target.classList.contains('active')) return;
    // Tornar o botão ativo atual inativo.
    ButtonList.forEach(button => {
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        }
    });

    // Definir o botão selecionado como ativo
    target.classList.add("active");
}

/**
 * ### Possible States:
 * - #### play
 * - #### pause
 * - #### start
 * @param {*} state 
 */
function changePlayButtonState(state) {
    if (state == 'play') {
        ImageStartPause.setAttribute('src', '/imagens/pause.png')
        TextStartPause.textContent = 'Parar'
        CurrentStartPauseButtonState = 'play';
    } else if (state == 'pause') {
        ImageStartPause.setAttribute('src', '/imagens/play_arrow.png')
        TextStartPause.textContent = 'Continuar'
        CurrentStartPauseButtonState = 'pause';
    } else if (state == 'start') {
        ImageStartPause.setAttribute('src', '/imagens/play_arrow.png')
        TextStartPause.textContent = 'Começar'
        CurrentStartPauseButtonState = 'start';
    }
    return;
}

function stopAllEvents(providerEvent) {
    if (!(providerEvent instanceof PointerEvent)) return;
    if (CurrentAudioMusicPlaying) { 
        stopMusic()
    };
    if (TimerInterval) { 
        stopCountdown();
        ButtonStartPause.click();
        TimerCountdown = setTimerContext(CurrentContext);
    }
    changePlayButtonState('start');
}




// ======================================================================
// Auxiliar Functions: Play Sounds & Effect Sounds
// ======================================================================

function playMusic() {
    if (CurrentAudioMusicPlaying) {
        stopMusic()
        CurrentAudioMusicPlaying = undefined;
        unregisterPlayMusicEvent();
        return;
    };
    if (!(ToggleMusicState.checked)) return;

    let selectedMusic = selectRandomMusic();
    CurrentAudioMusicPlaying = selectedMusic;
    CurrentAudioMusicPlayingDurationInMinutes = selectedMusic.duration;
    CurrentAudioMusicPlayingDurationInMilliseconds = convMinutesInMiliseconds(selectedMusic.duration);
    registerPlayMusicEvent(CurrentAudioMusicPlayingDurationInMilliseconds);
    CurrentAudioMusicPlaying.play();
}

function selectRandomMusic() {
    let track = getRandomInteger(0, PlayListSize);
    selectedAudio = PlayList[track];
    return selectedAudio;
}

function stopMusic() {
    CurrentAudioMusicPlayingDurationInMinutes = 0;
    Object.keys(PlayList).forEach((element) => {
        PlayList[element].pause()
        PlayList[element].currentTime = 0;
    })
    ToggleMusicState.click();
    unregisterPlayMusicEvent();
}


// ======================================================================
// Register Events
// ======================================================================

registerCountdownEvent = () => {
    return setInterval(Countdown, 1000)
}

unregisterCountdownEvent = () => {
    clearInterval(Countdown);
    TimerCountdown = setTimerContext(CurrentContext);
}

registerPlayMusicEvent = function(duration) { 
    setTimeout(playMusic, duration);
}

unregisterPlayMusicEvent = () => {
    clearTimeout(playMusic);
}

// ======================================================================
// BUTTON EVENT LISTENER
// ======================================================================

ButtonFoco.addEventListener('click', (e) => {
    stopAllEvents(e);
    setTimerContext(CurrentContext);
    setActiveButton(ButtonFoco);
    changePageContext(ButtonFoco.getAttribute('data-contexto'));
})

ButtonDescansoCurto.addEventListener('click', (e) => {
    stopAllEvents(e);
    setTimerContext(CurrentContext);
    setActiveButton(ButtonDescansoCurto);
    changePageContext(ButtonDescansoCurto.getAttribute('data-contexto'));
})

ButtonDescansoLongo.addEventListener('click', (e) => {
    stopAllEvents(e);
    setTimerContext(CurrentContext);
    setActiveButton(ButtonDescansoLongo);
    changePageContext(ButtonDescansoLongo.getAttribute('data-contexto'));
})

ToggleMusicState.addEventListener('click', () => {
    ActionSoundSlide.play();
    playMusic();
})

ButtonStartPause.addEventListener('click', () => {
    if (CurrentStartPauseButtonState == 'start' || CurrentStartPauseButtonState == 'pause') {
        changePlayButtonState('play');
        startCountdown();
    } else if (CurrentStartPauseButtonState == 'play') {
        changePlayButtonState('pause');
        stopCountdown();
    }
    return;
});