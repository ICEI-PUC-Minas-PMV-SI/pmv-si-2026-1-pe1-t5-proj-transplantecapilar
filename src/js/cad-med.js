document.addEventListener('DOMContentLoaded', () => {

  const formCadastroMedico = document.getElementById('formCadastroMedico');

  if (formCadastroMedico) {
    formCadastroMedico.addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão

      // 1. Captura as senhas primeiro para validação
      const senha = document.getElementById('senha').value;
      const confirma = document.getElementById('confirma').value;

      // Validação simples de senha
      if (senha !== confirma) {
        alert("As senhas não conferem. Por favor, digite novamente.");
        return; // Interrompe o processo aqui se der erro
      }

      // 2. Captura o restante dos dados
      const nome = document.getElementById('nome').value;
      const idade = document.getElementById('idade').value;
      const sexo = document.getElementById('sexo').value;
      const email = document.getElementById('email').value;
      const crm = document.getElementById('crm').value;
      const ufCrm = document.getElementById('uf-crm').value;
      const especialidade = document.getElementById('especialidade').value;

      // 3. Monta o objeto do Médico
      const novoMedico = {
        id: Date.now(),
        tipo: 'medico',
        nome: nome,
        idade: idade,
        sexo: sexo,
        email: email,
        senha: senha, // Num app real, senhas NUNCA vão para o localStorage assim!
        dadosProfissionais: {
          crm: crm,
          uf: ufCrm,
          especialidade: especialidade
        }
      };

      // 4. Busca médicos já cadastrados ou cria array vazio
      let medicosCadastrados = JSON.parse(localStorage.getItem('medicosCadastrados')) || [];

      // 5. Adiciona e salva no localStorage
      medicosCadastrados.push(novoMedico);
      localStorage.setItem('medicosCadastrados', JSON.stringify(medicosCadastrados));

      console.log('Médico cadastrado com sucesso:', novoMedico);
      alert('Cadastro realizado com sucesso!');

      // Redireciona para a tela de login (que você já tem linkada no HTML)
      window.location.href = 'login.html';
    });
  }
});