import db from "./SQLiteDatabase";
import { IEscola } from "../types/Escola";

const dropTBEscola = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("DROP TABLE tb_escola",
                [],
                (_, { rows }) => {
                    resolve(true);
                },
                (_, error) => {console.log(error);resolve(false); return false })
        });
    })
}

const createTBEscola = () => {
    return new Promise((resolve, reject) => {

        db.transaction(tx => {
            tx.executeSql("CREATE TABLE tb_escola (inep VARCHAR(8) PRIMARY KEY, nome VARCHAR(400), cod_gre BIGINT)",
                [],
                (_, { rows }) => {
                    resolve(true);
                },
                (_, error) => { console.log(error); resolve(false); return false })
        });
    });
}

interface IInsert {
    inep: string,
    cod_gre: number,
    nome: string,
}

const insertEscola = (obj: IInsert) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO tb_escola (inep, nome, cod_gre) values (?, ?, ?);",
                [obj.inep, obj.nome, obj.cod_gre],
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
                    if(rows)
                        resolve(true);
                    else resolve(false);
                },
                (_, error) => { resolve(false); return false; }
            );
        });
    });
};

const getByCodGre = (cod_gre: number) => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT * FROM tb_escola WHERE cod_gre = ?;",
                [cod_gre],
                //-----------------------
                (_, { rows }) => {
                    const data = [];
                        for (let index = 0; index < rows.length; index++) {
                            data.push(rows.item(index).inep);
                        }
                        resolve(data);
                },
                (_, error) => { resolve(false); return false; }
            );
        });
    });
}

const deleteByCodGre = (cod_gre: number) => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "DELETE FROM tb_escola WHERE cod_gre = ?;",
                [cod_gre],
                //-----------------------
                (_, { rowsAffected }) => {
                    if(rowsAffected > 0)
                        resolve(true);
                    else resolve(false);
                },
                (_, error) => { console.log(error); resolve(false); return false; }
            );
        });
    });
}

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
            tx.executeSql("SELECT e.nome, e.cod_gre, e.inep, efs.status, efs.sync FROM tb_escola as e INNER JOIN tb_estrutura_escolar as efs ON e.inep = efs.campo_2 LIMIT ? OFFSET ?;",
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
            tx.executeSql("SELECT e.nome, e.inep, e.cod_gre, efs.status, efs.sync FROM tb_escola as e INNER JOIN tb_estrutura_escolar as efs ON e.inep = efs.campo_2 WHERE e.inep = ?;",
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


export default { createTBEscola, existsEscola, dropTBEscola, insertEscola, getEscolaByInep, getEscolaByNome, getNumberOfPages, getWithPagination, getNumberOfPagesWithNome, getNumberOfPagesWithInep, getAll, getByInep, getNomeByInep, deleteByCodGre, getByCodGre };