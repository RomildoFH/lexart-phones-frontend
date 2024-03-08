# Lexart Phones Frontend
O frontend do aplicativo de gerenciamento de produtos é desenvolvido em React e hospedado no Vercel. O frontend interage com o backend Node.js por meio de APIs RESTful para fornecer uma interface de usuário intuitiva e responsiva.


## Páginas
- Login e registro
- Produtos
- Adição e edição de produtos
- Gerênciamento de acesso

### Como se cadastrar
- O usuário deverá acessar atráves da rota
```
https://lexart-phones.vercel.app/login
```
- Clicar no botão <strong>Registro</strong> ou em <strong>Cadastrar-se</strong>
- Preencha todos os campos atendendo os seguintes requisitos:
  - Nome completo: Ter ao menos 3 dígitos;
  - Email: Ter formato de email válido, exemplo: <i>meuemail@email.com</i>;
  - Senha: Ter no mínimo 8 digitos, conter letras maiúsculas, minúsculas, números e caracteres especiais;
  - Confirmar senha: Ser igual a senha informada;
  
    <br/><strong>Importante</strong> essa aplicação ainda não possúi sistema de recuperação ou alteração de senha, então é necessário que insira uma senha que irá se recordar. Caso tenha a perdido, deverá ser feita alteração manual através do banco de dados.
    
### Como fazer login
- O usuário deverá acessar atráves da rota
```
https://lexart-phones.vercel.app/login
```
- Preencha todos os campos atendendo os seguintes requisitos:
  - Email: Informar um email já cadastrado;
  - Senha: Informar senha já cadastrada;

 ### Tela de produtos
 A tela de produtos, conterá uma lista de produtos já cadastrados, nela você terá acesso ao menu de filtragem, adição de produto, edição de produto ou exclusão de produto. Todos os acessos permitem realizar manipulação da lista, então tome cuidado ao deletar produtos.

 #### Paginação
 Por default, a aplicação é carregada com o limite de 10 itens por página, sendo necessária a nevegação entre páginas através do controlador na parte inferior da tabela. Caso deseje alterar a quantidade de itens renderiados por página, acesse o menu de filtragem e altere o campo de <strong>itens por página</strong>

 #### Filtragem
 Clique no botão de filtro, para abrir uma modal com as opções de filtro. Você poderá filtrar os itens por Fabricante, Modelo, Preço Mínimo, Preço Máximo e Cor. Todos os filtros são acumulativos, ou seja, você poderá utilizar mais de um filtro simultaneamente. Após selecionar todos os filtros desejados clique no botão Aplicar filttros. Caso deseje remover os filtros, poderá remover individualmente ou então clicar no botão Limpar filtros no menu de filtragem. Para fechar o menu você deverá clicar em algum lugar da tela fora dele.

 #### Busca por nome
 Na parte superior da lista de produtos, existe um input, onde você poderá inserir um termo para busca (ele não é case sensitive).

#### Ordenação
No topo da lista de produtos, existem os headers de cada coluna, onde ao lado de seu nome existe uma "seta" para baixo, ao clicar em uma das setas, você fará ordenação <strong>Crescente</strong> de acordo com a propriedade selecionada. A ordenação ocorre em toda a lista filtrada, ou seja, pode ocorrer de que elementos da última página, agora apareçam na primeira devido a ordenação que o usuário selecionou. Para limpar a ordenação clique na seta ao lado do header "Item".

#### Exclusão
Em cada linha, estão presentes 2 botões, sendo o botão de edição e o botão de exclusão. Ao clicar no botão de exclusão, o item será imédiatamente deletado, não haverá solicitação de confirmação, então cuidado ao utilizar este recurso.

#### Edição
Ao clicar no botão de edição, presente em cada linha, você será redirecionado para uma nova página, onde conterá um formulário com todas as informaçõess atuais do produto. Para editar, você deve substituir os campos que deseja atualizar com a nova informação e em seguida clicar no botão Salvar produto.

#### Adicionando produto
Clique no botão Adicionar produto no início da página, você será redirecionado para uma nova página, onde conterá um formulário que deverá ser preenchido com as informações sobre o produto.

### Menu de navegação
O meno de navegação aparecerá por padrão na lateral esquerda da página, porém, se você estiver acessando através de um dispositivo mobile, esse menu ficará oculto na parte superior, para abri-lo clique no botão Menu.

#### Produtos
Ao clicar no botão "produtos" você será redirecionado para a página principal.

#### Sair
Ao clicar no botão "sair" você será redirecionado para a página de login.

#### Acessos
O botão de "acessos" somente será exibido para usuários com a permissão de administrador

## Página de gestão de acesso
Essa página é permitida apenas para usuários com a permissão de administrador. Nela conterá uma lista de usuários cadastrados onde será possível acessar o menu de edição e também excluir um usuário.

#### Edição de usuário
Aqui você poderá editar o Nome, Email e a Permissão de acesso do usuário, após preenchimento, clique no botão Salvar e clique fora do menu para realizar o fechamento.

#### Exclusão de usuário
Clique no botão excluir presente na linha do usuário. Essa operação não solicitará confirmação, então cuidado para não deletar um usuário não desejado.


## Utilizando o projeto localmente

### Requisitos:
- Git
- GitHub
- Node v16.0.0 ou Node v20.0.0 (recomendado)
- NVM v0.38.0

1. Clone do repositório utilizando a chave SSH:
  ``` bash
  git clone git@github.com:RomildoFH/lexart-phones-frontend.git
  ```
2. Installe as dependências
  ```bash
  npm install
  ```
3. Altere a baseURL do arquivo <strong>"src/services/api.js"</strong> para a URL onde está funcionando a API que deseja utilizar. Caso queria utilizar a API que encontra-se em produção, utilize:
``` JavaScript
const api = axios.create({
  baseURL: "https://lexart-phones-api.vercel.app",
});
```
Caso tenha iniciado sua API utilize o localhost no qual ela está em andamento na sua máquina, por exemplo:
``` JavaScript
const api = axios.create({
  baseURL: "http://localhost:3001",
});
```

4. Start a aplicação react:
 ```bash
 npm start
 ```
5. Acesse a aplicação através do seu navegador utilizando o endereço do serviço iniciado pelo react.
