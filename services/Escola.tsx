import db from "./SQLiteDatabase";
import { IEscola } from "../types/Escola";

const dropTBEscola = () => {
    db.transaction(tx => {
        tx.executeSql("DROP TABLE tb_escola",
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
            tx.executeSql("CREATE TABLE tb_escola (inep VARCHAR(8) PRIMARY KEY, id INTEGER NOT NULL, nome VARCHAR(400))",
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
}

const insertEscola = (obj: IInsert) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO tb_escola (inep, id, nome) values (?, ?, ?);",
                [obj.inep, obj.id, obj.nome],
                //-----------------------
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) { resolve(true); }
                    else resolve(false); // insert falhou
                },
                (_, error) => { resolve(false); return false } // erro interno em tx.executeSql
            );
        });
    })

}

const existsEscola = () => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT 1 FROM tb_escola;",
                [],
                //-----------------------
                (_, { rows }) => {
                    resolve(true);
                },
                (_, error) => { resolve(false); return false; }
            );
        });
    });
};


const getEscolaByInep = (inep: string) => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM tb_escola WHERE inep LIKE ? || '%' LIMIT 10;",
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
            tx.executeSql("SELECT * FROM tb_escola WHERE REPLACE(nome, '  ', ' ') LIKE ? || '%' LIMIT 10;",
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
            tx.executeSql("SELECT e.id, e.nome, e.inep, efs.status, efs.sync FROM tb_escola as e INNER JOIN tb_estrutura_escolar as efs ON e.inep = efs.campo_2 LIMIT ? OFFSET ?;",
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

const getByInep = (inep: string) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT e.id, e.nome, e.inep, efs.status, efs.sync FROM tb_escola as e INNER JOIN tb_estrutura_escolar as efs ON e.inep = efs.campo_2 WHERE e.inep = ?;",
                [inep],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const array = [];
                        for (let index = 0; index < rows.length; index++) {
                            array.push(rows.item(index));
                        }
                        resolve(array);
                    } else {
                        resolve(false)
                    }
                },
                (_, error) => { console.log(error); resolve(false); return false; });
        });
    });
}

const getNomeByInep = (inep: string) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM tb_escola WHERE inep = ?;",
                [inep],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        resolve(rows.item(0).nome);
                    } else {
                        resolve(false)
                    }
                },
                (_, error) => { console.log(error); resolve(false); return false; });
        });
    });
}

const getAll = (limit: number) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM tb_escola LIMIT ?;",
                [limit],
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

const getNumberOfPages = (limit: number) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) AS total_registros FROM tb_escola as e INNER JOIN tb_estrutura_escolar as efs ON e.inep = efs.campo_2;",
                [], (tx, results) => {
                    const totalRegistros = results.rows.item(0).total_registros;
                    const paginas = Math.ceil(totalRegistros / limit);
                    resolve(paginas);
                });
        });
    });
}

const getNumberOfPagesWithNome = (nome: string, limit: number) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) AS total_registros FROM tb_escola as e INNER JOIN tb_estrutura_escolar as efs ON e.inep = efs.campo_2 WHERE REPLACE(e.nome, '  ', ' ') LIKE ? || '%';",
                [nome],
                (tx, results) => {
                    const totalRegistros = results.rows.item(0).total_registros;
                    const paginas = Math.ceil(totalRegistros / limit);
                    resolve(paginas);
                });
        });
    });
}

const getNumberOfPagesWithInep = (inep: string, limit: number) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) AS total_registros FROM tb_escola as e INNER JOIN tb_estrutura_escolar as efs ON e.inep = efs.campo_2 WHERE e.inep LIKE ? || '%';",
                [inep],
                (tx, results) => {
                    const totalRegistros = results.rows.item(0).total_registros;
                    const paginas = Math.ceil(totalRegistros / limit);
                    resolve(paginas);
                });
        });
    });
}


export default { createTBEscola, existsEscola, dropTBEscola, insertEscola, getEscolaByInep, getEscolaByNome, getNumberOfPages, getWithPagination, getNumberOfPagesWithNome, getNumberOfPagesWithInep, getAll, getByInep, getNomeByInep };