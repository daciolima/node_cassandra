### NodeJS acessando NoSQL Cassandra.
-  Banco de Dados NoSQL Cassandra dockerizado;
-  NodeJS 16
-  Ambiente Python 3.9.7 para os script python


**Comandos Cassandra**
```python
# Acesse página download do csqlsh para acesso ao cassandra via terminal: 
# https://docs.datastax.com/en/installing/docs/installCqlsh.html
# Após subir container cassandra e configurar o csqlsh acesse o terminal e digite:
cqlsh
```

```python 
# Criando keyspace(database) Ex: mybusiness
CREATE KEYSPACE mybusiness WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
```

```python 
# Acessando keyspace
use mybusiness;
```

```python 
# Criando Table
CREATE TABLE mybusiness.company (company_id uuid, name TEXT, street TEXT, number TEXT, city TEXT, state TEXT, postcode TEXT, country TEXT, email TEXT, phone TEXT, updated_at timestamp, created_at timestamp,  PRIMARY KEY(company_id));
```

**Script python para gerar dados fake em arquivo CSV**
Instalação da biblioteca Fake é necessária.
```python 
pip install fake
```

```python 
import csv
from faker import Faker
import uuid

fake = Faker(['pt_BR'])

# Abrindo arquivo CSV
with open('data_fake_company.csv', mode='w', newline='') as file:
    writer = csv.writer(file, delimiter=';')

    # Escrevendo cabeçalho
    writer.writerow(['id', 'name', 'street', 'number', 'city', 'state', 'postcode', 'country', 'email', 'phone', 'updated_at', 'created_at'])

    # Gerando valores fictícios
    for _ in range(1000):
        id = uuid.uuid1()
        name = fake.company()
        street = fake.street_name() 
        number = fake.building_number()
        city = fake.city()
        state = fake.country_code()
        postcode = fake.postcode() 
        country = fake.current_country()
        email = fake.email()
        phone = fake.phone_number()
        updated_at = fake.iso8601()
        created_at = fake.iso8601()
        writer.writerow([id, name, street, number, city, state, postcode, country, email, phone, updated_at, created_at])

print("Arquivo data_fake_company.csv gerado com sucesso.")
```

**Comando CSQL para importação de dados CSV para a database Cassandra**
```python 
# Populando a tabela mybusiness.company
COPY mybusiness.company(company_id, name, street, number, city, state, postcode, country, email, phone, updated_at, created_at) FROM './data_fake_company.csv' WITH DELIMITER = ';' AND HEADER=TRUE;
```

**Projeção teste dos dados inseridos**
```python 
SELECT * FROM mybusiness.company;
```

**Rodar teste de comunicação Node Cassandra**
```python 
# Execute no console na pasta do projeto
node index.js
```