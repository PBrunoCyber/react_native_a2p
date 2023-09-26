import { IEsgotamentoSanitario } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IEsgotamentoSanitario | undefined) => {
    const errors: any = {};
    if (answer?.campo_30 === null) {
        errors.campo_30 = "Campo Obrigatório"
    }
    if (answer?.campo_27 === 0
        && answer?.campo_28 === 0
        && answer?.campo_29 === 0
        && answer?.campo_30 === 0) {
        errors.esgotamentoSanitario = "\"Esgotamento Sanitário\" não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_30 === 0 && answer?.campo_27 === null) {
        errors.campo_27 = "Campo obrigatório";
    }
    if (answer?.campo_30 === 0 && answer?.campo_28 === null) {
        errors.campo_28 = "Campo obrigatório";
    }
    if (answer?.campo_30 === 0 && answer?.campo_29 === null) {
        errors.campo_29 = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };