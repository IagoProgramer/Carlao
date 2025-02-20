class Inscricao {
    constructor(id, nome, curso, modulos, valorPorModulo) {
        this.id = id || Date.now().toString();
        this.nome = nome;
        this.curso = curso;
        this.modulos = parseInt(modulos);
        this.valorPorModulo = parseFloat(valorPorModulo);
        this.dataInscricao = new Date().toLocaleString();
    }

    get custoTotal() {
        return (this.modulos * this.valorPorModulo).toFixed(2);
    }
}

class GerenciadorInscricoes {
    constructor() {
        this.inscricoes = [];
        this.tabela = document.getElementById("listaInscricoes");
    }

    adicionar(inscricao) {
        this.inscricoes.push(inscricao);
        this.atualizarTabela();
    }

    editar(id, novaInscricao) {
        let index = this.inscricoes.findIndex(item => item.id === id);
        if (index !== -1) {
            novaInscricao.dataInscricao = this.inscricoes[index].dataInscricao;
            this.inscricoes[index] = novaInscricao;
        }
        this.atualizarTabela();
    }

    remover(id) {
        this.inscricoes = this.inscricoes.filter(item => item.id !== id);
        this.atualizarTabela();
    }

    atualizarTabela() {
        this.tabela.innerHTML = "";
        this.inscricoes.forEach(item => {
            this.tabela.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.curso}</td>
                <td>${item.modulos}</td>
                <td>R$ ${item.valorPorModulo.toFixed(2)}</td>
                <td>R$ ${item.custoTotal}</td>
                <td>${item.dataInscricao}</td>
                <td>
                    <button class='btn btn-warning' onclick="prepararEdicao('${item.id}')">Editar</button>
                    <button class='btn btn-danger' onclick="removerInscricao('${item.id}')">Remover</button>
                </td>
            </tr>
            `;
        });
    }
}

let gerenciador = new GerenciadorInscricoes();

const form_id = document.getElementById('id');
const form_nome = document.getElementById('nome');
const form_curso = document.getElementById('curso');
const form_modulos = document.getElementById('modulos');
const form_valor = document.getElementById('valor');
const btnCadastrar = document.getElementById('btn-cadastrar');

btnCadastrar.addEventListener("click", function () {
    const id = form_id.value.trim();
    const nome = form_nome.value.trim();
    const curso = form_curso.value.trim();
    const modulos = form_modulos.value;
    const valor = form_valor.value;

    if (nome === "" || curso === "" || modulos <= 0 || valor <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let inscricao = new Inscricao(id, nome, curso, modulos, valor);

    if (id === "") {
        gerenciador.adicionar(inscricao);
    } else {
        gerenciador.editar(id, inscricao);
    }

    form_id.value = "";
    form_nome.value = "";
    form_curso.value = "";
    form_modulos.value = "";
    form_valor.value = "";
    btnCadastrar.textContent = "Cadastrar Inscrição";
});

function removerInscricao(id) {
    gerenciador.remover(id);
}

function prepararEdicao(id) {
    const item = gerenciador.inscricoes.find(item => item.id === id);

    form_id.value = item.id;
    form_nome.value = item.nome;
    form_curso.value = item.curso;
    form_modulos.value = item.modulos;
    form_valor.value = item.valorPorModulo;

    btnCadastrar.textContent = "Atualizar Inscrição";
}
