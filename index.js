import dotenv from "dotenv"
import {Client} from "cassandra-driver"

dotenv.config()

/* 
Configuração com banco de dados Cassandra local
OBS: Criar arquivo .env na raiz do projeto com as constantes de acesso e seus respectivos valores.
*/

const cassandraConfig = {
    credentials: {
        username: process.env.CASSANDRA_USER,
        password: process.env.CASSANDRA_PASSWORD
    },
    contactPoints: [process.env.CONTACT_POINT_01],
    localDataCenter: process.env.LOCAL_DATA_CENTER,
    keyspace: process.env.KEYSPACE
}

const clientCassandra = new Client(cassandraConfig)

clientCassandra.connect(function (error) {
    if (error) return console.error(error);
    console.log('Connected to cluster with %d host(s): %j', clientCassandra.hosts.length, clientCassandra.hosts.keys());
})

const consultaTeste = async () => {
    await clientCassandra.connect();
    const consultaCQL = 'SELECT * FROM system.local';
    // const consultaCQL = 'SELECT * FROM system_schema.keyspaces';
    // const consultaCQL = 'DESCRIBE mybusiness';
    // const consultaCQL = 'SELECT * mybusiness.company';

    const respostaConsulta = await clientCassandra.execute(consultaCQL);
    await clientCassandra.shutdown();
    return respostaConsulta;
};

const resultFinal = await consultaTeste();
console.log(resultFinal);


const consultaCompany = async () => {
    await clientCassandra.connect();
    // const consultaCQL = 'SELECT * FROM system.local';
    // const consultaCQL = 'SELECT * FROM system_schema.keyspaces';
    // const consultaCQL = 'DESCRIBE mybusiness';
    const consultaCQL = 'SELECT * mybusiness.company';

    const consultaCompany = await clientCassandra.execute(consultaCQL);
    await clientCassandra.shutdown();
    return consultaCompany;
};

const resultCompany = await consultaCompany();
console.log(resultCompany);