# Around U.S. — Auth

## Sobre o projeto

**Around U.S.** é uma aplicação web de rede social fotográfica desenvolvida como projeto do bootcamp da TripleTen. Os usuários podem criar uma conta, fazer login e, uma vez autenticados, acessar um feed de fotos, curtir imagens, adicionar novos cards com fotos de lugares e editar seu perfil.

Este sprint focou na implementação do fluxo completo de autenticação com JWT, incluindo registro, login, proteção de rotas e persistência de sessão.

---

## Links

- **GitHub Pages:** [https://rafaguanciale.github.io/web_project_around_auth/](https://rafaguanciale.github.io/web_project_around_auth/)

---

## Funcionalidades

- **Cadastro de usuário** — registro com e-mail e senha via API externa
- **Login com JWT** — autenticação com token salvo no `localStorage` para persistência de sessão
- **Rotas protegidas** — usuários não autenticados são redirecionados para `/signin`
- **Rotas anônimas** — usuários já autenticados são redirecionados para `/` ao tentar acessar login/registro
- **Validação de token** — ao recarregar a página, o token é verificado automaticamente para restaurar a sessão
- **Feed de cards** — visualização, curtida e exclusão de fotos
- **Adição de novos cards** — formulário para publicar novas fotos com título e URL da imagem
- **Edição de perfil** — alteração de nome, descrição e avatar
- **Feedback visual** — InfoTooltip com animação de sucesso/erro após tentativa de registro
- **Loading state** — esqueleto de carregamento enquanto o token é validado

---

## Tecnologias e técnicas utilizadas

### Frontend

**React 19** | Construção da interface com componentes funcionais
**React Router DOM v6** | Navegação entre páginas com `Routes`, `Route` e `useNavigate`
**Vite** | Bundler e servidor de desenvolvimento
**CSS Modules / BEM** | Estilização modular com metodologia BEM
**Context API** | Gerenciamento de estado global (`CurrentUserContext`, `AuthContext`)

### Autenticação

**JWT (JSON Web Token)** | Token gerado pela API após login, usado para autenticar requisições 
**localStorage** | Armazenamento do token no navegador para persistência de sessão 
**checkToken** | Validação do token ao carregar a aplicação |
**ProtectedRoute** | Componente HOC que protege rotas privadas e anônimas 

---

# Análise de Segurança do Projeto Around Auth

Durante o desenvolvimento deste projeto, algumas práticas básicas de segurança já foram aplicadas, mas também identifiquei pontos que poderiam ser melhorados.

## Autenticação

O sistema utiliza autenticação baseada em JWT. Após o login, o token é armazenado no localStorage para manter a sessão do usuário ativa entre atualizações da página.

Essa abordagem é simples e funcional, porém possui uma limitação de segurança: caso ocorra um ataque XSS, um invasor poderia acessar o token armazenado no navegador. Uma alternativa mais segura seria armazenar o JWT em cookies com as opções HttpOnly e SameSite.

## Controle de Acesso

As rotas privadas são protegidas através do componente ProtectedRoute. Usuários não autenticados são redirecionados para a página de login, impedindo o acesso às áreas restritas da aplicação.

Além disso, ao atualizar a página, o token salvo é validado novamente para restaurar a sessão do usuário.

## Validação de Dados

O formulário utiliza validações básicas no frontend, como comprimento mínimo e máximo de campos e validação de URLs.

Entretanto, a validação realizada no cliente não é suficiente por si só. Em uma aplicação real, todas as entradas também devem ser validadas no servidor para evitar dados maliciosos ou inconsistentes.

## Proteção contra XSS

O projeto não utiliza innerHTML nem insere conteúdo HTML fornecido pelo usuário diretamente na página, o que reduz significativamente os riscos de Cross-Site Scripting (XSS).

Mesmo assim, em aplicações maiores, seria importante implementar sanitização de dados e políticas de segurança de conteúdo (Content Security Policy).

## Dependências

As dependências do projeto são gerenciadas pelo npm. Antes da publicação em produção, seria recomendado executar npm audit para verificar possíveis vulnerabilidades conhecidas nas bibliotecas utilizadas.

## Melhorias Futuras

Algumas melhorias que poderiam aumentar a segurança do projeto são:

* Armazenar JWT em cookies HttpOnly em vez de localStorage.
* Implementar Content Security Policy (CSP).
* Realizar validação e sanitização de dados no backend.
* Adicionar proteção contra força bruta utilizando rate limiting.
* Monitorar dependências regularmente com npm audit.

## Conclusão

O projeto implementa os conceitos básicos de autenticação e controle de acesso aprendidos até o momento. Apesar de ser adequado para fins educacionais, existem melhorias importantes de segurança que poderiam ser aplicadas em um ambiente de produção para reduzir riscos relacionados a XSS, roubo de tokens e ataques automatizados.
