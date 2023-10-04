import { IQuantidadeEquipamentos} from "../../types/EstruturaFisicaEscolar";

const validate = (answerQuantidadeEquipamentos: IQuantidadeEquipamentos | undefined) => {
    const errors: any = {};
    
    
    if (answerQuantidadeEquipamentos?.campo_98 && !/^\d+$/g.test(answerQuantidadeEquipamentos?.campo_98)) {
        errors.campo_98 = "Informe apenas números";
    }
    if (answerQuantidadeEquipamentos?.campo_99 && !/^\d+$/g.test(answerQuantidadeEquipamentos?.campo_99)) {
        errors.campo_99 = "Informe apenas números";
    }
    if (answerQuantidadeEquipamentos?.campo_100 && !/^\d+$/g.test(answerQuantidadeEquipamentos?.campo_100)) {
        errors.campo_100 = "Informe apenas números";
    }
    if (answerQuantidadeEquipamentos?.campo_101 && !/^\d+$/g.test(answerQuantidadeEquipamentos?.campo_101)) {
        errors.campo_101 = "Informe apenas números";
    }
    if (answerQuantidadeEquipamentos?.campo_102 && !/^\d+$/g.test(answerQuantidadeEquipamentos?.campo_102)) {
        errors.campo_102 = "Informe apenas números";
    }
    if (answerQuantidadeEquipamentos?.campo_103 && !/^\d+$/g.test(answerQuantidadeEquipamentos?.campo_103)) {
        errors.campo_103 = "Informe apenas números";
    }
    if (answerQuantidadeEquipamentos?.campo_104 && !/^\d+$/g.test(answerQuantidadeEquipamentos?.campo_104)) {
        errors.campo_104 = "Informe apenas números";
    }
    if (answerQuantidadeEquipamentos?.campo_105 && !/^\d+$/g.test(answerQuantidadeEquipamentos?.campo_105)) {
        errors.campo_105 = "Informe apenas números";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };