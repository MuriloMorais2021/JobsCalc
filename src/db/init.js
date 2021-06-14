const Database = require('./config');

const initDb = {
    //o async é para o JS entendder que vai ter que esperar cada comando, se faz necessario por causa do await
    async init() {
        // Abrindo a conexaão
        // await é para continuar somente depois que tiver pronto
        // assim que tiver finalizado ele é atribuido a constante db
        const db = await Database()

        await db.exec(`
            CREATE TABLE profile(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                value_hour DOUBLE
                )
        `);
        await db.exec(`
            CREATE TABLE jobs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            )
        `);

        await db.run(`
        INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        )VALUES(
            "Murilo Morais",
            "https://avatars.githubusercontent.com/u/79458664?v=4",
            3000,
            5,
            5,
            4, 
            70
        )
        `);

        await db.run(`
        INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        )VALUES(
            "Pizzaria do Guloso",
            2,
            40,
            1617514376018
        )
        `);


        //fechando a função
        await db.close();
    }
}

initDb.init();

