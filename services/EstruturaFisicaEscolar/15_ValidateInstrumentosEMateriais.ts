import { IInstrumentosEMateriais } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IInstrumentosEMateriais | undefined) => {
    const errors: any = {};
    if (answer?.campo_147 === null) {
        errors.campo_147 = "Campo Obrigatório"
    }
    if (answer?.campo_135 === 0
        && answer?.campo_136 === 0
        && answer?.campo_137 === 0
        && answer?.campo_138 === 0
        && answer?.campo_139 === 0
        && answer?.campo_140 === 0
        && answer?.campo_141 === 0
        && answer?.campo_142 === 0
        && answer?.campo_143 === 0
        && answer?.campo_144 === 0
        && answer?.campo_145 === 0
        && answer?.campo_146 === 0
        && answer?.campo_147 === 0
        && answer?.campo_148 === 0
    ) {
        errors.instrumentosEMateriais = "\"Instrumentos, materiais socioculturais e/ou pedagógicos em uso na escola para o desenvolvimento de atividades de ensino aprendizagem\" não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_147 === 0 && answer?.campo_135 === null) {
        errors.campo_135 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_136 === null) {
        errors.campo_136 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_137 === null) {
        errors.campo_137 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_138 === null) {
        errors.campo_138 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_139 === null) {
        errors.campo_139 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_140 === null) {
        errors.campo_140 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_141 === null) {
        errors.campo_141 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_142 === null) {
        errors.campo_142 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_143 === null) {
        errors.campo_143 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_144 === null) {
        errors.campo_144 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_145 === null) {
        errors.campo_145 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_146 === null) {
        errors.campo_146 = "Campo obrigatório";
    }
    if (answer?.campo_147 === 0 && answer?.campo_148 === null) {
        errors.campo_148 = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };