let amigos = [];
let sorteioRealizado = false;
let toRemove = '';
let sorteado = '';
let sorteioIniciado = false;

// Coloca a primeira letra de cada palavra em maiúscula
function capitalizar(texto) {
    return texto.split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
        .join(' ');
}

// *Validacoes campo vazio e duplicado
const validaCampoVazio = texto => texto === '';
const validaDuplicado = amigo => amigos.includes(amigo);


// aplica validacoes e trata cada amigo no input do usuário
function validaTrataInput(amigoInput) {
  const amigo = formatarNome(amigoInput);

  if (isCampoVazio(amigo)) {
      alert('Digite o nome do amigo!');
      return;
  }

  if (!isNomeValido(amigo)) {
      alert(`Nome "${amigo}" inválido! O nome deve conter apenas letras!`);
      return;
  }

  if (isDuplicado(amigo)) {
      alert(`Amigo "${amigo}" já foi adicionado!`);
      return;
  }

  amigos.push(amigo);
}

function formatarNome(nome) {
  return capitalizar(nome.replace(/\s+/g, ' ').trim());
}

function isCampoVazio(nome) {
  return nome.length === 0;
}

function isNomeValido(nome) {
  return /^[a-zA-Zà-úÀ-Ú ]+$/u.test(nome);
}

function isDuplicado(nome) {
  return amigos.includes(nome);
}

// *Adiciona amigos à lista
function adicionarAmigo() {
    const amigoInput = document.getElementById('amigo').value;

    // *adiciona cada um de maneira separada
    if (!amigoInput.trim()) return;

    amigoInput.split(',').map(amigo => amigo.trim()).forEach(validaTrataInput);
    
    document.getElementById('resultado').innerHTML = '';
    atualizarListaAmigos();
    limparElementos("amigo");
}


// *Sorteia um amigo da lista
function sortearAmigo() {
    if (sorteioRealizado) {
        alert('Sorteio já realizado, adicione novos amigos para sortear novamente!');
        ocultarResultado();
        return;
    }

    if (!amigos.length) {
        alert('Adicione amigos para sortear!');
        return;
    }

    // *Remover amigo anterior do sorteio, se necessário
    if (toRemove) {
        amigos = amigos.filter(amigo => amigo !== toRemove);
        toRemove = '';
    }

    document.getElementById('adicionar-amigo').disabled = true;
    
    // *Sorteia um amigo aleatório
    const indiceSorteado = Math.floor(Math.random() * amigos.length);
    const sorteado = amigos[indiceSorteado];
    
    console.log('Amigos na lista:', amigos);
    console.log('Amigo sorteado:', sorteado);

    sorteioRealizado = amigos.length === 1;
    toRemove = sorteioRealizado ? '' : sorteado;

    limparElementos('amigo', 'listaAmigos');
    alterarValorElemento('resultado', sorteado);
    alterarClasseElemento("hiden-elements", "remove", "hidden");
    
    document.getElementById('auto-sorteio').disabled = sorteioRealizado;
}


// *Sorteia novamente caso o mesmo ja tenha sido sorteado
function resortearAmigo() {
    let novoSorteado;
    
    do {
        novoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
    } while (novoSorteado === sorteado);

    sorteado = novoSorteado;
    
    limparElementos('amigo', 'listaAmigos');
    alterarValorElemento('resultado', sorteado);
    
    document.getElementById('auto-sorteio').disabled = true;
}

// *Atualiza a lista de amigos 
function atualizarListaAmigos() {
    alterarValorElemento('listaAmigos', amigos.map(amigo => `<li>${amigo}</li>`).join(''));
}

// *Limpa a lista de amigos no
function reiniciarAmigoSecreto() {
    document.getElementById('adicionar-amigo').disabled = false;
    
    limparElementos('amigo', 'resultado', 'listaAmigos');
    alterarClasseElemento("hiden-elements", "add", "hidden");
    
    amigos = [];
    sorteioRealizado = false;
    sorteado = '';
    toRemove = '';
}

// *Oculta o resultado do sorteio
function ocultarResultado() {
    document.getElementById('auto-sorteio').disabled = true;
    alterarClasseElemento("hiden-elements", "add", "hidden");

    if (!sorteioRealizado) {
        alterarValorElemento('resultado', 'Continue sorteando!');
    } else {
        alterarValorElemento('resultado', '');
        reiniciarAmigoSecreto();
    }
}

// *Limpa o valor varios elementos
function limparElementos(...elementos) {
    elementos.forEach(elemento => {
        alterarValorElemento(elemento, '');
        document.getElementById(elemento).value = '';
    });
}

// *Altera o valor de um elemento 
function alterarValorElemento(elemento, valor) {
    document.getElementById(elemento).innerHTML = valor;
}

// *Adiciona ou remove classe css de um elemento
function alterarClasseElemento(elemento, acao, classe) {
    document.getElementById(elemento).classList[acao](classe);
};