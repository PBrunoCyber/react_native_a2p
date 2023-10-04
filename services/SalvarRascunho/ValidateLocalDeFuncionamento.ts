import { ILocalDeFuncionamento, IRecursosDeAcessibilidade, IQuantidadeEquipamentos, ITotalProfissionais, ILinguaMinistrada } from "../../types/EstruturaFisicaEscolar";

const validate = (answerLocalDeFuncionamento: ILocalDeFuncionamento | undefined) => {
    const errors: any = {};
    
    if (answerLocalDeFuncionamento?.campo_11 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_11)) {
        errors.campo_11 = "Informe apenas números";
    }
    if (answerLocalDeFuncionamento?.campo_12 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_12)) {
        errors.campo_12 = "Informe apenas números";
    }
    if (answerLocalDeFuncionamento?.campo_13 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_13)) {
        errors.campo_13 = "Informe apenas números";
    }
    if (answerLocalDeFuncionamento?.campo_14 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_14)) {
        errors.campo_14 = "Informe apenas números";
    }
    if (answerLocalDeFuncionamento?.campo_15 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_15)) {
        errors.campo_15 = "Informe apenas números";
    }
    if (answerLocalDeFuncionamento?.campo_16 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_16)) {
        errors.campo_16 = "Informe apenas números";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };