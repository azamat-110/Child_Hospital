import oracledb from 'oracledb';


async function connectDatabase() {
    try {
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        const connection = await oracledb.getConnection({
            user: 'C##DIS_CHILD_HOSPITAL',
            password: 'dch1234',
            connectionString: process.env.DATABASE_CONNECTION_STRING || 'localhost:1521/ORCLCDB',
        });
        console.log('Connected to database!');

        return connection;
    } catch (error) {
        console.log(error);
    }
}

async function executeQuery(query, params = {}) {
    const con = await connectDatabase();
    try {
        return await con.execute(query, params, {autoCommit: true});
    } catch (err) {
        console.log(err);
    }
}

export {connectDatabase, executeQuery};