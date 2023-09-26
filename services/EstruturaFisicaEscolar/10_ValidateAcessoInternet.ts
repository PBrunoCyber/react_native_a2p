import { IAcessoInternet } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IAcessoInternet | undefined) => {
    const errors: any = {};
    if (answer?.campo_110 === null) {
        errors.campo_110 = "Campo Obrigatório"
    }
    if (answer?.campo_106 === 0
        && answer?.campo_107 === 0
        && answer?.campo_108 === 0
        && answer?.campo_109 === 0
        && answer?.campo_110 === 0
        ) {
        errors.acessoInternet = "\"Acesso à internet\" não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_110 === 0 && answer?.campo_106 === null) {
        errors.campo_106 = "Campo obrigatório";
    }
    if (answer?.campo_110 === 0 && answer?.campo_107 === null) {
        errors.campo_107 = "Campo obrigatório";
    }
    if (answer?.campo_110 === 0 && answer?.campo_108 === null) {
        errors.campo_108 = "Campo obrigatório";
    }
    if (answer?.campo_110 === 0 && answer?.campo_109 === null) {
        errors.campo_109 = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };