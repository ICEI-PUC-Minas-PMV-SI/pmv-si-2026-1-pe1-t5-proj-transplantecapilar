# Programação de Funcionalidades

A implementação do sistema HairCare Pro foi realizada com base nos requisitos funcionais definidos no projeto, utilizando HTML, CSS e JavaScript. O sistema tem como objetivo auxiliar no acompanhamento pós-operatório de pacientes submetidos a transplante capilar.

As funcionalidades desenvolvidas nesta etapa contemplam principalmente o cadastro de pacientes e o login de usuários, permitindo acesso inicial à plataforma.

## Requisitos Atendidos

### Requisitos Funcionais

| ID    | Descrição do Requisito                                                                 | Responsável     | Artefato Criado         |
|-------|----------------------------------------------------------------------------------------|-----------------|-------------------------|
| RF-01 | Permitir cadastro de pacientes no sistema                                                                       | Higor Pierri     | cadastro.html     |
| RF-08 | Permitir login de pacientes e médicos no sistema                                                                | Higor Pierri     | login.html        |
| RF-02 | Permitir que o paciente registre informações diárias sobre o pós-operatório                                     | Thiago de Paulo  | quest-dia-15.html |
| RF-15 | Tela de questionários diários destinados aos pacientes, contendo perguntas relacionadas ao tratamento realizado | Thiago de Paulo  | quest-dia-15.html |
| RF-07 | Permitir cadastro de médicos no sistema                                                                         | Thiago de Paulo  | cad-med.html      |
| RF-09 | Permitir que o paciente visualize seu histórico de registros durante o pós-operatório                           | Gabriel Victor   | PainelPaciente.html         |
| RF-11 | Permita que o paciente edite informações registradas no mesmo dia                                               | Gabriel Victor   | PainelPaciente.html          |
| RF-13 | Tela principal do paciente, contendo acesso e direcionamento para as demais funcionalidades do sistema          | Gabriel Victor   | PainelPaciente.html          |
| RF-14 | Tela principal do médico, contendo acesso e direcionamento para as demais funcionalidades do sistema            | Gabriel Victor   | PainelMedico.html |
| RF-16 | Tela para registro de dúvidas, comentários e envio de fotos, com o objetivo de auxiliar o paciente durante o tratamento. |  Matheus de Souza Pinto | RegistrarDuvidas.html |
| RF-12 | Permitir envio de comentários ou mensagens entre pacientes e médicos no sistema. | Matheus de Souza Pinto | RegistrarDuvidas.html |
| RF-03 | Permitir o envio de fotos da área transplantada | Matheus de Souza Pinto | UpLoadFotos.html |
| RF-10 | Permitir que o medico filtre pacientes por dados da cirurgia ou nome. | Wesley Henrique | lista-de-pacientes.html |
| RF-17 | Tela destinada ao registro de fotos do paciente para acompanhamento e avaliação médica contínua | Letícia Lacerda | FotosPaciente.html |
---

## Funcionalidades do Sistema

### Tela 1A – Login

- **Requisito relacionado:** RF-08  
- **Descrição:** Tela responsável pela autenticação do usuário no sistema HairCare Pro.  
- **Tecnologias utilizadas:** HTML, CSS e JavaScript.  
- **Funcionalidades implementadas:**
  - Campo para inserção de e-mail e senha  
  - Validação básica dos campos obrigatórios  
  - Botão de login com simulação de acesso ao sistema  
  - Interface padronizada conforme o template visual da aplicação  

---

### Tela 2A – Cadastro de Paciente

- **Requisito relacionado:** RF-01  
- **Descrição:** Tela destinada ao cadastro de novos pacientes na plataforma, permitindo o registro de informações pessoais para acesso ao sistema.  
- **Tecnologias utilizadas:** HTML, CSS e JavaScript.  
- **Funcionalidades implementadas:**
  - Formulário com campos de dados pessoais (nome, CPF, data de nascimento, telefone, sexo, e-mail e senha)  
  - Validação básica dos campos obrigatórios  
  - Estrutura preparada para futura integração com banco de dados  
  - Interface padronizada seguindo o layout do sistema HairCare Pro  

---

### Tela 2B – Cadastro de Médico

- **Requisito relacionado:** RF-07  
- **Descrição:** Tela destinada ao cadastro de novos médicos no sistema, permitindo o registro de informações pessoais para acesso ao sistema.  
- **Tecnologias utilizadas:** HTML, CSS e JavaScript.  
- **Funcionalidades implementadas:**
  - Formulário com campos de dados pessoais (nome, idade, sexo, e-mail, senha, CRM, UF do CRM e especialização)  
  - Validação básica do campo obrigatório (CRM e UF do CRM)  
  - Estrutura preparada para futura integração com banco de dados  
  - Interface padronizada seguindo o layout do sistema HairCare Pro  

---

### Tela 3A – Painel do Paciente

- **Requisito relacionado:** RF-09, RF-11 & RF-13
- **Descrição:** Tela destinada a visualização do histórico de registros durante o pós-operatório, edição das informações registradas e acesso e direcionamento para as demais funcionalidades do sistema.  
- **Tecnologias utilizadas:** HTML, CSS e JavaScript.  
- **Funcionalidades implementadas:**
  - Tela principal do paciente tendo acesso as demais funcionalidades do sistema  
  - Envio de dúvidas referentes ao tratamento pós-operatório capilar
  - Visualização do histórico de registros e edição das informações registradas
  - Interface padronizada seguindo o layout do sistema HairCare Pro  

---

### Tela 3B – Painel do Médico

- **Requisito relacionado:** RF-14
- **Descrição:** Tela destinada ao acesso as demais funcionalidades do sistema.  
- **Tecnologias utilizadas:** HTML, CSS e JavaScript.  
- **Funcionalidades implementadas:**
  - Tela principal contendo um resumo das informações do sistema
  - Aba de alertas contendo todos os alertas dos pacientes  
  - Aba de dúvidas permitindo responder às perguntas dos pacientes
  - Interface padronizada seguindo o layout do sistema HairCare Pro  

---

### Tela 4A – Questionário do Paciente dia 15

- **Requisito relacionado:** RF-02 & RF-15 
- **Descrição:** Tela destinada ao paciente durante o acompanhamento pós-operatório. Nela, a partir do procedimento ao qual foi submetido no dia 15, o paciente deve relatar informações ao seu médico responsável.   
- **Tecnologias utilizadas:** HTML, CSS e JavaScript.  
- **Funcionalidades implementadas:**
  - Formulário de perguntas para o dia em questão  
  - Campos de múltipla escolha, permitindo a seleção de mais de uma opção por alternativa, com o objetivo de tornar o sistema mais simples para o paciente.   
  - Perguntas claras e de linguagem simples e objetiva.  
  - Interface padronizada seguindo o layout do sistema HairCare Pro.

---

### Tela 4B – Upload de Fotos

- **Requisito relacionado:** RF-03  
- **Descrição:** Tela desenvolvida para permitir o envio de fotos da área transplantada, auxiliando no acompanhamento diário do paciente pela equipe médica.  
- **Tecnologias utilizadas:** HTML e CSS.  
- **Funcionalidades implementadas:**
  - Área para upload de fotos em diferentes ângulos da região transplantada  
  - Campos organizados para envio de imagens frontal, laterais, vértice e área doadora  
  - Instruções visuais para orientação do paciente durante a captura das fotos  
  - Campo opcional para relato ou observações sobre as imagens enviadas  
  - Botão para envio das fotos ao sistema  
  - Interface padronizada conforme o template visual da aplicação  
  - Menu lateral para navegação entre as funcionalidades do sistema  

---

### Tela 4C – Registrar Dúvida

