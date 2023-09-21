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
    return new Promise((resolve, reject) => {

        db.transaction(tx => {
            tx.executeSql("CREATE TABLE escola (inep VARCHAR(8) PRIMARY KEY, id INTEGER NOT NULL, nome VARCHAR(400), tipo VARCHAR(20))",
                [],
                (_, { rows }) => {
                    console.log("CRIADO COM SUCESSO!");
                },
                (_, error) => { console.log(error); return false })
        });
    });
}

interface IInsert {
    inep: string,
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

const existsEscola = () => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT 1 FROM escola;",
                [],
                //-----------------------
                (_, { rows }) => {
                    if (rows.length > 0) resolve(true)
                    else resolve(false); // nenhum registro encontrado
                },
                (_, error) => { resolve(false); return false; }
            );
        });
    });
};


const getEscolaByInep = (inep: string) => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM escola WHERE inep LIKE ? || '%' LIMIT 10;",
                [inep],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const data = [];
                        for (let index = 0; index < rows.length; index++) {
                            data.push(rows.item(index));
                        }
                        resolve(data);
                    }
                    resolve(false)
                },
                (_, error) => { resolve(error); return false; }
            )
        });
    });
}

const getEscolaByNome = (nome: string) => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM escola WHERE REPLACE(nome, '  ', ' ') LIKE ? || '%' LIMIT 10;",
                [nome],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const data = [];
                        for (let index = 0; index < rows.length; index++) {
                            data.push(rows.item(index));
                        }
                        resolve(data);
                    }
                    resolve(false)
                },
                (_, error) => { resolve(error); return false; }
            )
        });
    });
}

const getWithPagination = (limit: number, offset: number) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM escola LIMIT ? OFFSET ?;",
                [limit, offset],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const data = [];
                        for (let index = 0; index < rows.length; index++) {
                            data.push(rows.item(index));
                        }
                        resolve(data);
                    }
                    resolve(false)
                },
                (_, error) => { resolve(false); return false; });
        });
    });
}

const getNumberOfPages = (qntd: number) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT COUNT(*) AS total_registros FROM escola;', [], (tx, results) => {
                const totalRegistros = results.rows.item(0).total_registros;
                const paginas = Math.ceil(totalRegistros / qntd);
                resolve(paginas);
            });
        });
    });
}


export default { createTBEscola, existsEscola, dropTBEscola, insertEscola, getEscolaByInep, getEscolaByNome, getNumberOfPages, getWithPagination };