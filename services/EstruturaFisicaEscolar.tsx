import db from "./SQLiteDatabase";
import { IAllValues } from '../types/EstruturaFisicaEscolar';

const dropTBEstruturaFisicaEscolar = () => {
    db.transaction((tx) => {
        tx.executeSql("DROP TABLE tb_estrutura_escolar",
            [],
            (_, { rows }) => {
                console.log("Excluido com sucesso");
            }, (_, error) => { console.log(error); return false; }
        );
    });

}

const createTBEstruturaFisicaEscolar = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE tb_estrutura_escolar (id INTEGER PRIMARY KEY AUTOINCREMENT, campo_3 INTEGER, campo_4 INTEGER, campo_5 INTEGER, campo_6 INTEGER, campo_7 INTEGER, campo_8 INTEGER, campo_9 INTEGER, campo_10 INTEGER, campo_11 VARCHAR(8), campo_12 VARCHAR(8), campo_13 VARCHAR(8), campo_14 VARCHAR(8), campo_15 VARCHAR(8), campo_16 VARCHAR(8), campo_17 INTEGER, campo_18 INTEGER, campo_19 INTEGER, campo_20 INTEGER, campo_21 INTEGER, campo_22 INTEGER, campo_23 INTEGER, campo_24 INTEGER, campo_25 INTEGER, campo_26 INTEGER, campo_27 INTEGER, campo_28 INTEGER, campo_29 INTEGER, campo_30 INTEGER, campo_31 INTEGER, campo_32 INTEGER, campo_33 INTEGER, campo_34 INTEGER, campo_35 INTEGER, campo_36 INTEGER, campo_37 INTEGER, campo_38 INTEGER, campo_39 INTEGER, campo_40 INTEGER, campo_41 INTEGER, campo_42 INTEGER, campo_43 INTEGER, campo_44 INTEGER, campo_45 INTEGER, campo_46 INTEGER, campo_47 INTEGER, campo_48 INTEGER, campo_49 INTEGER, campo_50 INTEGER, campo_51 INTEGER, campo_52 INTEGER, campo_53 INTEGER, campo_54 INTEGER, campo_55 INTEGER, campo_56 INTEGER, campo_57 INTEGER, campo_58 INTEGER, campo_59 INTEGER, campo_60 INTEGER, campo_61 INTEGER, campo_62 INTEGER, campo_63 INTEGER, campo_64 INTEGER, campo_65 INTEGER, campo_66 INTEGER, campo_67 INTEGER, campo_68 INTEGER, campo_69 INTEGER, campo_70 INTEGER, campo_71 INTEGER, campo_72 INTEGER, campo_73 INTEGER, campo_74 INTEGER, campo_75 INTEGER, campo_76 INTEGER, campo_77 INTEGER, campo_78 INTEGER, campo_79 INTEGER, campo_80 INTEGE, campo_81 INTEGE, campo_82 INTEGE, campo_83 INTEGE, campo_84 INTEGE, campo_85 INTEGE, campo_86 INTEGE, campo_87 VARCHAR(4), campo_88 VARCHAR(4), campo_89 VARCHAR(4), campo_90 VARCHAR(4), campo_91 INTEGER, campo_92 INTEGER, campo_93 INTEGER, campo_94 INTEGER, campo_95 INTEGER, campo_96 INTEGER, campo_97 INTEGER, campo_98 VARCHAR(4), campo_99 VARCHAR(4), campo_100 VARCHAR(4), campo_101 VARCHAR(4), campo_102 VARCHAR(4), campo_103 VARCHAR(4), campo_104 VARCHAR(4), campo_105 VARCHAR(4), campo_106 INTEGER, campo_107 INTEGER, campo_108 INTEGER, campo_109 INTEGER, campo_110 INTEGER, campo_111 INTEGER, campo_112 INTEGER, campo_113 INTEGER, campo_114 INTEGER, campo_115 INTEGER, campo_116 INTEGER, campo_117 VARCHAR(4), campo_118 VARCHAR(4), campo_119 VARCHAR(4), campo_120 VARCHAR(4), campo_121 VARCHAR(4), campo_122 VARCHAR(4), campo_123 VARCHAR(4), campo_124 VARCHAR(4), campo_125 VARCHAR(4), campo_126 VARCHAR(4), campo_127 VARCHAR(4), campo_128 VARCHAR(4), campo_129 VARCHAR(4), campo_130 VARCHAR(4), campo_131 VARCHAR(4), campo_132 VARCHAR(4), campo_133 INTEGER, campo_134 INTEGER, campo_135 INTEGER, campo_136 INTEGER, campo_137 INTEGER, campo_138 INTEGER, campo_139 INTEGER, campo_140 INTEGER, campo_141 INTEGER, campo_142 INTEGER, campo_143 INTEGER, campo_144 INTEGER, campo_145 INTEGER, campo_146 INTEGER, campo_147 INTEGER, campo_148 INTEGER, campo_149 INTEGER, campo_150 INTEGER, campo_151 VARCHAR(5), campo_152 VARCHAR(5),campo_153 VARCHAR(5), campo_154 INTEGER, campo_155 INTEGER, campo_156 INTEGER, campo_157 INTEGER, campo_158 INTEGER, campo_159 INTEGER, campo_160 INTEGER, campo_161 INTEGER, campo_162 INTEGER, campo_163 INTEGER, campo_164 INTEGER, campo_165 INTEGER, campo_166 INTEGER, campo_167 INTEGER, campo_168 INTEGER, campo_169 INTEGER, campo_170 INTEGER, inep_fk VARCHAR(8), FOREIGN KEY(inep_fk) REFERENCES escola(inep))",
                [],
                (_, { rows }) => {
                    console.log("Criado com sucesso!");
                    resolve(true);
                },
                (_, error) => {
                    console.log(error);
                    resolve(false);
                    return false;
                }
            );
        })
    });
}

const insertEstruturaFisicaEscolar = (value: IAllValues) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO tb_estrutura_escolar (campo_3, campo_4, campo_5, campo_6, campo_7, campo_8, campo_9, campo_10, campo_11, campo_12, campo_13, campo_14, campo_15, campo_16, campo_17, campo_18, campo_19, campo_20, campo_21, campo_22, campo_23, campo_24, campo_25, campo_26, campo_27, campo_28, campo_29, campo_30, campo_31, campo_32, campo_33, campo_34, campo_35, campo_36, campo_37, campo_38, campo_39, campo_40, campo_41, campo_42, campo_43, campo_44, campo_45, campo_46, campo_47, campo_48, campo_49, campo_50, campo_51, campo_52, campo_53, campo_54, campo_55, campo_56, campo_57, campo_58, campo_59, campo_60, campo_61, campo_62, campo_63, campo_64, campo_65, campo_66, campo_67, campo_68, campo_69, campo_70, campo_71, campo_72, campo_73, campo_74, campo_75, campo_76, campo_77, campo_78, campo_79, campo_80, campo_81, campo_82, campo_83, campo_84, campo_85, campo_86, campo_87, campo_88, campo_89, campo_90, campo_91, campo_92, campo_93, campo_94, campo_95, campo_96, campo_97, campo_98, campo_99, campo_100, campo_101, campo_102, campo_103, campo_104, campo_105, campo_106, campo_107, campo_108, campo_109, campo_110, campo_111, campo_112, campo_113, campo_114, campo_115, campo_116, campo_117, campo_118, campo_119, campo_120, campo_121, campo_122, campo_123, campo_124, campo_125, campo_126, campo_127, campo_128, campo_129, campo_130, campo_131, campo_132, campo_133, campo_134, campo_135, campo_136, campo_137, campo_138, campo_139, campo_140, campo_141, campo_142, campo_143, campo_144, campo_145, campo_146, campo_147, campo_148, campo_149, campo_150, campo_151, campo_152, campo_153, campo_154, campo_155, campo_156, campo_157, campo_158, campo_159, campo_160, campo_161, campo_162, campo_163, campo_164, campo_165, campo_166, campo_167, campo_168, campo_169, campo_170, inep_fk ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [value.campo_3, value.campo_4, value.campo_5, value.campo_6, value.campo_7, value.campo_8, value.campo_9, value.campo_10, value.campo_11 === '' ? null : value.campo_11, value.campo_12 === '' ? null : value.campo_12, value.campo_13 === '' ? null : value.campo_13, value.campo_14 === '' ? null : value.campo_14, value.campo_15 === '' ? null : value.campo_15, value.campo_16 === '' ? null : value.campo_16, value.campo_17, value.campo_18, value.campo_19, value.campo_20, value.campo_21, value.campo_22, value.campo_23, value.campo_24, value.campo_25, value.campo_26, value.campo_27, value.campo_28, value.campo_29, value.campo_30, value.campo_31, value.campo_32, value.campo_33, value.campo_34, value.campo_35, value.campo_36, value.campo_37, value.campo_38, value.campo_39, value.campo_40, value.campo_41, value.campo_42, value.campo_43, value.campo_44, value.campo_45, value.campo_46, value.campo_47, value.campo_48, value.campo_49, value.campo_50, value.campo_51, value.campo_52, value.campo_53, value.campo_54, value.campo_55, value.campo_56, value.campo_57, value.campo_58, value.campo_59, value.campo_60, value.campo_61, value.campo_62, value.campo_63, value.campo_64, value.campo_65, value.campo_66, value.campo_67, value.campo_68, value.campo_69, value.campo_70, value.campo_71, value.campo_72, value.campo_73, value.campo_74, value.campo_75, value.campo_76, value.campo_77, value.campo_78, value.campo_79, value.campo_80, value.campo_81, value.campo_82, value.campo_83, value.campo_84, value.campo_85, value.campo_86, value.campo_87 === '' ? null : value.campo_87, value.campo_88 === '' ? null : value.campo_88, value.campo_89 === '' ? null : value.campo_89, value.campo_90 === '' ? null : value.campo_90, value.campo_91, value.campo_92, value.campo_93, value.campo_94, value.campo_95, value.campo_96, value.campo_97, value.campo_98 === '' ? null : value.campo_98, value.campo_99 === '' ? null : value.campo_99, value.campo_100 === '' ? null : value.campo_100, value.campo_101 === '' ? null : value.campo_101, value.campo_102 === '' ? null : value.campo_102, value.campo_103 === '' ? null : value.campo_103, value.campo_104 === '' ? null : value.campo_104, value.campo_105 === '' ? null : value.campo_105, value.campo_106, value.campo_107, value.campo_108, value.campo_109, value.campo_110, value.campo_111, value.campo_112, value.campo_113, value.campo_114, value.campo_115, value.campo_116, value.campo_117 === '' ? null : value.campo_117, value.campo_118 === '' ? null : value.campo_118, value.campo_119 === '' ? null : value.campo_119, value.campo_120 === '' ? null : value.campo_120, value.campo_121 === '' ? null : value.campo_121, value.campo_122 === '' ? null : value.campo_122, value.campo_123 === '' ? null : value.campo_123, value.campo_124 === '' ? null : value.campo_124, value.campo_125 === '' ? null : value.campo_125, value.campo_126 === '' ? null : value.campo_126, value.campo_127 === '' ? null : value.campo_127, value.campo_128 === '' ? null : value.campo_128, value.campo_129 === '' ? null : value.campo_129, value.campo_130 === '' ? null : value.campo_130, value.campo_131 === '' ? null : value.campo_131, value.campo_132 === '' ? null : value.campo_132, value.campo_133, value.campo_134, value.campo_135, value.campo_136, value.campo_137, value.campo_138, value.campo_139, value.campo_140, value.campo_141, value.campo_142, value.campo_143, value.campo_144, value.campo_145, value.campo_146, value.campo_147, value.campo_148, value.campo_149, value.campo_150, value.campo_151 === '' ? null : value.campo_151, value.campo_152 === '' ? null : value.campo_152, value.campo_153 === '' ? null : value.campo_153, value.campo_154, value.campo_155, value.campo_156, value.campo_157, value.campo_158, value.campo_159, value.campo_160, value.campo_161, value.campo_162, value.campo_163, value.campo_164, value.campo_165, value.campo_166, value.campo_167, value.campo_168, value.campo_169, value.campo_170, value.inep_fk || ''],
                (tx, results) => {
                    if (results.rowsAffected > 0)
                        resolve(true);
                    else resolve(false);
                },
                (error) => {
                    console.log(error);
                    resolve(false);
                    return false;
                }
            );
        });
    });
}

