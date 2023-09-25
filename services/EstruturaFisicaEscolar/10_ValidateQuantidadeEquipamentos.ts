import { IQuantidadeEquipamentos } from "../../types/EstruturaFisicaEscolar";

const verificaApenasZeros = (inputString: string) => {
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] !== '0') {
            return false;
        }
    }
    return true;
};

const validate = (answer: IQuantidadeEquipamentos | undefined) => {
    const errors: any = {};

    if (answer?.campo_98 && !/^\d+$/g.test(answer?.campo_98)) {
        errors.campo_98 = "Informe apenas números";
    }
    if (answer?.campo_98 && verificaApenasZeros(answer?.campo_98)) {
        errors.campo_98 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_98 && answer?.campo_98.length > 4) {
        errors.campo_98 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_99 && !/^\d+$/g.test(answer?.campo_99)) {
        errors.campo_99 = "Informe apenas números";
    }
    if (answer?.campo_99 && verificaApenasZeros(answer?.campo_99)) {
        errors.campo_99 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_99 && answer?.campo_99.length > 4) {
        errors.campo_99 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_100 && !/^\d+$/g.test(answer?.campo_100)) {
        errors.campo_100 = "Informe apenas números";
    }
    if (answer?.campo_100 && verificaApenasZeros(answer?.campo_100)) {
        errors.campo_100 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_100 && answer?.campo_100.length > 4) {
        errors.campo_100 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_101 && !/^\d+$/g.test(answer?.campo_101)) {
        errors.campo_101 = "Informe apenas números";
    }
    if (answer?.campo_101 && verificaApenasZeros(answer?.campo_101)) {
        errors.campo_101 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_101 && answer?.campo_101.length > 4) {
        errors.campo_101 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_102 && !/^\d+$/g.test(answer?.campo_102)) {
        errors.campo_102 = "Informe apenas números";
    }
    if (answer?.campo_102 && verificaApenasZeros(answer?.campo_102)) {
        errors.campo_102 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_102 && answer?.campo_102.length > 4) {
        errors.campo_102 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_103 && !/^\d+$/g.test(answer?.campo_103)) {
        errors.campo_103 = "Informe apenas números";
    }
    if (answer?.campo_103 && verificaApenasZeros(answer?.campo_103)) {
        errors.campo_103 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_103 && answer?.campo_103.length > 4) {
        errors.campo_103 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_104 && !/^\d+$/g.test(answer?.campo_104)) {
        errors.campo_104 = "Informe apenas números";
    }
    if (answer?.campo_104 && verificaApenasZeros(answer?.campo_104)) {
        errors.campo_104 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_104 && answer?.campo_104.length > 4) {
        errors.campo_104 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_105 && !/^\d+$/g.test(answer?.campo_105)) {
        errors.campo_105 = "Informe apenas números";
    }
    if (answer?.campo_105 && verificaApenasZeros(answer?.campo_105)) {
        errors.campo_105 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_105 && answer?.campo_105.length > 4) {
        errors.campo_105 = "O campo não pode ter mais que 4 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };