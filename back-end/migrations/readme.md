# Projeto de Banco de Dados - BayArchon

## Sobre Este Arquivo

Este documento descreve a arquitetura, organização, padrões de desenvolvimento e práticas adotadas no banco de dados do sistema BayArchon.

O objetivo desta documentação é servir como referência técnica para desenvolvedores, administradores de banco de dados (DBAs) e demais colaboradores envolvidos na manutenção e evolução do projeto.

---

## Sumário

- Sobre Este Arquivo
- Ficha Técnica do Banco de Dados
- Domínios de Negócio
- Estrutura de Diretórios
- Ambientes
- Tecnologias Utilizadas
- Versionamento
- Organização das Migrations
- Convenções do Projeto
- Auditoria
- Soft Delete
- Controle de Acesso
- Backup
- Melhorias Futuras
- Equipe Responsável

---

## Ficha Técnica do Banco de Dados

| Item | Descrição |
|-------|-----------|
| **SGBD** | PostgreSQL |
| **Plataforma** | Supabase |
| **Versionamento** | Flyway |
| **Linguagem SQL** | PostgreSQL SQL / PLpgSQL |
| **Controle de Código** | Git + GitHub |
| **Armazenamento de Arquivos** | Supabase Storage |
| **Autenticação** | Supabase Auth |
| **Modelo de Chaves** | UUID |
| **Auditoria** | Triggers + Logs |
| **Exclusão Lógica** | Soft Delete |

---

## Domínios de Negócio

O projeto foi organizado em sete domínios de negócio, sendo que cada domínio corresponde a um schema específico no banco de dados. Essa organização tem como objetivo separar responsabilidades, facilitar a manutenção e promover maior escalabilidade da aplicação. A seguir, são apresentadas as descrições de cada um deles.

- **Registry:** responsável pelo gerenciamento das entidades principais do sistema, incluindo usuários, empresas, clientes, setores, projetos, contratos e demais informações cadastrais.

- **Documents:** responsável pelo gerenciamento dos documentos do sistema, contemplando seu cadastro, categorização, visibilidade, relacionamentos e integração com o armazenamento de arquivos.

- **Compliance:** responsável pela gestão de documentos relacionados à conformidade, como Termos de Uso, Política de Privacidade, Política de Cookies e demais políticas institucionais, além do registro de aceite dos usuários.

- **Logs:** responsável pelo armazenamento dos registros de auditoria, mantendo o histórico das operações realizadas no banco de dados, como inserções, alterações, exclusões lógicas e demais eventos relevantes.

- **Functions:** responsável pelo armazenamento das funções reutilizáveis do banco de dados, utilizadas em validações, regras de negócio, constraints e triggers.

- **Storage:** responsável pela integração entre os documentos cadastrados no sistema e os arquivos armazenados no Supabase Storage, mantendo o relacionamento entre os metadados e os objetos físicos.

## Estrutura de Diretórios

A organização do projeto segue o princípio de separação por responsabilidade.

-- COLOCAR 

## Ambientes

O banco de dados está hospedado na plataforma **Supabase** e foi organizado em dois ambientes distintos: **DEV** e **PROD**. Essa separação permite que novas funcionalidades sejam desenvolvidas e validadas antes de serem disponibilizadas no ambiente de produção. A seguir, são apresentadas as descrições de cada ambiente.

- **DEV:** ambiente destinado ao desenvolvimento contínuo do banco de dados, utilizado para implementação de novas funcionalidades, testes de migrations, validação de funções, triggers e demais alterações estruturais.

- **PROD:** ambiente destinado ao funcionamento oficial do sistema, contendo apenas alterações previamente validadas e aprovadas para utilização.

O fluxo de deploy segue a sequência:

```text
DEV → PROD
```

## Integrações Externas

O banco de dados comunica-se com os serviços utilizados pelo sistema, sendo responsável pelo armazenamento e gerenciamento das informações da aplicação. As principais integrações são realizadas com a API da aplicação e com os serviços disponibilizados pela plataforma Supabase.

**API:**  >>>>>>>>> COLOCAR <<<<<<<

**Supabase Auth:** responsável pelo gerenciamento da autenticação dos usuários do sistema, armazenando as credenciais e informações de acesso.

**Supabase Storage:** responsável pelo armazenamento dos arquivos associados aos documentos cadastrados no sistema, mantendo a separação entre os metadados armazenados no banco de dados e os arquivos físicos.

A comunicação entre esses componentes permite o funcionamento integrado da aplicação, garantindo a consistência das informações e a segurança dos dados armazenados.

## Acesso e Uso

O acesso ao banco de dados deve ser realizado por usuários autorizados e vinculados ao projeto no Supabase. A seguir, são apresentados os procedimentos para acesso aos ambientes disponíveis.

- Realizar o login na plataforma **Supabase** utilizando uma conta com permissão de acesso ao projeto;

- Selecionar o ambiente correspondente (**DEV** ou **PROD**);

- Utilizar o editor SQL disponibilizado pela plataforma ou configurar uma conexão por meio de clientes compatíveis com PostgreSQL, utilizando as credenciais fornecidas pelo Supabase;

- As alterações estruturais no banco de dados devem ser realizadas exclusivamente por meio das migrations gerenciadas pelo Flyway, respeitando o fluxo de versionamento estabelecido pelo projeto.

## Versionamento

O código-fonte do banco de dados é versionado utilizando o GitHub, de modo que o repositório reflita continuamente o estado atual do banco de dados implantado.

Todas as alterações estruturais são realizadas por meio de migrations gerenciadas pela ferramenta Flyway, garantindo rastreabilidade, controle de versões e padronização no processo de evolução do banco de dados.

Cada migration representa uma alteração específica na estrutura do banco, como criação ou modificação de schemas, tabelas, funções, triggers, índices, constraints e permissões. As migrations seguem uma numeração sequencial e são executadas na ordem de sua versão, assegurando que todos os ambientes permaneçam sincronizados.

Esse processo permite a reconstrução do banco de dados de forma consistente, além de facilitar a manutenção, o controle das alterações e o trabalho colaborativo entre os desenvolvedores.

## Observabilidade

O banco de dados possui mecanismos de observabilidade voltados ao acompanhamento das operações realizadas e à auditoria das informações armazenadas.

A rastreabilidade das ações é garantida por meio de registros automáticos de auditoria, implementados através de funções e triggers responsáveis por registrar eventos relevantes, como inserções, atualizações, exclusões lógicas e alterações de estado das entidades do sistema.

Além disso, a plataforma Supabase disponibiliza ferramentas para monitoramento da instância do banco de dados, permitindo acompanhar métricas de utilização, desempenho, execução de consultas e registros de logs operacionais, auxiliando na identificação de falhas e na manutenção da integridade do ambiente.

## Política de Backup

O banco de dados utiliza o mecanismo de backup automático disponibilizado pela plataforma Supabase.

Os projetos dos planos Pro possuem backups diários automáticos, com disponibilidade dos últimos 7 dias de backups para restauração. Os backups podem ser consultados e restaurados por meio da seção de backups do banco de dados no painel do Supabase. 

Esse mecanismo permite a recuperação do banco de dados a partir de um dos backups disponíveis, contribuindo para a proteção dos dados contra falhas ou perda acidental.

Para necessidades de recuperação mais precisas, o Supabase também disponibiliza o Point-in-Time Recovery (PITR) como recurso adicional, permitindo a recuperação para um ponto específico no tempo dentro do período de retenção configurado. 

Os backups do banco de dados referem-se aos dados armazenados no PostgreSQL. Os objetos armazenados por meio do Supabase Storage não são incluídos diretamente nesses backups, sendo necessário considerar mecanismos específicos de proteção e recuperação para os arquivos armazenados.


## Arquivamento e Versionamento

O código-fonte do banco de dados é armazenado e versionado por meio do GitHub, garantindo o controle das alterações realizadas ao longo do desenvolvimento e a rastreabilidade das versões do projeto.

As alterações estruturais do banco de dados são implementadas por meio de migrations gerenciadas pelo Flyway, permitindo a reconstrução consistente do banco em diferentes ambientes e mantendo o histórico completo de sua evolução.

## Retenção de Backups
## Colocar

## Considerações de Evolução

Com o crescimento do banco de dados e da utilização do sistema, recomenda-se a adoção das seguintes melhorias:

- Implementação de rotinas automatizadas de backup e recuperação de dados;

- Expansão da cobertura dos logs de auditoria para contemplar todas as entidades do sistema;

- Implementação e aprimoramento de políticas de segurança e controle de acesso (Row-Level Security - RLS), quando aplicável;

- Monitoramento contínuo do desempenho do banco de dados, com revisão e otimização de índices e consultas conforme o aumento do volume de dados;

- Revisão periódica das funções, triggers e constraints, visando garantir a integridade dos dados e facilitar futuras manutenções;

- Atualização contínua da documentação técnica e do dicionário de dados, assegurando que reflitam a estrutura atual do banco de dados.

## Convenções do Projeto

Nas seções a seguir são apresentadas as convenções adotadas durante o desenvolvimento do banco de dados, com o objetivo de garantir organização, padronização, integridade, segurança, rastreabilidade e facilidade de manutenção ao longo do ciclo de vida do projeto.

Todas as novas implementações devem seguir os padrões descritos nesta documentação. Alterações nas convenções estabelecidas devem ser previamente analisadas e aprovadas pela equipe responsável pelo desenvolvimento do banco de dados.

---

## Criação de Objetos em Geral

As seguintes diretrizes devem ser observadas durante a criação de novos objetos no banco de dados:

- Nenhum objeto deve ser criado no schema `public`;

- Todo objeto deve ser criado no schema correspondente ao seu domínio de negócio;

- Funções reutilizáveis devem ser criadas no schema `functions`;

- Enumerações (`ENUMs`) devem ser criadas no schema ao qual pertencem, evitando dependências desnecessárias entre domínios;

- Tabelas, índices, constraints, triggers e demais objetos devem permanecer organizados de acordo com o schema responsável pela funcionalidade implementada;

- Todo novo objeto deve possuir nomenclatura padronizada e documentação compatível com as convenções do projeto;

- Alterações estruturais devem ser realizadas exclusivamente por meio de migrations gerenciadas pelo Flyway.

## Organização de Arquivos

A organização dos arquivos do projeto segue o padrão de versionamento adotado pelo Flyway, no qual cada alteração estrutural é implementada por meio de uma migration específica.

As seguintes diretrizes devem ser observadas:

- Cada migration deve representar uma única alteração lógica no banco de dados, facilitando sua rastreabilidade e manutenção;

- As migrations devem seguir a convenção de nomenclatura `V<versão>__<descrição>.sql`, utilizando numeração sequencial e descrições objetivas;

- Os objetos do banco de dados devem ser criados no schema correspondente ao seu domínio de negócio, respeitando a organização definida pelo projeto;

- Funções reutilizáveis devem ser implementadas no schema `functions`;

- Enumerações (`ENUMs`), tabelas, índices, constraints, triggers e demais objetos devem ser criados na migration correspondente à funcionalidade implementada, mantendo a organização e a legibilidade do histórico de versões;

- Scripts de concessão de permissões (`GRANT`) e demais configurações de segurança devem ser versionados por meio de migrations específicas, facilitando o controle das alterações de acesso;

- Toda nova funcionalidade deve possuir sua própria migration, evitando alterações diretas em scripts já executados e preservando a consistência do histórico do banco de dados.

## Ordem de Colunas na Criação de Tabelas

As colunas das tabelas devem ser declaradas seguindo a ordem abaixo, visando garantir padronização, legibilidade e facilitar a manutenção do banco de dados.

1. Chave primária, sem a declaração de sua `CONSTRAINT`;

2. Colunas de auditoria, nesta ordem:
   - `created_at`;
   - `updated_at`;

   Caso alguma dessas colunas não seja aplicável à tabela, ela poderá ser omitida.

3. Colunas de controle da entidade, nesta ordem:
   - `deleted_at`
   - `is_deleted`

4. Colunas contendo os dados da entidade.

5. Chaves estrangeiras, sem a declaração de suas respectivas `CONSTRAINTs`.

6. Declaração da `CONSTRAINT` de chave primária (`PRIMARY KEY`).

7. Declarações das `CONSTRAINTs` de chaves primárias compostas, quando aplicáveis.

8. Declarações das `CONSTRAINTs` de chaves únicas (`UNIQUE`).

9. Declarações das `CONSTRAINTs` de chaves únicas compostas, quando aplicáveis.

10. Declarações das demais `CONSTRAINTs`, como `CHECK` e `EXCLUDE`, quando aplicáveis.

11. Declarações das `CONSTRAINTs` de chaves estrangeiras.

12. Declarações das `CONSTRAINTs` de chaves estrangeiras compostas, quando aplicáveis.


As etapas que não se aplicarem à estrutura da tabela podem ser omitidas.

## Nomenclaturas de Objetos

### Princípios Gerais

As nomenclaturas dos objetos do banco de dados devem seguir padrões que garantam consistência, legibilidade e facilidade de manutenção ao longo do projeto.

As seguintes convenções devem ser respeitadas:

- Utilizar o caractere underscore (`_`) para separar palavras;

- Utilizar apenas letras minúsculas (`lowercase`);

- Utilizar nomes descritivos e objetivos;

- As tabelas devem ser nomeadas no plural, conforme o padrão adotado pelo projeto;

- Utilizar preferencialmente o idioma inglês para nomes de objetos, colunas e demais elementos do banco de dados;

- Evitar abreviações que possam comprometer a compreensão do objeto.

---

### Prefixos dos Objetos

Todos os objetos devem seguir os prefixos abaixo.

| Objeto | Prefixo | 
|---------|:-------:|
| Tabela | `t_` | 
| Enum | `e_` | 
| Function | `fn_` | 
| Trigger | `trg_` | 
| View | `v_` | 
| Materialized View | `mv_` | 
| Índice | `idx_` | 
| Sequence | `seq_` | 
| Procedure | `p_` | 
---

### Prefixos das Constraints

As constraints devem seguir a nomenclatura abaixo.

| Constraint | Prefixo |
|------------|:-------:|
| Primary Key | `pk_` | 
| Foreign Key | `fk_` | 
| Unique | `uq_` | 
| Check | `chk_` | 
| Exclude | `ex_` | 

---

### Nomenclatura de Colunas de Chaves Estrangeiras

As colunas que representam chaves estrangeiras (Foreign Keys) devem seguir um padrão simples e padronizado, facilitando sua identificação e manutenção.

A nomenclatura deve ser composta pelo prefixo, nome da tabela que referencia, nome da entidade referenciada`.

**Padrão:**

```text
fk_<entidade>_<entidade-referenciada>
```

**Exemplos:**

```text
fk_users_sectors

fk_chats_user

```

Quando houver mais de uma referência para a mesma entidade na tabela, o nome da coluna deve indicar claramente sua finalidade.

**Exemplos:**

```text
fk_logs_user_changed

fk_logs_perfomed_by

```

Esse padrão deve ser utilizado independentemente do schema ao qual pertence a tabela referenciada, evitando nomenclaturas excessivamente longas e mantendo a legibilidade do modelo de dados.

# Nomenclaturas de CONSTRAINTs Nomeáveis

As `CONSTRAINTs` nomeáveis devem utilizar um prefixo que identifique seu tipo, seguido pelo nome da tabela e, quando aplicável, pelo nome da coluna ou das colunas envolvidas.

O padrão geral de nomenclatura é:

```text
<sigla_constraint>_<nome_tabela>_<nome_coluna>
```

Para `CONSTRAINTs` compostas, os nomes das colunas envolvidas devem ser adicionados à nomenclatura.

Exemplos:

```text
pk_users

fk_documents_category_id

uq_companies_clients_cnpj

chk_documents_source

```

Para `CONSTRAINTs` compostas:

```text
uq_user_company_id

uq_document_category_type

fk_document_company_project
```

A nomenclatura deve ser objetiva e permitir identificar o tipo de `CONSTRAINT` e os objetos envolvidos.

---

# Nomenclaturas de Enumerações, Funções e Procedimentos

## Enumerações

As enumerações (`ENUMs`) devem utilizar o prefixo `e_`, seguido de um nome descritivo relacionado à finalidade da enumeração.

O padrão adotado é:

```text
e_<nome_enum>
```

Exemplos:

```text
e_type_terms

e_status_documents

e_visibility_documents
```

Quando a enumeração estiver relacionada exclusivamente a uma entidade ou funcionalidade específica, seu nome deve refletir essa finalidade.

---

## Funções

As funções devem utilizar o prefixo `fn_`, seguido de uma descrição objetiva da operação realizada.

O padrão adotado é:

```text
fn_<nome_funcao>
```

Exemplos:

```text
fn_is_valid_email

fn_is_valid_cnpj

fn_is_valid_text

fn_update_updated_at
```

As funções reutilizáveis devem ser armazenadas no schema `functions`.

Funções auxiliares devem ser armazenadas no schema `helpers`.

---

## Procedimentos

Quando utilizados, os procedimentos devem utilizar o prefixo `sp_`, seguido de uma descrição objetiva da operação realizada.

O padrão adotado é:

```text
sp_<nome_procedimento>
```

Exemplo:

```text
sp_process_document
```

---

# Nomenclaturas de Triggers

As triggers devem utilizar o prefixo `trg_`, seguido da operação realizada e do nome da tabela à qual estão associadas.

O padrão adotado é:

```text
trg_<operacao>_<nome_tabela>
```

Exemplos:

```text
trg_update_updated_at

trg_log_user_created

trg_log_document_created

trg_log_document_updated

trg_log_document_deleted
```

Quando a trigger estiver relacionada a uma operação específica de auditoria, o nome deve indicar claramente o evento registrado.

Exemplos:

```text
trg_log_user_created

trg_log_document_visibility_changed

trg_log_document_deleted
```

As triggers devem ser nomeadas de forma clara e objetiva, permitindo identificar a operação realizada e a finalidade do mecanismo.

---

# Nomenclaturas de Índices

Os índices devem utilizar o prefixo `idx_`, seguido do nome da tabela e, quando aplicável, pelo nome da coluna ou das colunas indexadas.

O padrão adotado é:

```text
idx_<nome_tabela>_<nome_coluna>
```

Exemplos:

```text
idx_users_email

idx_documents_category_id

idx_documents_created_at
```

Para índices compostos, as colunas devem ser adicionadas na ordem em que são utilizadas no índice.

Exemplo:

```text
idx_documents_client_id_project_id
```

Índices parciais devem manter o mesmo padrão de nomenclatura, adicionando uma descrição que permita identificar a condição aplicada.

Exemplo:

```text
idx_users_email_active
```
# Equipe Responsável

Este projeto de banco de dados foi desenvolvido pela equipe responsável pelo desenvolvimento do sistema, contemplando a modelagem, implementação e manutenção da estrutura do banco de dados.

A responsabilidade pelo desenvolvimento e manutenção do banco de dados é atribuída à equipe de desenvolvimento, com destaque para **Maria Eduarda Sinis**, responsável pela modelagem e implementação do banco de dados.

Para dúvidas técnicas, contribuições ou solicitações relacionadas à manutenção e evolução do banco de dados, entrar em contato pelo email eduarda.sinis@gmail.com.