const updateEstruturaFisicaEscolar = (value: IAllValues, inep: string) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("UPDATE tb_estrutura_escolar SET campo_3 = ?, campo_4 = ?, campo_5 = ?, campo_6 = ?, campo_7 = ?, campo_8 = ?, campo_9 = ?, campo_10 = ?, campo_11 = ?, campo_12 = ?, campo_13 = ?, campo_14 = ?, campo_15 = ?, campo_16 = ?, campo_17 = ?, campo_18 = ?, campo_19 = ?, campo_20 = ?, campo_21 = ?, campo_22 = ?, campo_23 = ?, campo_24 = ?, campo_25 = ?, campo_26 = ?, campo_27 = ?, campo_28 = ?, campo_29 = ?, campo_30 = ?, campo_31 = ?, campo_32 = ?, campo_33 = ?, campo_34 = ?, campo_35 = ?, campo_36 = ?, campo_37 = ?, campo_38 = ?, campo_39 = ?, campo_40 = ?, campo_41 = ?, campo_42 = ?, campo_43 = ?, campo_44 = ?, campo_45 = ?, campo_46 = ?, campo_47 = ?, campo_48 = ?, campo_49 = ?, campo_50 = ?, campo_51 = ?, campo_52 = ?, campo_53 = ?, campo_54 = ?, campo_55 = ?, campo_56 = ?, campo_57 = ?, campo_58 = ?, campo_59 = ?, campo_60 = ?, campo_61 = ?, campo_62 = ?, campo_63 = ?, campo_64 = ?, campo_65 = ?, campo_66 = ?, campo_67 = ?, campo_68 = ?, campo_69 = ?, campo_70 = ?, campo_71 = ?, campo_72 = ?, campo_73 = ?, campo_74 = ?, campo_75 = ?, campo_76 = ?, campo_77 = ?, campo_78 = ?, campo_79 = ?, campo_80 = ?, campo_81 = ?, campo_82 = ?, campo_83 = ?, campo_84 = ?, campo_85 = ?, campo_86 = ?, campo_87 = ?, campo_88 = ?, campo_89 = ?, campo_90 = ?, campo_91 = ?, campo_92 = ?, campo_93 = ?, campo_94 = ?, campo_95 = ?, campo_96 = ?, campo_97 = ?, campo_98 = ?, campo_99 = ?, campo_100 = ?, campo_101 = ?, campo_102 = ?, campo_103 = ?, campo_104 = ?, campo_105 = ?, campo_106 = ?, campo_107 = ?, campo_108 = ?, campo_109 = ?, campo_110 = ?, campo_111 = ?, campo_112 = ?, campo_113 = ?, campo_114 = ?, campo_115 = ?, campo_116 = ?, campo_117 = ?, campo_118 = ?, campo_119 = ?, campo_120 = ?, campo_121 = ?, campo_122 = ?, campo_123 = ?, campo_124 = ?, campo_125 = ?, campo_126 = ?, campo_127 = ?, campo_128 = ?, campo_129 = ?, campo_130 = ?, campo_131 = ?, campo_132 = ?, campo_133 = ?, campo_134 = ?, campo_135 = ?, campo_136 = ?, campo_137 = ?, campo_138 = ?, campo_139 = ?, campo_140 = ?, campo_141 = ?, campo_142 = ?, campo_143 = ?, campo_144 = ?, campo_145 = ?, campo_146 = ?, campo_147 = ?, campo_148 = ?, campo_149 = ?, campo_150 = ?, campo_151 = ?, campo_152 = ?, campo_153 = ?, campo_154 = ?, campo_155 = ?, campo_156 = ?, campo_157 = ?, campo_158 = ?, campo_159 = ?, campo_160 = ?, campo_161 = ?, campo_162 = ?, campo_163 = ?, campo_164 = ?, campo_165 = ?, campo_166 = ?, campo_167 = ?, campo_168 = ?, campo_169 = ?, campo_170 = ?" +
                +" WHERE inep_fk = ?"
                , [value.campo_3, value.campo_4, value.campo_5, value.campo_6, value.campo_7, value.campo_8, value.campo_9, value.campo_10, value.campo_11 === '' ? null : value.campo_11, value.campo_12 === '' ? null : value.campo_12, value.campo_13 === '' ? null : value.campo_13, value.campo_14 === '' ? null : value.campo_14, value.campo_15 === '' ? null : value.campo_15, value.campo_16 === '' ? null : value.campo_16, value.campo_17, value.campo_18, value.campo_19, value.campo_20, value.campo_21, value.campo_22, value.campo_23, value.campo_24, value.campo_25, value.campo_26, value.campo_27, value.campo_28, value.campo_29, value.campo_30, value.campo_31, value.campo_32, value.campo_33, value.campo_34, value.campo_35, value.campo_36, value.campo_37, value.campo_38, value.campo_39, value.campo_40, value.campo_41, value.campo_42, value.campo_43, value.campo_44, value.campo_45, value.campo_46, value.campo_47, value.campo_48, value.campo_49, value.campo_50, value.campo_51, value.campo_52, value.campo_53, value.campo_54, value.campo_55, value.campo_56, value.campo_57, value.campo_58, value.campo_59, value.campo_60, value.campo_61, value.campo_62, value.campo_63, value.campo_64, value.campo_65, value.campo_66, value.campo_67, value.campo_68, value.campo_69, value.campo_70, value.campo_71, value.campo_72, value.campo_73, value.campo_74, value.campo_75, value.campo_76, value.campo_77, value.campo_78, value.campo_79, value.campo_80, value.campo_81, value.campo_82, value.campo_83, value.campo_84, value.campo_85, value.campo_86, value.campo_87 === '' ? null : value.campo_87, value.campo_88 === '' ? null : value.campo_88, value.campo_89 === '' ? null : value.campo_89, value.campo_90 === '' ? null : value.campo_90, value.campo_91, value.campo_92, value.campo_93, value.campo_94, value.campo_95, value.campo_96, value.campo_97, value.campo_98 === '' ? null : value.campo_98, value.campo_99 === '' ? null : value.campo_99, value.campo_100 === '' ? null : value.campo_100, value.campo_101 === '' ? null : value.campo_101, value.campo_102 === '' ? null : value.campo_102, value.campo_103 === '' ? null : value.campo_103, value.campo_104 === '' ? null : value.campo_104, value.campo_105 === '' ? null : value.campo_105, value.campo_106, value.campo_107, value.campo_108, value.campo_109, value.campo_110, value.campo_111, value.campo_112, value.campo_113, value.campo_114, value.campo_115, value.campo_116, value.campo_117 === '' ? null : value.campo_117, value.campo_118 === '' ? null : value.campo_118, value.campo_119 === '' ? null : value.campo_119, value.campo_120 === '' ? null : value.campo_120, value.campo_121 === '' ? null : value.campo_121, value.campo_122 === '' ? null : value.campo_122, value.campo_123 === '' ? null : value.campo_123, value.campo_124 === '' ? null : value.campo_124, value.campo_125 === '' ? null : value.campo_125, value.campo_126 === '' ? null : value.campo_126, value.campo_127 === '' ? null : value.campo_127, value.campo_128 === '' ? null : value.campo_128, value.campo_129 === '' ? null : value.campo_129, value.campo_130 === '' ? null : value.campo_130, value.campo_131 === '' ? null : value.campo_131, value.campo_132 === '' ? null : value.campo_132, value.campo_133, value.campo_134, value.campo_135, value.campo_136, value.campo_137, value.campo_138, value.campo_139, value.campo_140, value.campo_141, value.campo_142, value.campo_143, value.campo_144, value.campo_145, value.campo_146, value.campo_147, value.campo_148, value.campo_149, value.campo_150, value.campo_151 === '' ? null : value.campo_151, value.campo_152 === '' ? null : value.campo_152, value.campo_153 === '' ? null : value.campo_153, value.campo_154, value.campo_155, value.campo_156, value.campo_157, value.campo_158, value.campo_159, value.campo_160, value.campo_161, value.campo_162, value.campo_163, value.campo_164, value.campo_165, value.campo_166, value.campo_167, value.campo_168, value.campo_169, value.campo_170, inep],
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0)
                        console.log("Atualizado com sucesso")
                    else console.log("Erro ao atualizar");
                },
                (_, error) => {
                    console.log(error);
                    return false;
                }
            );
        });
    });
}

const existsEstruturaFisicaEscolar = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM tb_estrutura_escolar;",
                [],
                (_, { rows }) => {
                    resolve(true);
                },
                (_, error) => {
                    resolve(false);
                    return false;
                }
            )
        });
    });
}



const getEstruturaFisicaEscolarByInep = (inep: string) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM tb_estrutura_escolar WHERE inep_fk = ?",
                [inep],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        resolve(rows.item(0));
                    } else {
                        resolve(false);
                    }
                },
                (_, error) => {
                    console.log(error);
                    resolve(false);
                    return false;
                }
            );
        });
    });
}

export default { dropTBEstruturaFisicaEscolar, createTBEstruturaFisicaEscolar, insertEstruturaFisicaEscolar, updateEstruturaFisicaEscolar, getEstruturaFisicaEscolarByInep, existsEstruturaFisicaEscolar };