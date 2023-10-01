import { IEquipamentos } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IEquipamentos | undefined) => {
    const errors: any = {};
    if (answer?.campo_97 === null) {
        errors.campo_97 = "Campo Obrigatório"
    }
    if (answer?.campo_91 === 0
        && answer?.campo_92 === 0
        && answer?.campo_93 === 0
        && answer?.campo_94 === 0
        && answer?.campo_95 === 0
        && answer?.campo_96 === 0
        && answer?.campo_97 === 0
    ) {
        errors.equipamentos = "\"Equipamentos existentes na escola para uso técnico e administrativo\" não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_97 === 0 && answer?.campo_91 === null) {
        errors.campo_91 = "Campo obrigatório";
    }
    if (answer?.campo_97 === 0 && answer?.campo_92 === null) {
        errors.campo_92 = "Campo obrigatório";
    }
    if (answer?.campo_97 === 0 && answer?.campo_92 === null) {
        errors.campo_92 = "Campo obrigatório";
    }
    if (answer?.campo_97 === 0 && answer?.campo_93 === null) {
        errors.campo_93 = "Campo obrigatório";
    }
    if (answer?.campo_97 === 0 && answer?.campo_94 === null) {
        errors.campo_94 = "Campo obrigatório";
    }
    if (answer?.campo_97 === 0 && answer?.campo_95 === null) {
        errors.campo_95 = "Campo obrigatório";
    }
    if (answer?.campo_97 === 0 && answer?.campo_96 === null) {
        errors.campo_96 = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };