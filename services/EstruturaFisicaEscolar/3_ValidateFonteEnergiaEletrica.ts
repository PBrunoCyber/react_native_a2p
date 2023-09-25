import { IEnergiaEletrica } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IEnergiaEletrica | undefined) => {
    const errors: any = {};
    if (answer?.campo_26 === null) {
        errors.campo_26 = "Campo Obrigatório"
    }
    if (answer?.campo_23 === 0
        && answer?.campo_24 === 0
        && answer?.campo_25 === 0
        && answer?.campo_26 === 0) {
        errors.energiaEletrica = "Fonte de energia elétrica não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_26 === 0 && answer?.campo_23 === null) {
        errors.campo_23 = "Campo obrigatório";
    }
    if (answer?.campo_26 === 0 && answer?.campo_24 === null) {
        errors.campo_24 = "Campo obrigatório";
    }
    if (answer?.campo_26 === 0 && answer?.campo_25 === null) {
        errors.campo_25 = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };