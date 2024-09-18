import "./App.css";
import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1 - Resgatando dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

    fetchData(); // Chama a função assíncrona
  }, []); // Dependências vazias: executa apenas uma vez no carregamento

  // 2 - Adicionando produto
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      // Atualiza a lista de produtos após adicionar - Carregamento Dinamico 
      const newProduct = await res.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      // Limpa os campos após adicionar
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>

      {/* Formulário para adicionar produto */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome do Produto:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Preço do Produto:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button type="submit">Adicionar Produto</button>
      </form>

      {/* Lista de produtos */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
