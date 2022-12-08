# ${template.project_name}

[COLOQUE AQUI A DESCRIÇÃO/MOTIVO DO PROJETO] Ex.: Serviço com as implementações referentes ao domínio core da plataforma Omega.

## Arquitetura e stack

- **Visão da solução**: acesse o [Modelo de domínio](https://omegaenergiarenovavel.sharepoint.com/sites/OMCDigital140/SitePages/Modelo-de-Dom%C3%ADnio.aspx) e a [Visão de Plataforma](https://omegaenergiarenovavel.sharepoint.com/sites/OMCDigital140/SitePages/Vis%C3%A3o-da-Plataforma-Omega.aspx) para compreender a **solução como um todo** e onde este projeto se enaixa.

- **Macro arquitetura**: acesse o [Desenho de arquitetura da solução](https://omegaenergiarenovavel.sharepoint.com/sites/OMCDigital140/SitePages/Desenho-plataforma-Omega.aspx) para compreender a **macro arquitetura da plataforma** e onde este projeto se encaixa.

- **Micro arquitetura**: acesse a documentação sobre [camadas e padrões de arquitetura](https://omegaenergiarenovavel.sharepoint.com/sites/OMCDigital140/SitePages/Camadas.aspx) para compreender como está organizado este projeto.

- Este projeto foi criado a partir do template [example-backend-nestjs](https://github.com/omega-energia/example-backend-nestjs), e os detalhes sobre a composição padrão do projeto podem ser vista no [README do template](https://github.com/omega-energia/example-backend-nestjs#readme).

- Detalhes da stack e integrações:
    - A implementação é feita em [TypeScript](https://www.typescriptlang.org/) rodando sobre [Node 19](https://nodejs.org/).
    - Uso do framework [NestJs 9.*](https://nestjs.com/).
    - Persistência de dados é feita em um banco [PostgreSQL 14.*](https://www.postgresql.org/).
    - Filas são gerenciadas utilizando o [Redis 7.*](https://redis.io/).
    - As bibliotecas utilizadas pelo projeto podem ser vista no arquivo [package.json](package.json) que está na raiz do projeto.

---

## Execução do projeto/sistema

### Via docker-compose

O projeto está configurado para execução com [docker-compose](https://docs.docker.com/compose/), onde já estão configuradas variáveis de ambiente e demais dependências. Para rodar o projeto, utilize:

```bash
# Para subir a aplicação
docker-compose up app
```

```bash
# Para executar os testes
docker-compose up test
```

```bash
# Para executar acesso ao console e rodar qualquer comando NPM desejado
docker-compose run --rm console
```

```bash
# Para executar apenas as ferramentas auxiliares como banco de dados, cache, mensageria, etc...
docker-compose --profile tools up
```

### Localmente via nodejs:

Em ambiente local ou de testes, o serviço utiliza variáveis de ambiente que podem ser definidas no arquivo `.env`. 
Tal arquivo pode ser criado a partir do exemplo `.env.example`.

É obrigatório informar as envs (lembrando que via docker-compose isso não é necessário):
- DATABASE_URL: Exemplo `postgres://postgres:postgres@localhost:5432/myapp`.
- REDIS_HOST: Exemplo `localhost`
- REDIS_PORT: Exemplo `6379`

Sugere-se o uso de docker-compose para subir o banco de dados e o redis, através do comando:
```bash
# Para executar apenas as ferramentas auxiliares como banco de dados, cache, mensageria, etc...
docker-compose --profile tools up
```

#### Para rodar o projeto, utilize:

```bash
# Para subir a aplicação
npm run start
```

```bash
# Para executar os testes
npm run test
```
Ou 
```bash
# Para executar os testes com relatórios de teste e cobertura
npm run test:cov
```

---
## Alterações, testes e validação

Toda alteração no código deve ser realizada respeitando o processo |DETALHAR|.

O testes automatizados são executados através da ferramenta [jest](https://jestjs.io/), e podem ser executados conforme instruções na seção anterior.
Após execução dos testes, é gerado no diretório `report` os relatórios:
    - coverage (cobertura de código): `/report/coverage/lcov-report/index.html`.
    - tests (resultados dos testes): `/report/test.html`.

No processo de CI, tais relatórios podem ser visualizados através do Pull Request criado para a alteração, ou ainda nas actions executadas (Aba Actions do github).

Para validar e chamar as API's manualmente acesse a página com o [Swagger](https://swagger.io/):
- Local: [http://localhost:3000/apidoc](http://localhost:3000/apidoc)
- Ambientes publicados: escolha o ambiente desejado em [deployments](../../deployments)

---

## Atualização e monitoramento.

|DETALHAR|