import { IDestinacaoDoLixo } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IDestinacaoDoLixo | undefined) => {
    const errors: any = {};
    if (answer?.campo_31 === null) {
        errors.campo_31 = "Campo Obrigatório"
    }
    if (answer?.campo_32 === null) {
        errors.campo_32 = "Campo Obrigatório"
    }
    if (answer?.campo_33 === null) {
        errors.campo_33 = "Campo Obrigatório"
    }
    if (answer?.campo_34 === null) {
        errors.campo_34 = "Campo Obrigatório"
    }
    if (answer?.campo_35 === null) {
        errors.campo_35 = "Campo Obrigatório"
    }
    if (answer?.campo_31 === 0
        && answer?.campo_32 === 0
        && answer?.campo_33 === 0
        && answer?.campo_34 === 0
        && answer?.campo_35 === 0) {
        errors.destinacaoDoLixo = "Destinação do lixo não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };