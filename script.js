const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const startPauseBt = document.querySelector('#start-pause')
const somPlay = new Audio('/sons/play.wav')
const somPause = new Audio('/sons/pause.mp3')
const somFinalizado = new Audio('./sons/beep.mp3')
const iniciarPausarBt = document.querySelector('#start-pause span')
const tempoTela =  document.querySelector('#timer')
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") 

let tempoPercorridoEmSegundos = 1500
let intrervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

focoBt.addEventListener('click', () =>{
    tempoPercorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () =>{
    tempoPercorridoEmSegundos = 300
   alterarContexto('descanso-curto')
   curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () =>{
    tempoPercorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = 
            `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada <strong class="app__title-strong">Faça uma parada.</strong>`
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
    default:

        break;
    }
}


const contagemRegreciva = () => {
    if(tempoPercorridoEmSegundos <= 0) {
        zerar();
        somFinalizado.play();
        alert('Tempo finalizado!');
        return;
    }
    tempoPercorridoEmSegundos -=1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(intrervaloId){
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();
    intrervaloId = setInterval(contagemRegreciva, 1000);
    iniciarPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar(){
    clearInterval(intrervaloId);
    iniciarPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intrervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoPercorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo();