import { ITratamentoDoLixo } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: ITratamentoDoLixo | undefined) => {
    const errors: any = {};
    if (answer?.campo_39 === null) {
        errors.campo_39 = "Campo Obrigatório"
    }
    if (answer?.campo_36 === 0
        && answer?.campo_37 === 0
        && answer?.campo_38 === 0
        && answer?.campo_39 === 0) {
        errors.tratamentoDoLixo = "\"Tratamento do lixo/resíduos que a escola realiza\" não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_39 === 0 && answer?.campo_36 === null) {
        errors.campo_36 = "Campo obrigatório";
    }
    if (answer?.campo_36 === 1 && answer?.campo_39 === 0 && answer?.campo_37 === null) {
        errors.campo_37 = "Campo obrigatório";
    }
    if (answer?.campo_36 === 1 && answer?.campo_39 === 0 && answer?.campo_38 === null) {
        errors.campo_38 = "Campo obrigatório";
    }
    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };