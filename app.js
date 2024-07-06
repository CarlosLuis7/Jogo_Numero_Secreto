//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';
let listaDeNumerosSorteado = [];
let numeroLimite = 10;
let numeroScreto = geraNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p',`Escolha um numero entre 1 e ${numeroLimite}`);
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    //console.log(chute == numeroScreto);

     if(chute == numeroScreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o númenro secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
     } else {
        if(chute > numeroScreto) {
            exibirTextoNaTela('p', 'O número secreto é Menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é Maior');
        }
        tentativas++;
        limpaCampo();
     }
}

function geraNumeroAleatorio() {
    //return parseInt(Math.random() * 10 + 1);
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quntidadeDeElementosNaLista = listaDeNumerosSorteado.length;

    if(quntidadeDeElementosNaLista  == numeroLimite) {
        listaDeNumerosSorteado = [];
    }
    
    if(listaDeNumerosSorteado.includes(numeroEscolhido)) {
        return geraNumeroAleatorio();
    } else {
        listaDeNumerosSorteado.push(numeroEscolhido);
        console.log(listaDeNumerosSorteado);
        return numeroEscolhido;
    }
}

function limpaCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroScreto = geraNumeroAleatorio();
    limpaCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    //document.getElementById('reiniciar').setAttribute('disabled', true);

}
