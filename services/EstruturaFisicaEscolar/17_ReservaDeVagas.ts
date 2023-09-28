import { IReservaDeVagas } from "../../types/EstruturaFisicaEscolar";


const validate = (answer: IReservaDeVagas | undefined, exameClassificatorio: number | null | undefined) => {
    const errors: any = {};

    if (exameClassificatorio === 1 && (
        answer?.campo_155 === 0 &&
        answer?.campo_156 === 0 &&
        answer?.campo_157 === 0 &&
        answer?.campo_158 === 0 &&
        answer?.campo_159 === 0 &&
        answer?.campo_160 === 0
    )) {
        errors.reservaDeVagas = "\"Reserva de vagas por sistema de cotas para grupos específicos de aluno(a)s\" não foi preenchida corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não).";
    }
    if (exameClassificatorio === 1 && answer?.campo_160 === 0 && answer?.campo_155 === null) {
        errors.campo_155 = "Campo obrigatório";
    }
    if (exameClassificatorio === 1 && answer?.campo_160 === 0 && answer?.campo_156 === null) {
        errors.campo_156 = "Campo obrigatório";
    }
    if (exameClassificatorio === 1 && answer?.campo_160 === 0 && answer?.campo_157 === null) {
        errors.campo_157 = "Campo obrigatório";
    }
    if (exameClassificatorio === 1 && answer?.campo_160 === 0 && answer?.campo_158 === null) {
        errors.campo_158 = "Campo obrigatório";
    }
    if (exameClassificatorio === 1 && answer?.campo_160 === 0 && answer?.campo_159 === null) {
        errors.campo_159 = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };