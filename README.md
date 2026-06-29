# ⚡ Velocity - 3D Rocket League Game

Um jogo 3D inspirado em Rocket League, desenvolvido com Babylon.js e JavaScript puro.

## 🎮 Características

- **3D Graphics**: Renderização 3D em tempo real com Babylon.js
- **Física Realista**: Sistema de física com Cannon.js
- **Controle Intuitivo**: Controle de carro com teclado
- **Multiplayer Ready**: Estrutura preparada para múltiplos jogadores
- **Pontuação em Tempo Real**: Placar dinâmico das equipes

## 🚀 Como Iniciar

### Requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Onlydiazz/velocity.git
cd velocity
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

4. Abra no navegador:
```
http://localhost:3000
```

## ⌨️ Controles

| Tecla | Ação |
|-------|------|
| **W** | Movimentar para frente |
| **A** | Virar à esquerda |
| **S** | Movimentar para trás |
| **D** | Virar à direita |
| **SPACE** | Pulo/Boost |

## 📁 Estrutura do Projeto

```
velocity/
├── public/
│   ├── index.html      # Estrutura HTML principal
│   └── js/
│       └── game.js     # Lógica do jogo
├── server.js           # Servidor Express
├── package.json        # Dependências
└── README.md           # Este arquivo
```

## 🎯 Objetivos do Jogo

- **Meta**: Bater a bola na zona de gol do adversário
- **Equipe A**: Defende no lado esquerdo (z negativo)
- **Equipe B**: Defende no lado direito (z positivo)
- **Pontos**: Cada vez que a bola entra na zona de gol, a equipe adversária marca um ponto

## 🛠️ Tecnologias

- **Babylon.js**: Engine 3D WebGL
- **Cannon.js**: Motor de física
- **Express.js**: Servidor web
- **JavaScript (Vanilla)**: Lógica do game

## 🔮 Roadmap Futuro

- [ ] Multiplayer online com WebSockets
- [ ] Mais tipos de carros
- [ ] Power-ups especiais
- [ ] Mapas diferentes
- [ ] Sistema de partidas ranqueadas
- [ ] Customização de carros
- [ ] Efeitos visuais avançados
- [ ] Som e música

## 📝 Licença

MIT

## 👤 Autor

**Onlydiazz**

---

**Divirta-se jogando Velocity!** 🎮⚡
