import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

const tarefas = [
    { id: 1, titulo: "Fazer compras", concluida: false },
    { id: 2, titulo: "Lavar o carro", concluida: true },
    { id: 3, titulo: "Passear com o cachorro", concluida: false },
];

const produtos = [
  { id: 1, nome: "Teclado", categoria: "periféricos" },
  { id: 2, nome: "Controle", categoria: "periféricos" },
  { id: 3, nome: "Mouse", categoria: "periféricos" },
  { id: 4, nome: "Processador AMD Ryzen 7 7500", categoria: "eletrônicos" },
];

app.get("/", (req, res) => {
  res.send("Olá Express!");
});

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.get('/', (req, res) => {
res.end('API de tarefas no ar!')
});

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.get('/tarefas/:id', (req, res) => {
    const id = req.params.id;
    const tarefa = tarefas.find((t) => t.id === parseInt(id));
    if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada!" });
    }
    res.status(200).json(tarefa);

});

app.get('/tarefas', (req, res) => {
    const concluida = req.query.concluida;
    concluida === "true" || concluida === "false"
    ? res.json(tarefas.filter((t) => t.concluida === (concluida === "true")))
    : res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
    const titulo = req.body.titulo;
    tarefas.push({
    id: tarefas.length + 1,
    titulo: titulo,
    concluida: false
});
    res.status(201).json(tarefas[tarefas.length - 1]);
});

const autenticar = (req, res, next) => {
  console.log('Autenticação verificada!!')
  next();
};
const validarCorpo = (req, res, next) => {
  if (!req.body.titulo) {
        return res.status(400).json({
            error: 'O título é obrigatório'
        });
    }
  next();
};
const registrarLog = (req, res, next) => {
  console.log(`Nova tarefa sendo criada: ${req.body.titulo}`);
  next();
};

app.post('/tarefas', [authenticar, validarCorpo, registrarLog] , (req, res) => {
  const titulo = req.body.titulo;

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo: titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.post("/produto", (req, res) => {
  const nome = req.body.nome;
  const categoria = req.body.categoria;

  if (!nome || typeof nome !== "string") {
    return res
      .status(400)
      .json({ erro: 'O campo "nome" é obrigatório e deve ser uma string' });
  }

  if (categoria === undefined || typeof categoria !== "string") {
    return res
      .status(400)
      .json({
        erro: 'O campo "categoria" é obrigatório e deve ser uma string',
      });
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    categoria,
  };

  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
});

// Req Params, pega um parâmetro na rota e identifica um recurso específico;
app.get("/produtos/:id", (req, res) => {
  // req.params sempre retorna strings, por isso se usa parseInt
  const id = req.params.id;
  const produto = produtos.find((p) => p.id === parseInt(id));
  if (!produto) {
    return res.status(404).json({ error: "Produto não encontrado!" });
  }
  res.status(200).json(produto);
});

app.get("/produtos/busca", (req, res) => {
  const categoria = req.query.categoria;
  const ordenar = req.query.ordenar;

  let resultado = produtos;

  if (categoria) {
    resultado = resultado.filter((produto) => {
      produto.categoria === categoria;
    });
  }

  if (ordenar) {
    resultado = [...resultado].sort((a, b) => {
      a.preco - b.preco;
    });
  }

  res.json(resultado);
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando http://localhost:${PORT}`);
});
