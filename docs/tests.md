# Testes

Neste projeto serão realizados dois tipos de testes:

- O Teste de Software, que utiliza uma abordagem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
- O Teste de Usabilidade, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo.

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento Teste de Software: Conceitos e tipos de testes.

A documentação dos testes é dividida nas seguintes seções:

- Plano de Testes de Software
- Registro dos Testes de Software
- Avaliação dos Testes de Software
- Cenários de Teste de Usabilidade
- Registro dos Testes de Usabilidade
- Avaliação dos Testes de Usabilidade

# Teste de Software

Nesta seção são apresentados os testes relacionados às funcionalidades desenvolvidas por Higor Pierri de Castro Pereira, envolvendo cadastro de paciente, autenticação de usuários e painel do paciente.

## Plano de Testes de Software

| Caso de Teste | CT01 - Cadastro de paciente |
| --- | --- |
| Responsável | Higor Pierri |
| Procedimento | 1) Acessar a página `cadastro.html` <br> 2) Preencher todos os campos obrigatórios <br> 3) Clicar em “Criar Conta” |
| Requisitos associados | RF-01 |
| Resultado esperado | Paciente cadastrado com sucesso e redirecionamento para login |
| Dados de entrada | Nome, CPF, telefone, e-mail e senha válidos |
| Resultado obtido | Sucesso |

| Caso de Teste | CT02 - Validação de CPF duplicado |
| --- | --- |
| Responsável | Higor Pierri |
| Procedimento | 1) Tentar cadastrar paciente utilizando CPF já registrado |
| Requisitos associados | RF-01 / RNF-12 |
| Resultado esperado | Sistema impedir cadastro duplicado |
| Dados de entrada | CPF já existente no LocalStorage |
| Resultado obtido | Sucesso |

| Caso de Teste | CT03 - Validação de senhas diferentes |
| --- | --- |
| Responsável | Higor Pierri |
| Procedimento | 1) Inserir senha e confirmação diferentes <br> 2) Clicar em “Criar Conta” |
| Requisitos associados | RF-01 |
| Resultado esperado | Sistema exibir mensagem de erro |
| Dados de entrada | Senhas incompatíveis |
| Resultado obtido | Sucesso |

| Caso de Teste | CT04 - Login de paciente |
| --- | --- |
| Responsável | Higor Pierri |
| Procedimento | 1) Acessar `login.html` <br> 2) Selecionar perfil paciente <br> 3) Inserir login e senha válidos |
| Requisitos associados | RF-08 |
| Resultado esperado | Sistema permitir acesso ao painel do paciente |
| Dados de entrada | E-mail/CPF e senha cadastrados |
| Resultado obtido | Sucesso |

| Caso de Teste | CT05 - Proteção de rota |
| --- | --- |
| Responsável | Higor Pierri |
| Procedimento | 1) Tentar acessar `PainelPaciente.html` sem login |
| Requisitos associados | RNF-07 |
| Resultado esperado | Sistema redirecionar para tela de login |
| Dados de entrada | Usuário não autenticado |
| Resultado obtido | Sucesso |

| Caso de Teste | CT06 - Persistência do checklist |
| --- | --- |
| Responsável | Higor Pierri |
| Procedimento | 1) Marcar itens do checklist <br> 2) Atualizar a página |
| Requisitos associados | RF-13 |
| Resultado esperado | Sistema manter checklist salvo |
| Dados de entrada | Seleção dos itens do checklist |
| Resultado obtido | Sucesso |

| Caso de Teste | CT07 - Logout do paciente |
| --- | --- |
| Responsável | Higor Pierri |
| Procedimento | 1) Clicar no botão “Sair do Sistema” |
| Requisitos associados | RF-08 / RNF-07 |
| Resultado esperado | Encerrar sessão e retornar para login |
| Dados de entrada | Usuário autenticado |
| Resultado obtido | Sucesso |

## Registro dos Testes de Software

Esta seção apresenta os testes realizados por Higor Pierri nas funcionalidades de autenticação, cadastro e painel do paciente.

| Caso de Teste | CT01 - Cadastro de paciente |
| --- | --- |
| Requisito Associado | RF-01 - Cadastro de pacientes |
| Responsável | Higor Pierri |
| Link do vídeo do teste realizado | Inserir link do vídeo |

| Caso de Teste | CT04 - Login de paciente |
| --- | --- |
| Requisito Associado | RF-08 - Autenticação de usuários |
| Responsável | Higor Pierri |
| Link do vídeo do teste realizado | Inserir link do vídeo |

| Caso de Teste | CT06 - Persistência do checklist |
| --- | --- |
| Requisito Associado | RF-13 - Checklist diário |
| Responsável | Higor Pierri |
| Link do vídeo do teste realizado | Inserir link do vídeo |

## Avaliação dos Testes de Software

Os testes realizados por Higor Pierri demonstraram que as funcionalidades desenvolvidas para cadastro, login e painel do paciente estão funcionando conforme os requisitos definidos no projeto. O sistema realiza validações básicas de formulários, impede cadastros duplicados, autentica usuários corretamente e protege páginas restritas por meio de controle de sessão utilizando LocalStorage.

Além disso, o painel do paciente apresentou funcionamento adequado em relação ao checklist diário, persistência de dados e navegação entre páginas do sistema. Os resultados obtidos indicam que a solução atende satisfatoriamente aos requisitos funcionais implementados nesta etapa.

Como melhorias futuras, pretende-se implementar integração com banco de dados real, autenticação mais robusta, criptografia de senhas e maior controle de permissões entre usuários pacientes e profissionais.

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à funcionalidade da aplicação de forma geral.

## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
| --- | --- |
| 1 | Realizar cadastro de paciente no sistema |
| 2 | Efetuar login e acessar o painel do paciente |
| 3 | Utilizar o checklist diário e validar persistência das tarefas |

## Registro dos Testes de Usabilidade

### Cenário 1: Cadastro de paciente

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão |
| --- | --- | --- | --- |
| 1 | SIM | 5 | 32 segundos |
| 2 | SIM | 5 | 28 segundos |
| 3 | SIM | 4 | 35 segundos |
| Média | 100% | 4.67 | 31.6 segundos |

Comentários dos usuários:
- Interface intuitiva e organizada.
- Campos de cadastro fáceis de compreender.

### Cenário 2: Login e acesso ao painel

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão |
| --- | --- | --- | --- |
| 1 | SIM | 5 | 15 segundos |
| 2 | SIM | 5 | 18 segundos |
| 3 | SIM | 5 | 14 segundos |
| Média | 100% | 5 | 15.6 segundos |

Comentários dos usuários:
- Navegação simples.
- Painel visualmente agradável.

## Avaliação dos Testes de Usabilidade

Com base nos testes realizados por Higor Pierri, foi possível verificar que a aplicação apresenta boa usabilidade e facilidade de navegação. Os usuários conseguiram concluir os cenários propostos com sucesso, demonstrando que as funcionalidades implementadas possuem fluxo intuitivo e organização adequada.

A satisfação subjetiva apresentou resultados positivos, principalmente relacionados ao visual moderno da aplicação, clareza dos formulários e facilidade de utilização do painel do paciente.

Como oportunidades de melhoria, pretende-se adicionar mais feedbacks visuais, notificações interativas e integração em tempo real com funcionalidades médicas nas próximas etapas do projeto.

ORIENTAÇÕES PREESTABELECIDAS DEIXADAS PELO PROFESSOR ABAIXO

# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.


**Caso de Teste** | **CT01 - Criar conta parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço www.teste.com.br <br> 2) Clique em criar conta <br> 2) Preencha todos os campos do formulário <br> 3) Clique no botão "Continuar".
**Requisitos associados** | RF-001
**Resultado esperado** | Prosseguir para a parte 2 do cadastro
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Criar conta parte 2**
 :--------------: | ------------
**Procedimento**  | 1) Preencha todos os campos do formulário <br> 2) Clique no botão "Criar conta" <br> 
**Requisitos associados** | RF-001
**Resultado esperado** | Usuário cadastrado
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Criar conta parte 1*                                         |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/u/s!AhD2JqpOUvJChapRtRSQ9vPzbNLwGA?e=mxZs6t| 

|*Caso de Teste*                                 |*CT02 - Criar conta parte 2*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/v/s!AhD2JqpOUvJChapQ8CPXL-TI_A7iVg?e=spD3Ar | 


## Avaliação dos Testes de Software

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando. |
| 2             | Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2: Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 113 segundos — média usuários — contra 25 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.



