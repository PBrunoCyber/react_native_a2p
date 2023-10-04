import { ILinguaMinistrada } from "../../types/EstruturaFisicaEscolar";

const validate = (answerLinguaMinistrada: ILinguaMinistrada | undefined) => {
    const errors: any = {};

    if (answerLinguaMinistrada?.campo_151 && !/^\d+$/g.test(answerLinguaMinistrada?.campo_151)) {
        errors.campo_151 = "Informe apenas números";
    }
    if (answerLinguaMinistrada?.campo_152 && !/^\d+$/g.test(answerLinguaMinistrada?.campo_152)) {
        errors.campo_152 = "Informe apenas números";
    }
    if (answerLinguaMinistrada?.campo_153 && !/^\d+$/g.test(answerLinguaMinistrada?.campo_153)) {
        errors.campo_153 = "Informe apenas números";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };