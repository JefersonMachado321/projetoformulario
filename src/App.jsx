import { useState } from 'react';
import './App.css';
import list from './clientes';
import produtos from './produtos';

const App = () => {
  const [selecionarCliente, setSelecionarCliente] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [produtosList, setProdutosList] = useState(produtos);
  const [novoProduto, setNovoProduto] = useState({
    id: '',
    produto: '',
    preco: '',
  });
  const [clienteProdutos, setClienteProdutos] = useState({});

  const procurarProduto = produtosList.filter(
    (produto) =>
      produto.produto.toUpperCase().startsWith(pesquisa.toUpperCase()) ||
      produto.codigo.toUpperCase().startsWith(pesquisa.toUpperCase()),
  );

  const handleExcluir = (produtoId) => {
    const newProdutosList = produtosList.filter((p) => p.id !== produtoId);
    setProdutosList(newProdutosList);
  };

  const handleAdicionar = () => {
    setProdutosList([...produtosList, novoProduto]);
    setNovoProduto({ id: '', produto: '', preco: '' });
  };

  const handleSalvar = (produto) => {
    setClienteProdutos({
      ...clienteProdutos,
      [selecionarCliente]: [
        ...(clienteProdutos[selecionarCliente] || []),
        produto,
      ],
    });
  };

  const handleExcluirSalvo = (index) => {
    setClienteProdutos({
      ...clienteProdutos,
      [selecionarCliente]: clienteProdutos[selecionarCliente].filter(
        (produto, i) => i !== index,
      ),
    });
  };

  const valorTotal = (clienteProdutos[selecionarCliente] || []).reduce(
    (total, produto) => total + Number(produto.preco.replace('R$', '')),
    0,
  );

  return (
    <>
      <h1>Formulario</h1>
      <form>
        <label>
          Cliente :{' '}
          <select
            value={selecionarCliente}
            onChange={(e) => setSelecionarCliente(e.target.value)}
          >
            {list.map((cliente) => (
              <option key={cliente.id}>{cliente.nome}</option>
            ))}
          </select>
        </label>
        <br />
      </form>
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      {pesquisa && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {procurarProduto.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.codigo}</td>
                <td>{produto.produto}</td>
                <td>{produto.preco}</td>
                <td>
                  <button onClick={() => handleSalvar(produto)}>Salvar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>Produtos Salvos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {(clienteProdutos[selecionarCliente] || []).map((produto, index) => (
            <tr key={index}>
              <td>{produto.id}</td>
              <td>{produto.codigo}</td>
              <td>{produto.produto}</td>
              <td>{produto.preco}</td>
              <td>
                <button onClick={() => handleExcluirSalvo(index)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Valor Total: R${valorTotal}</h2>
      <h2>Adicionar Produto</h2>
      <input
        type="text"
        placeholder="Codigo do Produto"
        value={novoProduto.codigo}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, codigo: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="ID do Produto"
        value={novoProduto.id}
        onChange={(e) => setNovoProduto({ ...novoProduto, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nome do Produto"
        value={novoProduto.produto}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, produto: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Preço do Produto"
        value={novoProduto.preco}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, preco: e.target.value })
        }
      />
      <button onClick={handleAdicionar}>Adicionar Produto</button>
    </>
  );
};

export default App;
