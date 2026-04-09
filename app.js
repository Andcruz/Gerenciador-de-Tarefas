const fs = require('fs')

let tarefas = []

function carregarTarefas() {
    if (fs.existsSync('tarefas.json')) {
        const dados = fs.readFileSync('tarefas.json')
        tarefas = JSON.parse(dados)
    }
}

function salvarTarefas() {
    fs.writeFileSync('tarefas.json', JSON.stringify(tarefas))
}

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function menu() {
    console.log(`
1 - Adicionar tarefa
2 - Listar tarefas
3 - Concluir tarefa
4 - Remover tarefa
5 - Sair
`)

    rl.question("Escolha: ", opcao => {
        executar(opcao)
    })
}

function adicionar() {
    rl.question("Nova tarefa: ", texto => {
        tarefas.push({
            texto,
            concluida: false
        })

        salvarTarefas()
        menu()
    })
}

function listar() {
    tarefas.forEach((t, i) => {
        let status = t.concluida ? "✔" : "❌"
        console.log(`${i} - ${t.texto} [${status}]`)
    })

    menu()
}

function concluir() {
    rl.question("Número da tarefa: ", n => {
        tarefas[n].concluida = true
        salvarTarefas()
        menu()
    })
}

function remover() {
    rl.question("Número da tarefa: ", n => {
        tarefas.splice(n, 1)
        salvarTarefas()
        menu()
    })
}

function executar(opcao) {

    switch(opcao) {
        case '1': adicionar(); break
        case '2': listar(); break
        case '3': concluir(); break
        case '4': remover(); break
        case '5':
            rl.close()
            break
        default:
            menu()
    }
}

carregarTarefas()
menu()