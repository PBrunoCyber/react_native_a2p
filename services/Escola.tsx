import db from "./SQLiteDatabase";


const dropTBEscola = () => {
    db.transaction(tx => {
        tx.executeSql("DROP TABLE escola",
            [],
            (_, { rows }) => {
                console.log("Excluído com sucesso!");
            },
            (_, error) => { console.log(error); return false })
    });
}

const createTBEscola = () => {

    db.transaction(tx => {
        tx.executeSql("CREATE TABLE escola ( inep INTEGER PRIMARY KEY, id INTEGER NOT NULL, nome VARCHAR(400), tipo VARCHAR(20))",
            [],
            (_, { rows }) => {
                console.log("CRIADO COM SUCESSO!");
            },
            (_, error) => { console.log(error); return false })
    });

}

interface IInsert {
    inep: number | string,
    id: number,
    nome: string,
    tipo: string
}

const insertEscola = (obj: IInsert) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO escola (inep, id, nome, tipo) values (?, ?, ?, ?);",
            [obj.inep, obj.id, obj.nome, obj.tipo],
            //-----------------------
            (_, { rowsAffected, insertId }) => {
                if (rowsAffected > 0) console.log("Cadastrado com sucesso!");
                else console.log("Erro ao inserir"); // insert falhou
            },
            (_, error) => { console.log(error); return false } // erro interno em tx.executeSql
        );
    });
}

const findEscola = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT 1 FROM escola;",
                [],
                //-----------------------
                (_, { rows }) => {
                    if (rows.length > 0) resolve(true)
                    else reject(false) // nenhum registro encontrado
                },
                (_, error) => { return false }
            );
        });
    });
};


export default { createTBEscola, findEscola, dropTBEscola, insertEscola };