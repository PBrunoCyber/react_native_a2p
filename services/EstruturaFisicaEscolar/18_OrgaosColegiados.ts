import { IOrgaosColegiados } from "../../types/EstruturaFisicaEscolar";


const validate = (answer: IOrgaosColegiados | undefined) => {
    const errors: any = {};

    if (answer?.campo_164 === 0 &&
        answer?.campo_165 === 0 &&
        answer?.campo_166 === 0 &&
        answer?.campo_167 === 0 &&
        answer?.campo_168 === 0 &&
        answer?.campo_169 === 0) {
        errors.orgaosColegiados = "\"Órgãos colegiados em funcionamento na escola\" não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não).";
    }
    if (answer?.campo_169 === 0 && answer?.campo_164 === null) {
        errors.campo_164 = "Campo obrigatório";
    }
    if (answer?.campo_169 === 0 && answer?.campo_165 === null) {
        errors.campo_165 = "Campo obrigatório";
    }
    if (answer?.campo_169 === 0 && answer?.campo_166 === null) {
        errors.campo_166 = "Campo obrigatório";
    }
    if (answer?.campo_169 === 0 && answer?.campo_167 === null) {
        errors.campo_167 = "Campo obrigatório";
    }
    if (answer?.campo_169 === 0 && answer?.campo_168 === null) {
        errors.campo_168 = "Campo obrigatório";
    }



    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };