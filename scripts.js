const HTMLPageContext = document.querySelector("html");

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



// ======================================================================
// Assets Selector
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


// ======================================================================
// Auxiliar Functions: Timers
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

function changePageContext(context) {
    setContextAttribute(context)
    setContextElements(context);
}

// ======================================================================
// Auxiliar Functions: Toggle Button State
// ======================================================================

function setActiveButton(target) {
    
    // Tornar o botão ativo atual inativo.
    ButtonList.forEach(button => {
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        }
    });

    // Definir o botão selecionado como ativo
    target.classList.add("active");
}