import { IRecursosDeAcessibilidade} from "../../types/EstruturaFisicaEscolar";

const validate = (answerRecursosDeAcessibilidade: IRecursosDeAcessibilidade | undefined) => {
    const errors: any = {};
    
    if (answerRecursosDeAcessibilidade?.campo_87 && !/^\d+$/g.test(answerRecursosDeAcessibilidade?.campo_87)) {
        errors.campo_87 = "Informe apenas números";
    }
    if (answerRecursosDeAcessibilidade?.campo_88 && !/^\d+$/g.test(answerRecursosDeAcessibilidade?.campo_88)) {
        errors.campo_88 = "Informe apenas números";
    }
    if (answerRecursosDeAcessibilidade?.campo_89 && !/^\d+$/g.test(answerRecursosDeAcessibilidade?.campo_89)) {
        errors.campo_89 = "Informe apenas números";
    }
    if (answerRecursosDeAcessibilidade?.campo_90 && !/^\d+$/g.test(answerRecursosDeAcessibilidade?.campo_90)) {
        errors.campo_90 = "Informe apenas números";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };