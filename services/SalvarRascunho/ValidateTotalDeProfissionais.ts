import {  ITotalProfissionais } from "../../types/EstruturaFisicaEscolar";

const validate = (answerTotalProfissionais: ITotalProfissionais | undefined) => {
    const errors: any = {};
    
    
    if (answerTotalProfissionais?.campo_117 && !/^\d+$/g.test(answerTotalProfissionais?.campo_117)) {
        errors.campo_117 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_118 && !/^\d+$/g.test(answerTotalProfissionais?.campo_118)) {
        errors.campo_118 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_119 && !/^\d+$/g.test(answerTotalProfissionais?.campo_119)) {
        errors.campo_119 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_120 && !/^\d+$/g.test(answerTotalProfissionais?.campo_120)) {
        errors.campo_120 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_121 && !/^\d+$/g.test(answerTotalProfissionais?.campo_121)) {
        errors.campo_121 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_122 && !/^\d+$/g.test(answerTotalProfissionais?.campo_122)) {
        errors.campo_122 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_123 && !/^\d+$/g.test(answerTotalProfissionais?.campo_123)) {
        errors.campo_123 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_124 && !/^\d+$/g.test(answerTotalProfissionais?.campo_124)) {
        errors.campo_124 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_125 && !/^\d+$/g.test(answerTotalProfissionais?.campo_125)) {
        errors.campo_125 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_126 && !/^\d+$/g.test(answerTotalProfissionais?.campo_126)) {
        errors.campo_126 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_127 && !/^\d+$/g.test(answerTotalProfissionais?.campo_127)) {
        errors.campo_127 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_128 && !/^\d+$/g.test(answerTotalProfissionais?.campo_128)) {
        errors.campo_128 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_129 && !/^\d+$/g.test(answerTotalProfissionais?.campo_129)) {
        errors.campo_129 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_130 && !/^\d+$/g.test(answerTotalProfissionais?.campo_130)) {
        errors.campo_130 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_131 && !/^\d+$/g.test(answerTotalProfissionais?.campo_131)) {
        errors.campo_131 = "Informe apenas números";
    }
    if (answerTotalProfissionais?.campo_132 && !/^\d+$/g.test(answerTotalProfissionais?.campo_132)) {
        errors.campo_132 = "Informe apenas números";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };