import { IQuantidadeEquipamentos, ITotalProfissionais } from "../../types/EstruturaFisicaEscolar";

const verificaApenasZeros = (inputString: string) => {
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] !== '0') {
            return false;
        }
    }
    return true;
};

const validate = (answer: ITotalProfissionais | undefined) => {
    const errors: any = {};

    if (answer?.campo_133 === null) {
        errors.campo_133 = "Campo obrigatório";
    }
    if (answer?.campo_133 === 0 &&
        !answer?.campo_117 &&
        !answer?.campo_118 &&
        !answer?.campo_119 &&
        !answer?.campo_120 &&
        !answer?.campo_121 &&
        !answer?.campo_122 &&
        !answer?.campo_123 &&
        !answer?.campo_124 &&
        !answer?.campo_125 &&
        !answer?.campo_126 &&
        !answer?.campo_127 &&
        !answer?.campo_128 &&
        !answer?.campo_129 &&
        !answer?.campo_130 &&
        !answer?.campo_131 &&
        !answer?.campo_132
    ) {
        errors.totalProfissionais = "\"Total de profissionais que atuam nas seguintes funções na escola\" não foi preenchido corretamente."
    }

    if (answer?.campo_117 && !/^\d+$/g.test(answer?.campo_117)) {
        errors.campo_117 = "Informe apenas números";
    }
    if (answer?.campo_117 && verificaApenasZeros(answer?.campo_117)) {
        errors.campo_117 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_117 && answer?.campo_117.length > 4) {
        errors.campo_177 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_118 && !/^\d+$/g.test(answer?.campo_118)) {
        errors.campo_118 = "Informe apenas números";
    }
    if (answer?.campo_118 && verificaApenasZeros(answer?.campo_118)) {
        errors.campo_118 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_118 && answer?.campo_118.length > 4) {
        errors.campo_118 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_119 && !/^\d+$/g.test(answer?.campo_119)) {
        errors.campo_119 = "Informe apenas números";
    }
    if (answer?.campo_119 && verificaApenasZeros(answer?.campo_119)) {
        errors.campo_119 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_119 && answer?.campo_119.length > 4) {
        errors.campo_119 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_120 && !/^\d+$/g.test(answer?.campo_120)) {
        errors.campo_120 = "Informe apenas números";
    }
    if (answer?.campo_120 && verificaApenasZeros(answer?.campo_120)) {
        errors.campo_120 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_120 && answer?.campo_120.length > 4) {
        errors.campo_120 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_121 && !/^\d+$/g.test(answer?.campo_121)) {
        errors.campo_121 = "Informe apenas números";
    }
    if (answer?.campo_121 && verificaApenasZeros(answer?.campo_121)) {
        errors.campo_121 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_121 && answer?.campo_121.length > 4) {
        errors.campo_121 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_122 && !/^\d+$/g.test(answer?.campo_122)) {
        errors.campo_122 = "Informe apenas números";
    }
    if (answer?.campo_122 && verificaApenasZeros(answer?.campo_122)) {
        errors.campo_122 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_122 && answer?.campo_122.length > 4) {
        errors.campo_122 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_123 && !/^\d+$/g.test(answer?.campo_123)) {
        errors.campo_123 = "Informe apenas números";
    }
    if (answer?.campo_123 && verificaApenasZeros(answer?.campo_123)) {
        errors.campo_123 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_123 && answer?.campo_123.length > 4) {
        errors.campo_123 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_124 && !/^\d+$/g.test(answer?.campo_124)) {
        errors.campo_124 = "Informe apenas números";
    }
    if (answer?.campo_124 && verificaApenasZeros(answer?.campo_124)) {
        errors.campo_124 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_124 && answer?.campo_124.length > 4) {
        errors.campo_124 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_125 && !/^\d+$/g.test(answer?.campo_125)) {
        errors.campo_125 = "Informe apenas números";
    }
    if (answer?.campo_125 && verificaApenasZeros(answer?.campo_125)) {
        errors.campo_125 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_125 && answer?.campo_125.length > 4) {
        errors.campo_125 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_126 && !/^\d+$/g.test(answer?.campo_126)) {
        errors.campo_126 = "Informe apenas números";
    }
    if (answer?.campo_126 && verificaApenasZeros(answer?.campo_126)) {
        errors.campo_126 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_126 && answer?.campo_126.length > 4) {
        errors.campo_126 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_127 && !/^\d+$/g.test(answer?.campo_127)) {
        errors.campo_127 = "Informe apenas números";
    }
    if (answer?.campo_127 && verificaApenasZeros(answer?.campo_127)) {
        errors.campo_127 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_127 && answer?.campo_127.length > 4) {
        errors.campo_127 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_128 && !/^\d+$/g.test(answer?.campo_128)) {
        errors.campo_128 = "Informe apenas números";
    }
    if (answer?.campo_128 && verificaApenasZeros(answer?.campo_128)) {
        errors.campo_128 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_128 && answer?.campo_128.length > 4) {
        errors.campo_128 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_129 && !/^\d+$/g.test(answer?.campo_129)) {
        errors.campo_129 = "Informe apenas números";
    }
    if (answer?.campo_129 && verificaApenasZeros(answer?.campo_129)) {
        errors.campo_129 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_129 && answer?.campo_129.length > 4) {
        errors.campo_129 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_130 && !/^\d+$/g.test(answer?.campo_130)) {
        errors.campo_130 = "Informe apenas números";
    }
    if (answer?.campo_130 && verificaApenasZeros(answer?.campo_130)) {
        errors.campo_130 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_130 && answer?.campo_130.length > 4) {
        errors.campo_130 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_131 && !/^\d+$/g.test(answer?.campo_131)) {
        errors.campo_131 = "Informe apenas números";
    }
    if (answer?.campo_131 && verificaApenasZeros(answer?.campo_131)) {
        errors.campo_131 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_131 && answer?.campo_131.length > 4) {
        errors.campo_131 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_132 && !/^\d+$/g.test(answer?.campo_132)) {
        errors.campo_132 = "Informe apenas números";
    }
    if (answer?.campo_132 && verificaApenasZeros(answer?.campo_132)) {
        errors.campo_132 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_132 && answer?.campo_132.length > 4) {
        errors.campo_132 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_133 === 0 && answer?.campo_134 === null) {
        errors.campo_134 = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };