# Programação de Funcionalidades

A implementação do sistema HairCare Pro foi realizada com base nos requisitos funcionais definidos no projeto, utilizando HTML, CSS e JavaScript. O sistema tem como objetivo auxiliar no acompanhamento pós-operatório de pacientes submetidos a transplante capilar.

As funcionalidades desenvolvidas nesta etapa contemplam principalmente o cadastro de pacientes e o login de usuários, permitindo acesso inicial à plataforma.

## Requisitos Atendidos

### Requisitos Funcionais

| ID    | Descrição do Requisito                                                                 | Responsável     | Artefato Criado         |
|-------|----------------------------------------------------------------------------------------|-----------------|-------------------------|
| RF-01 | Permitir cadastro de pacientes no sistema                                             | Higor Pierri    | cadastro.html           |
| RF-08 | Permitir login de pacientes e médicos no sistema                                      | Higor Pierri    | login.html              |

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

1. Abrir o projeto no Visual Studio Code
2. Instalar a extensão Live Server
3. Executar o arquivo `login.html` com Live Server
4. Navegar entre login e cadastro
5. Testar o preenchimento dos formulários

---

## Observações

A implementação atual é uma versão inicial (protótipo funcional), sem integração com banco de dados real. Os dados são manipulados apenas no navegador para fins acadêmicos.

# TEXTA PADRÃO QUE O PROFESSOS DEIXOU COMO ORIENTAÇÃO ABAIXO

# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.

O professor Rommel Carneiro apresenta alguns exemplos prontos para serem utilizados como referência:
- Login do sistema: [https://repl.it/@rommelpuc/LoginApp](https://repl.it/@rommelpuc/LoginApp) 
- Cadastro de Contatos: [https://repl.it/@rommelpuc/Cadastro-de-Contatos](https://repl.it/@rommelpuc/Cadastro-de-Contatos)


> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| A aplicação deve permitir que o usuário gerencie suas tarefas | João | index.html |
|RF-002| A aplicação deve permitir a emissão de um relatório de tarefas realizadas no mês | Ana Paula | cadastro-noticia.html |

## Descrição das estruturas:

## Notícia
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id             | Numero (Inteiro)  | Identificador único da notícia            | 1                                              |
| Título         | Texto             | Título da notícia                         | Sistemas de Informação PUC Minas é o melhor                                   |
| Conteúdo       | Texto             | Conteúdo da notícia                       | Sistemas de Informação da PUC Minas é eleito o melhor curso do Brasil                            |
| Id do usuário  | Numero (Inteiro)  | Identificador do usuário autor da notícia | 1                                              |

