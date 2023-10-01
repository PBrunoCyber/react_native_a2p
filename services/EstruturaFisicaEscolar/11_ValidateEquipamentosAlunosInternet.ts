import { IAcessoInternet, IEquipamentosAlunosInternet } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IEquipamentosAlunosInternet | undefined,
    acessoInternet: IAcessoInternet | undefined) => {
    const errors: any = {};
    if (acessoInternet?.campo_108 === 1 && answer?.campo_111 === null) {
        errors.campo_111 = "Campo Obrigatório"
    }
    if (acessoInternet?.campo_108 === 1 && answer?.campo_112 === null) {
        errors.campo_112 = "Campo Obrigatório"
    }
    if (acessoInternet?.campo_110 === 0 && answer?.campo_113 === null) {
        errors.campo_113 = "Campo Obrigatório"
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };