# CASSANDRA
# Inicia os contêineres definidos em modo detached.
docker-cassandra-up:
	docker-compose -f docker-compose-cassandra.yaml up -d
	
# Constrói e inicia os contêineres definidos em modo detached.	
docker-cassandra-build:
	docker-compose -f docker-compose-cassandra.yaml up --build -d

# Exibe os logs dos contêineres definidos com um limite de 100 linhas.
docker-cassandra-logs:
	docker-compose -f docker-compose-cassandra.yaml logs -f --tail=100

# Executa os targets `docker-cassandra-build` e `docker-cassandra-logs` sequencialmente.
docker-cassandra-build-logs: docker-cassandra-build docker-cassandra-logs

# Para a execução dos contêineres definidos.
docker-cassandra-stop:
	docker-compose -f docker-compose-cassandra.yaml stop

# Para e remove os contêineres, redes e volumes definidos.
docker-cassandra-down:
	docker-compose -f docker-compose-cassandra.yaml down
