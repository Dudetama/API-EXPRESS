import express from 'express'

const app = express()
const PORT = 3000

const produtos = [
    {id: 4, nome: 'ponei'},
    {id: 5, nome: 'disco'},
    {id: 6, nome: 'cd'}
]

const usuarios = [
    {id: 1, nome: 'Gabriel'},
    {id: 2, nome: 'Breguedo'},
    {id: 3, nome: 'Daris Nidere Angelina da Silva'}
];

app.get('/produtos/:id', (req,res) => {
    const id = req.params.id;
    const produto = produtos.find(p => p.id === parseInt (id));
    if (!produto){
        return res.status(404).json({error: "Produto não encontrado"})
    }res.json(produto);
});

app.get('/produtos', (req, res) => {
    const categoria = req.query.categoria
    const produtosFiltrados = produtos.filter(p => p.categoria === categoria)
    res.json(produtosFiltrados);
});

app.post('/usuario', () => {
    const novoUsuario = {
        id: usuarios.length +1,
        nome: 'Taylor'
    }
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.get('/usuario/:id', (req,res) => {
    const id = req.params.id;
    const usuario = usuarios.find(u => u.id === parseInt (id));
    if (!usuario){
        return res.status(404).json({error: "Usuário não encontrado!"});
    }
    res.json(usuario);
});

app.get('/usuarios', (req,res) => {
    res.json(usuarios)
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

