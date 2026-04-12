
# Projeto de Interface

As interfaces foram desenvolvidas com foco na simplicidade e usabilidade, atendendo aos requisitos funcionais definidos, como registro de informações, envio de fotos e acompanhamento pelo médico.

Além disso, o sistema foi projetado para ser responsivo e de fácil navegação, atendendo aos requisitos não funcionais e às necessidades descritas nas histórias de usuário.

A estrutura das telas foi organizada de acordo com os diferentes perfis de acesso (paciente e médico), garantindo que cada usuário tenha acesso apenas às funcionalidades relevantes ao seu papel. O fluxo de navegação foi definido de forma intuitiva, iniciando pela tela principal e direcionando o usuário para ações como cadastro, login e acesso às funcionalidades do sistema.

Dessa forma, o projeto de interface busca proporcionar uma experiência clara, objetiva e eficiente, facilitando o acompanhamento pós-operatório e a comunicação entre paciente e médico.

## Fluxo do Usuário

O fluxograma a seguir representa o fluxo de navegação do sistema, demonstrando as interações entre pacientes e médicos, desde o acesso inicial até as funcionalidades de acompanhamento pós-operatório.

![Fluxograma](img/Fluxograma.jpeg)

## Protótipos de Interface (Wireframes)

### Tela 1A — Tela Inicial
![Tela 1A](img/Tela%201A.png)

### Tela 1B — Seleção de Ação
![Tela 1B](img/Tela%201B.png)

### Tela 2A — Cadastro de Paciente
![Tela 2A](img/Tela%202A.png)

### Tela 2B — Login de Paciente
![Tela 2B](img/Tela%202B.png)

### Tela 2C — Cadastro de Médico
![Tela 2C](img/Tela%202C.png)

### Tela 2D — Login de Médico
![Tela 2D](img/Tela%202D.png)

### Tela 3A — Dashboard do Paciente
![Tela 3A](img/Tela%203A.png)

### Tela 3B — Dashboard do Médico
![Tela 3B](img/Tela%203B.png)

### Tela 4A — Questionário Diário
![Tela 4A](img/Tela%204A%20.png)

### Tela 4B — Envio de Fotos
![Tela 4B](img/Tela%204B.png)

### Tela 4C — Registro de Dúvidas/Comentários
![Tela 4C](img/Tela%204C.png)

### Tela 4D — Lista de Pacientes
![Tela 4D](img/Tela%204D.png)

### Tela 4E — Detalhes do Paciente
![Tela 4E](img/Tela%204E.png)

### Tela 4F — Visualização de Fotos
![Tela 4F](img/Tela%204F.png)

## Mapa do Sistema

```mermaid
flowchart LR
    A[Paciente] -->|Envia dados| B[Sistema Web]
    B -->|Exibe informações| A

    C[Médico] -->|Acessa dados| B
    B -->|Atualizações| C

---

# 👤 2. JORNADA DO USUÁRIO (PACIENTE)

```markdown
## Jornada do Usuário — Paciente

```mermaid
flowchart LR
    A[Login] --> B[Dashboard]
    B --> C[Responder Questionário]
    B --> D[Enviar Fotos]
    B --> E[Enviar Dúvida]
    C --> F[Aguardar avaliação]
    D --> F
    E --> F

---

# 👨‍⚕️ 3. JORNADA DO USUÁRIO (MÉDICO)

```markdown
## Jornada do Usuário — Médico

```mermaid
flowchart LR
    A[Login] --> B[Dashboard Médico]
    B --> C[Listar Pacientes]
    C --> D[Selecionar Paciente]
    D --> E[Ver Respostas]
    D --> F[Ver Fotos]
    D --> G[Responder Dúvidas]

---

# 🏗️ 4. ARQUITETURA DO SISTEMA

(IMPORTANTE porque vocês NÃO têm backend)

```markdown
## Arquitetura do Sistema

```mermaid
flowchart LR
    A[Usuário] --> B[Navegador]
    B --> C[Interface Web]
    C --> D[HTML]
    C --> E[CSS]
    C --> F[JavaScript]
