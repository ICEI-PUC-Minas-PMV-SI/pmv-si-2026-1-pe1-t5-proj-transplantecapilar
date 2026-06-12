document.addEventListener('DOMContentLoaded', () => {

  const formCadastroMedico = document.getElementById('formCadastroMedico');

  if (formCadastroMedico) {
    formCadastroMedico.addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão

      // Salva os dados digitados
      const senha = document.getElementById('senha').value;
      const confirma = document.getElementById('confirma').value;
      const email = document.getElementById('email').value;
      const nome = document.getElementById('nome').value;
      const dataNascimento = document.getElementById('dataNascimento').value;
      const sexo = document.getElementById('sexo').value;
      const crm = document.getElementById('crm').value;
      const ufCrm = document.getElementById('uf-crm').value;
      const especialidade = document.getElementById('especialidade').value;

      // Verifica se as senhas são iguais
      if (senha !== confirma) {
        alert("As senhas não conferem. Por favor, digite novamente.");
        return; 
      }

      // Verifica se já tem cadasto
      let medicosCadastrados = JSON.parse(localStorage.getItem('medicosCadastrados')) || [];

      // Verifica se o e-mail já existe no sistema
      const emailJaExiste = medicosCadastrados.some(medico => medico.email === email);
      if (emailJaExiste) {
        alert("Este e-mail já está em uso por outro médico. Tente fazer login.");
        return;
      }

      // Monta o objeto do Médico
      const novoMedico = {
        id: Date.now(),
        tipo: 'medico',
        nome: nome,
        dataNascimento: dataNascimento,
        sexo: sexo,
        email: email,
        senha: senha,
        dadosProfissionais: {
          crm: crm,
          uf: ufCrm,
          especialidade: especialidade
        }
      };

      // Adiciona o novo médico e salva no localStorage
      medicosCadastrados.push(novoMedico);
      localStorage.setItem('medicosCadastrados', JSON.stringify(medicosCadastrados));

      console.log('Médico cadastrado com sucesso:', novoMedico);
      alert('Cadastro realizado com sucesso!');

      // Redireciona para a tela de login
      window.location.href = 'login.html';
    });
  }
});