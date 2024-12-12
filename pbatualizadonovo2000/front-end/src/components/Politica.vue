<template>
    <body>
        <div>
          <!-- Politica da biblioteca -->
            <h2>Politca Da Biblioteca</h2>
            <p>
                1. Duração do Empréstimo
O período padrão de empréstimo de materiais é de 14 dias.
Usuários podem solicitar a renovação do empréstimo por mais 7 dias, desde que o material não tenha sido reservado por outro usuário.

2. Renovações
É permitido renovar o empréstimo de um item até 2 vezes consecutivas.
A renovação deve ser solicitada antes da data de vencimento do empréstimo.
Materiais reservados por outros usuários não poderão ser renovados.

3. Limite de Itens Emprestados
Usuários com o perfil de visitante podem emprestar até 3 itens simultaneamente.
Usuários com o perfil de bibliotecário ou admin podem emprestar até 10 itens.

4. Multas por Atraso
Será aplicada uma multa de R$2,00 por dia de atraso, por item, em caso de não devolução no prazo estipulado.
A multa máxima por item atrasado será de R$50,00.
O usuário será impedido de realizar novos empréstimos até que todas as multas sejam quitadas.

5. Reservas de Materiais
Os usuários podem reservar materiais que estão emprestados.
Quando o material reservado for devolvido, o usuário será notificado por e-mail e terá 3 dias úteis para retirar o material.
Caso o material não seja retirado no prazo, a reserva será cancelada.

6. Devoluções
A devolução dos materiais deve ser feita pelo próprio usuário diretamente na plataforma ou, no caso de itens físicos, no local indicado na biblioteca.
Materiais devolvidos fora do prazo implicam a aplicação das multas previstas nesta política.

7. Notificações
Os usuários receberão uma notificação via e-mail ou SMS:
3 dias antes da data de vencimento do empréstimo.
No dia do vencimento.
Após a data de vencimento, até que o item seja devolvido.

8. Materiais Especiais
Certos itens, como obras raras ou edições limitadas, poderão ter prazos de empréstimos diferenciados, conforme indicado no sistema.
            </p>
            <button @click="this.$router.push('/paginicial')">voltar</button>
        </div>
    </body>
</template>


<style scoped>
body{
  display: flex; 
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center;  /* Centraliza verticalmente */
    height: 100vh;
    flex-direction: column;
    background-size: cover;
    background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
}
div{
  background-color:  rgb(255, 183, 0);
  width: 400px;
  text-align: center;
  border-radius: 15px;
} 
</style>