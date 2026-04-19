# Template padrão do site - HairCare Pro

O projeto utiliza um layout base em HTML e CSS padronizado para todas as páginas da aplicação. Esse template define a **identidade visual**, contempla princípios de **responsividade** para diferentes dispositivos e incorpora **iconografia funcional** com base em bibliotecas modernas, focando na melhor experiência para médicos e pacientes.

## Design
Tela Inicial

<img width="1302" height="906" alt="image" src="https://github.com/user-attachments/assets/1c35b945-9b7c-4ab6-90e2-8ce697a3bce5" />


Interface baseada em <b>Menu Lateral + Barra Superior</b>, com conteúdo central organizado em <b>painéis de acompanhamento e formulários clínicos</b>, com a exibição de <b>alertas, notificações e foto de perfil no menu superior</b>.

## Logo da Aplicação

<img width="243" height="100" alt="image" src="https://github.com/user-attachments/assets/e6f087a2-d7cc-4cbb-8adc-25cca158e74a" />


- **Localização**: Canto superior esquerdo, dentro do menu lateral
- **Nome exibido**: `HairCare Pro`
- **Função**: Redireciona para a tela inicial (Dashboard)
- **Acessibilidade**: `alt="Logo HairCare Pro - Início"`
  
## Menus Padrões

|### Menu Lateral|
|<img width="241" height="888" alt="image" src="https://github.com/user-attachments/assets/e07edcb2-5ec6-4e30-a662-7f83dff72d32" />|

|:------------------------------------------------------------------------------------------------:|


| Elemento                  | Função                                                            |
|---------------------------|-------------------------------------------------------------------|
| Botão Início / Dashboard  | Direciona o usuário para o painel principal de acompanhamento     |
| Botão Orientações         | Exibe a lista de pacientes (médico) ou orientações (paciente)     |
| Botão Chat com Médico     | Exibe a guia de comunicação com seu médico                        |
| Botão Histórico           | Acessa as ultimas atualizações e envios desde o início do processo|
| Botão Configurações       | Acessa as informações e opções de edição do perfil do usuário     |

### Barra Superior e Campo de Busca

<img width="1121" height="794" alt="image" src="https://github.com/user-attachments/assets/062c76b0-22c0-428a-9453-96aed6b8eac0" />
 
| Elemento         | Função                                                                         |
|------------------|--------------------------------------------------------------------------------|
| Campo de busca   | Permite ao médico pesquisar pacientes rapidamente                              |
| Botão buscar     | Executa a pesquisa digitada no campo de busca                                  |
| Alertas / Status | Exibe notificações pendentes ou alertas de pacientes em estado de atenção      |
| Foto do usuário  | Exibe informações do usuário logado (médico/paciente) e permite acesso ao menu |
     
## Área de Conteúdo Principal

### Visualização de Pacientes e Questionários

<img width="1124" height="793" alt="image" src="https://github.com/user-attachments/assets/d97a0e12-8a1c-4a9b-b48a-eefa860f2bda" />

| **Figura 5:** Área de conteúdo do HairCare Pro |
 - Cards com informações do paciente e status de recuperação  
- Visualização em blocos para os questionários diários e sintomas  
- Tags coloridas de status (Estável, Pendente, Atenção)  
- Layout em grid para o upload e galeria de fotos do pós-operatório  

| **Figura 6:** Paleta de cores do HairCare Pro
## Cores

<img width="679" height="853" alt="image" src="https://github.com/user-attachments/assets/cf02530d-2af6-4678-b72e-06adc2baaf95" />




A paleta do HairCare Pro foi definida com base em critérios de **acessibilidade visual**, garantindo contraste adequado e legibilidade para todos os tipos de usuários, abordando os diferentes **tipos de daltonismo**.

Padrões de Acessibilidade (a11y) Implementados:
- A plataforma oferece suporte ao daltonismo, fazendo com que a comunicação de informações críticas não dependa exclusivamente de cores.
- Alto contraste em todas as cores utilizadas atendem aos critérios do **WCAG 2.1 Nível AA**, garantindo a legibilidade.

## Tipografia

A tipografia utilizada na plataforma é a **Poppins**, uma fonte sem serifa conhecida por sua legibilidade e versatilidade, permitindo a criação de uma hierarquia visual clara.

### Hierarquia e Função

| Elemento                  | Estilo Tipográfico                   | Função principal                                               |
|---------------------------|--------------------------------------|----------------------------------------------------------------|
| **Título de Página** | Poppins, 32px, Bold                  | Indicar o nome ou tema principal da página                     |
| **Título de Seção** | Poppins, 24px, Semi Bold             | Destacar subdivisões do conteúdo (ex: Histórico de Respostas)  |
| **Título em cards** | Poppins, 22px/18px, Semi-bold        | Exibir informações em destaque em elementos do tipo card       |
| **Rótulos de Componentes**| Poppins, 16px, Regular               | Identificar campos, botões e perguntas do questionário         |
| **Corpo de Texto** | Poppins, 14px, Regular               | Apresentar descrições e orientações médicas                    |

## Iconografia
A iconografia do sistema define os ícones utilizados para facilitar a navegação. A tabela abaixo apresenta os ícones do HairCare Pro e suas respectivas funções:

<img width="666" height="386" alt="image" src="https://github.com/user-attachments/assets/319cac45-d018-4ed1-a9ff-e9e978669ab9" />

### Guia de Estilo CSS
Nesta seção estão descritos os estilos gerais aplicados a todos os ícones da aplicação.

#### **Classe Base para Ícones**
A classe base `.icon` define o estilo padrão:

```css
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  fill: currentColor; /* herda a cor do texto do elemento pai */
  vertical-align: middle;
}