- **Requisitos relacionados:** RF-12 e RF-16  
- **Descrição:** Tela desenvolvida para permitir o registro de dúvidas, comentários e envio de imagens pelos pacientes, facilitando a comunicação com a equipe médica durante o tratamento.  
- **Tecnologias utilizadas:** HTML e CSS.  
- **Funcionalidades implementadas:**
  - Campo para registro de dúvidas ou comentários  
  - Área para envio de imagens opcionais  
  - Listagem dos arquivos selecionados para envio  
  - Botão para envio da dúvida/comentário ao sistema  
  - Interface organizada e padronizada conforme o template visual da aplicação  
  - Menu lateral para navegação entre as funcionalidades do sistema

 ---
 
### Tela 4F – Foto do Paciente

- **Requisito relacionado:** RF-17  
- **Descrição:** Tela desenvolvida para permitir a visualização das fotos enviadas pelos pacientes durante o acompanhamento pós-operatório, auxiliando a equipe médica no monitoramento da evolução do tratamento capilar.  
- **Tecnologias utilizadas:** HTML e CSS.  
- **Funcionalidades implementadas:**
  - Exibição das fotos enviadas pelo paciente
  - Organização das imagens por data e dia de acompanhamento
  - Botão para ampliação das fotos para melhor visualização
  - Identificação do paciente associado às imagens exibidas
  - Botão para retorno à tela de detalhes do paciente
  - Interface organizada e padronizada conforme o template visual da aplicação
  - Menu lateral para navegação entre as funcionalidades do sistema

    ---

  ### Tela 4D - Lista de Pacientes

 - **Requisito relacionado:** RF-10  
 - **Descrição:** Tela desenvolvida para exibição e gerenciamento de pacientes, contendo uma tabela com informações organizadas e o status atual de cada paciente. A interface também possui um campo de busca que permite localizar pacientes específicos de forma rápida e prática, facilitando a visualização e o acompanhamento dos dados..  
   - **Tecnologias utilizadas:** HTML e CSS.  
   - **Funcionalidades implementadas:**
   - Vizualização dos dados do paciente por tabela
   - Exibição de status atual por paciente
   - Facilidade no acompanhamento da situação de cada paciente

  ---

## Descrição das estruturas

Para esta etapa, foi utilizada uma estrutura simples baseada em formulários HTML para coleta de dados do usuário, com validação e manipulação utilizando JavaScript.

### Estrutura de Dados - Usuário

| Nome                | Tipo           | Descrição                                         | Exemplo                    |
|---------------------|----------------|--------------------------------------------------|----------------------------|
| nome                | Texto          | Nome completo do paciente                        | João da Silva              |
| cpf                 | Texto          | CPF do paciente                                  | 123.456.789-00             |
| dataNascimento      | Data           | Data de nascimento do paciente                   | 01/01/1990                 |
| telefone            | Texto          | Número de telefone                               | (31) 99999-9999            |
| sexo                | Texto          | Sexo do paciente                                 | Masculino                  |
| email               | Texto          | E-mail para acesso ao sistema                    | paciente@email.com         |
| senha               | Texto          | Senha de acesso                                  | ********                   |

---

## Tecnologias Utilizadas

- HTML5: Estrutura das páginas  
- CSS3: Estilização da interface  
- JavaScript: Validação de formulários e simulação de login  
- LocalStorage: Armazenamento temporário de dados no navegador  

---

## Instruções para Execução

1. Realizar o download ou clonar o repositório do projeto via GitHub  
2. Abrir o projeto no Visual Studio Code  
3. Acessar a pasta `src/pages`  
4. Executar os arquivos `login.html` e `cadastro.html` utilizando a extensão Live Server  
5. Testar o preenchimento dos formulários  

---

## Observações

A implementação atual é uma versão inicial (protótipo funcional), sem integração com banco de dados real. Os dados são manipulados apenas no navegador para fins acadêmicos. As regras de negócio e funcionalidades dinâmicas serão aprofundadas nas próximas etapas do projeto.
