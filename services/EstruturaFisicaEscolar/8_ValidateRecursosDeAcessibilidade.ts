import { ILocalDeFuncionamento, IRecursosDeAcessibilidade } from "../../types/EstruturaFisicaEscolar";

const verificaApenasZeros = (inputString: string) => {
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] !== '0') {
            return false;
        }
    }
    return true;
};

const validate = (answer: IRecursosDeAcessibilidade | undefined, localDeFuncionamento: ILocalDeFuncionamento | undefined) => {
    const errors: any = {};
    if (answer?.campo_86 === null) {
        errors.campo_77 = "Campo Obrigatório"
    }
    if (answer?.campo_78 === 0
        && answer?.campo_79 === 0
        && answer?.campo_80 === 0
        && answer?.campo_81 === 0
        && answer?.campo_82 === 0
        && answer?.campo_83 === 0
        && answer?.campo_84 === 0
        && answer?.campo_85 === 0
        && answer?.campo_86 === 0) {
        errors.recursosDeAcessibilidade = "\"Recursos de acessibilidade para pessoas com deficiência ou mobilidade reduzida nas vias de circulação internas na escola\" não foram preenchidos corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_86 === 0 && answer?.campo_78 === null) {
        errors.campo_78 = "Campo obrigatório";
    }
    if (answer?.campo_86 === 0 && answer?.campo_79 === null) {
        errors.campo_79 = "Campo obrigatório";
    }
    if (answer?.campo_86 === 0 && answer?.campo_80 === null) {
        errors.campo_80 = "Campo obrigatório";
    }
    if (answer?.campo_86 === 0 && answer?.campo_81 === null) {
        errors.campo_81 = "Campo obrigatório";
    }
    if (answer?.campo_86 === 0 && answer?.campo_82 === null) {
        errors.campo_82 = "Campo obrigatório";
    }
    if (answer?.campo_86 === 0 && answer?.campo_83 === null) {
        errors.campo_83 = "Campo obrigatório";
    }
    if (answer?.campo_86 === 0 && answer?.campo_84 === null) {
        errors.campo_84 = "Campo obrigatório";
    }
    if (answer?.campo_86 === 0 && answer?.campo_85 === null) {
        errors.campo_85 = "Campo obrigatório";
    }
    if (localDeFuncionamento?.campo_3 === 1 && (answer?.campo_87 === "" || answer?.campo_87 === undefined)) {
        errors.campo_87 = "Campo obrigatório";
    }
    if (answer?.campo_87 && !/^\d+$/g.test(answer?.campo_87)) {
        errors.campo_87 = "Informe apenas números";
    }
    if (answer?.campo_87 && verificaApenasZeros(answer?.campo_87)) {
        errors.campo_87 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_87 && answer?.campo_87.length > 4) {
        errors.campo_87 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (localDeFuncionamento?.campo_3 === 1 && (answer?.campo_88 === "" || answer?.campo_88 === undefined)) {
        errors.campo_88 = "Campo obrigatório";
    }
    if (answer?.campo_88 && !/^\d+$/g.test(answer?.campo_88)) {
        errors.campo_88 = "Informe apenas números";
    }
    if (answer?.campo_88 && verificaApenasZeros(answer?.campo_88)) {
        errors.campo_88 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_88 && answer?.campo_88.length > 4) {
        errors.campo_88 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_89 && !/^\d+$/g.test(answer?.campo_89)) {
        errors.campo_89 = "Informe apenas números";
    }
    if (answer?.campo_89 && verificaApenasZeros(answer?.campo_89)) {
        errors.campo_89 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_89 && answer?.campo_89.length > 4) {
        errors.campo_89 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_89 && (Number)(answer?.campo_89) > (Number)(answer?.campo_87 + answer?.campo_88)) {
        errors.campo_89 = "O valor preenchido não pode ser maior que a soma do campo \"Número de salas de aula utilizadas na escola dentro do prédio escolar\" com o campo \"Número de salas de aula utilizadas na escola fora do prédio escolar\"";
    }
    if (answer?.campo_90 && !/^\d+$/g.test(answer?.campo_90)) {
        errors.campo_90 = "Informe apenas números";
    }
    if (answer?.campo_90 && verificaApenasZeros(answer?.campo_90)) {
        errors.campo_90 = "O campo não pode ser preenchido apenas com zeros.";
    }
    if (answer?.campo_90 && answer?.campo_90.length > 4) {
        errors.campo_90 = "O campo não pode ter mais que 4 caracteres.";
    }
    if (answer?.campo_90 && (Number)(answer?.campo_90) > (Number)(answer?.campo_87 + answer?.campo_88)) {
        errors.campo_90 = "O valor preenchido não pode ser maior que a soma do campo \"Número de salas de aula utilizadas na escola dentro do prédio escolar\" com o campo \"Número de salas de aula utilizadas na escola fora do prédio escolar\"";
    }
    if (answer?.campo_90 && ((Number)(answer?.campo_90 + answer?.campo_89) > (2 * (Number)(answer?.campo_87 + answer?.campo_88)))) {
        errors.campo_90 = "A soma do número preenchido neste campo com o número preenchido no campo \"Número de salas de aula climatizadas\" não pode ser maior que o dobro da soma do campo \"Número de salas de aula utilizadas na escola dentro do prédio escolar\" com o campo \"Número de salas de aula utilizadas na escola fora do prédio escolar\"";
    }
    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };