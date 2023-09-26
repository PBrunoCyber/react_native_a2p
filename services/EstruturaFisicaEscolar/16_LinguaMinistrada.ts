import { IInstrumentosEMateriais, ILinguaMinistrada } from "../../types/EstruturaFisicaEscolar";

const verificaApenasZeros = (inputString: string) => {
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] !== '0') {
            return false;
        }
    }
    return true;
};

const validate = (answer: ILinguaMinistrada | undefined, instrumentosEMateriais: IInstrumentosEMateriais | undefined) => {
    const errors: any = {};
    if (answer?.campo_149 === 0 && answer?.campo_150 === 0) {
        errors.linguaMinistrada = "O campo \"Língua indígena\" e \"Língua portuguesa\" não podem ser preenchidos apenas com não.";
    }
    if (instrumentosEMateriais?.campo_148 === 1 && answer?.campo_149 === null) {
        errors.campo_149 = "Campo obrigatório";
    }
    if (instrumentosEMateriais?.campo_148 === 1 && answer?.campo_150 === null) {
        errors.campo_150 = "Campo obrigatório";
    }
    if (answer?.campo_149 === 1 && !answer.campo_151) {
        errors.campo_151 = "Campo obrigatório";
    }
    if (answer?.campo_151 && !/^\d+$/g.test(answer?.campo_151)) {
        errors.campo_151 = "Informe apenas números";
    }
    if (answer?.campo_152 && !/^\d+$/g.test(answer?.campo_152)) {
        errors.campo_152 = "Informe apenas números";
    }
    if (answer?.campo_153 && !/^\d+$/g.test(answer?.campo_153)) {
        errors.campo_153 = "Informe apenas números";
    }
    if (answer?.campo_152 && answer?.campo_151 && (answer?.campo_152 === answer?.campo_151)) {
        errors.campo_152 = "O campo não poder ser igual ao campo \"Código da língua indígena 1\"."
    }
    if (answer?.campo_152 && answer?.campo_151 && answer?.campo_153 && (answer?.campo_153 === answer?.campo_151 || answer?.campo_153 === answer?.campo_152)) {
        errors.campo_153 = "Há códigos repetidos, verifique"
    }



    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };