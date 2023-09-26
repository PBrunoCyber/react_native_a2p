import { IAbastecimentoDeAgua } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IAbastecimentoDeAgua | undefined) => {
    const errors: any = {};
    if (answer?.campo_22 === null) {
        errors.campo_22 = "Campo Obrigatório"
    }
    if (answer?.campo_17 === null) {
        errors.campo_17 = "Campo Obrigatório"
    }
    if (answer?.campo_18 === 0
        && answer?.campo_19 === 0
        && answer?.campo_20 === 0
        && answer?.campo_21 === 0
        && answer?.campo_22 === 0) {
        errors.abastecimentoDeAgua = "\"Abastecimento de água\" não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_22 === 0 && answer?.campo_18 === null) {
        errors.campo_18 = "Campo obrigatório";
    }
    if (answer?.campo_22 === 0 && answer?.campo_19 === null) {
        errors.campo_19 = "Campo obrigatório";
    }
    if (answer?.campo_22 === 0 && answer?.campo_20 === null) {
        errors.campo_20 = "Campo obrigatório";
    }
    if (answer?.campo_22 === 0 && answer?.campo_21 === null) {
        errors.campo_21 = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };