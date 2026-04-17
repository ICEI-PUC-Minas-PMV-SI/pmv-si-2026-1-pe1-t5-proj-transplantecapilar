## Especificação do Projeto

### Perfis de Usuários

#### Perfil: Paciente

**Descrição:**

Pessoa que realizou o transplante capilar e precisa registrar informações sobre o período pós-operatório.

**Necessidades:**

- Registrar sintomas e evolução da recuperação;
- Enviar fotos da área transplantada;
- Receber orientações sobre cuidados pós-operatórios;

---

#### Perfil: Médico

**Descrição:**

Profissional responsável pelo acompanhamento do paciente após o transplante capilar.

**Necessidades:**

- Visualizar informações enviadas pelos pacientes;
- Acompanhar evolução pós-operatória;
- Identificar possíveis complicações;
## Personas

### Persona 1 — Paciente

João Silva tem 32 anos, é empresário e realizou recentemente um transplante capilar. Preocupa-se com sua aparência e autoestima, e busca garantir o melhor resultado possível após o procedimento. Possui rotina agitada e, por isso, tem dificuldade em lembrar e seguir corretamente todas as orientações pós-operatórias.

João utiliza frequentemente o smartphone no dia a dia e está habituado a aplicativos, mas prefere soluções simples e intuitivas. Durante o período de recuperação, sente insegurança quanto aos cuidados necessários, dúvidas sobre sintomas e dificuldade em manter contato frequente com o médico.

Suas principais necessidades são registrar informações sobre sua recuperação, enviar fotos da área transplantada, esclarecer dúvidas rapidamente e acompanhar sua evolução de forma organizada.

---

### Persona 2 — Médico

Dr. Carlos Mendes tem 45 anos, é médico especialista em transplante capilar e realiza diversos procedimentos por mês. Ele precisa acompanhar a evolução de seus pacientes no pós-operatório, mas enfrenta dificuldades devido à comunicação descentralizada, muitas vezes feita por aplicativos de mensagem.

Carlos busca uma forma mais organizada de visualizar informações dos pacientes, acompanhar fotos da evolução e identificar possíveis complicações de maneira rápida. Ele valoriza ferramentas que otimizem seu tempo e melhorem a qualidade do acompanhamento clínico.

Suas principais necessidades são acessar dados estruturados dos pacientes, acompanhar a evolução pós-operatória, visualizar imagens enviadas e identificar sinais de alerta com facilidade.

## Histórias de Usuários

### Paciente

- Como paciente, quero registrar diariamente informações sobre meu pós-operatório para permitir que o médico acompanhe minha recuperação.

- Como paciente, quero enviar fotos da área transplantada para possibilitar a avaliação da evolução do transplante.

- Como paciente, quero registrar sintomas ou dúvidas no sistema para receber orientação da equipe médica.

---

### Médico

- Como médico, quero visualizar os registros enviados pelos pacientes para acompanhar o processo de recuperação pós-cirúrgica.

- Como médico, quero analisar as fotos enviadas pelos pacientes para identificar possíveis complicações no pós-operatório.

## Requisitos do Projeto

### Requisitos Funcionais

| ID     | Descrição                                                                 | Prioridade |
|--------|-------------------------------------------------------------------------|-----------|
| RF-01  | Permitir cadastro de pacientes no sistema.                              | Alta      |
| RF-02  | Permitir que o paciente registre informações diárias sobre o pós operatório. | Alta      |
| RF-03  | Permitir o envio de fotos da área transplantada.                        | Alta      |
| RF-04  | Permitir que o médico visualize as informações registradas pelos pacientes. | Alta      |
| RF-05  | Exibir resumo da evolução do paciente durante o pós-operatório.         | Média     |
| RF-06  | Permitir exportação do histórico de acompanhamento do paciente em relatório. | Baixa     |
| RF-07  | Permitir cadastro de médicos no sistema.                                | Alta      |
| RF-08  | Permitir login de pacientes e médicos no sistema.                       | Alta      |
| RF-09  | Permitir que o paciente visualize seu histórico de registros durante o pós-operatório. | Média     |
| RF-10  | Permitir que o médico filtre pacientes por data da cirurgia ou nome.    | Média     |
| RF-11  | Permitir que o paciente edite informações registradas no mesmo dia.     | Baixa     |
| RF-12  | Permitir envio de comentários ou mensagens entre paciente e médico no sistema. | Média     |
| RF-13  | Tela principal do paciente, contendo acesso e direcionamento para as demais funcionalidades do sistema. | Alta     |
| RF-14  | Tela principal do médico, contendo acesso e direcionamento para as demais funcionalidades do sistema.. | Alta    |
| RF-15  | Tela de questionários diários destinada aos pacientes, contendo perguntas relacionadas ao tratamento realizado. | Alta     |
| RF-16  | Tela para registro de dúvidas, comentários e envio de fotos, com o objetivo de auxiliar o paciente durante o tratamento. | Média     |
| RF-17 | Tela destinada ao registro de fotos do paciente para acompanhamento e avaliação médica contínua. | alta    |

---

### Requisitos Não Funcionais

| ID     | Descrição                                                                 | Prioridade |
|--------|-------------------------------------------------------------------------|-----------|
| RNF-01 | O sistema deve possuir interface simples e de fácil utilização.         | Alta      |
| RNF-02 | O sistema deve permitir acesso por meio de navegadores web.             | Alta      |
| RNF-03 | O sistema deve garantir a segurança das informações registradas.        | Alta      |
| RNF-04 | O sistema deve ser responsivo, permitindo utilização adequada em computadores, tablets e smartphones. | Média     |
| RNF-05 | O sistema deve permitir armazenamento das informações dos pacientes de forma organizada e acessível para consulta durante o acompanhamento pós-operatório. | Média     |
| RNF-06 | O sistema deve apresentar tempo de carregamento inferior a 3 segundos.  | Baixa     |
| RNF-07 | O sistema deve garantir que apenas usuários autenticados tenham acesso às informações. | Alta      |
| RNF-08 | O sistema deve apresentar navegação intuitiva, com organização clara das funcionalidades. | Alta      |
| RNF-09 | O sistema deve manter disponibilidade mínima de 95% do tempo.           | Média     |
| RNF-10 | O sistema deve permitir fácil manutenção e atualização do código.       | Média     |
| RNF-11 | O sistema deve ser compatível com os principais navegadores (Chrome, Firefox, Edge). | Baixa     |
| RNF-12 | O sistema deve apresentar mensagens de erro claras e compreensíveis para o usuário. | Média     |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID  | Restrição |
|-----|-----------|
| 01  | O projeto deverá ser entregue até o final do semestre. |
| 02  | Não poderá ser desenvolvido um módulo de backend. |
| 03  | O sistema deverá ser desenvolvido apenas como aplicação web. |
| 04  | O projeto deverá contemplar somente os 30 primeiros dias do pós-operatório. |
| 05  | O sistema deverá possuir apenas dois perfis de usuário: paciente e médico. |
| 06  | O projeto deverá priorizar funcionalidades simples, compatíveis com o nível de desenvolvimento da equipe. |
| 07  | O sistema não substituirá a avaliação médica presencial. |
| 08  | O projeto não contará com integração a prontuários eletrônicos ou sistemas externos de clínicas. |
| 09  | O sistema deverá ser desenvolvido com foco em interface e funcionalidades compatíveis com HTML, CSS e JavaScript. |
| 10  | O projeto estará limitado ao escopo acadêmico definido para a disciplina, podendo sofrer adaptações conforme orientação do professor. |
