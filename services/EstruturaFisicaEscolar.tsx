import db from "./SQLiteDatabase";

const dropTBEstruturaFisicaEscolar = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("DROP TABLE estruturaFisicaEscolar",
                [],
                (_, { rows }) => {
                    resolve("Excluído com sucesso");
                }, (_, error) => { resolve(error); return false; }
            );
        });
    })
}

const createTBEstruturaFisicaEscolar = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE estruturaFisicaEscolar" +
                "(id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                + "campo_3 INTEGER" +
                + "campo_4 INTEGER" +
                + "campo_5 INTEGER" +
                + "campo_6 INTEGER" +
                + "campo_7 INTEGER" +
                + "campo_8 INTEGER" +
                + "campo_9 INTEGER" +
                + "campo_10 INTEGER" +
                + "campo_11 VARCHAR(8)" +
                + "campo_12 VARCHAR(8)" +
                + "campo_13 VARCHAR(8)" +
                + "campo_14 VARCHAR(8)" +
                + "campo_15 VARCHAR(8)" +
                + "campo_16 VARCHAR(8)" +
                + "campo_17 INTEGER" +
                + "campo_18 INTEGER" +
                + "campo_19 INTEGER" +
                + "campo_19 INTEGER" +
                + "campo_20 INTEGER" +
                + "campo_21 INTEGER" +
                + "campo_22 INTEGER" +
                + "campo_23 INTEGER" +
                + "campo_24 INTEGER" +
                + "campo_25 INTEGER" +
                + "campo_26 INTEGER" +
                + "campo_27 INTEGER" +
                + "campo_28 INTEGER" +
                + "campo_29 INTEGER" +
                + "campo_30 INTEGER" +
                + "campo_31 INTEGER" +
                + "campo_32 INTEGER" +
                + "campo_33 INTEGER" +
                + "campo_34 INTEGER" +
                + "campo_35 INTEGER" +
                + "campo_36 INTEGER" +
                + "campo_37 INTEGER" +
                + "campo_38 INTEGER" +
                + "campo_39 INTEGER" +
                ")")
        })
    });
}