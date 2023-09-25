import { ILocalDeFuncionamento } from "../types/EstruturaFisicaEscolar";

const validateLocalDeFuncionamento = (answerLocalDeFuncionamento: ILocalDeFuncionamento | undefined) => {
    const errors: any = {};
        if (answerLocalDeFuncionamento?.campo_3 === null) {
            errors.campo_3 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_4 === null) {
            errors.campo_4 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_5 === null) {
            errors.campo_5 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_6 === null) {
            errors.campo_6 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_7 === null) {
            errors.campo_7 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_8 === null) {
            errors.campo_8 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_3 === 0
            && answerLocalDeFuncionamento?.campo_4 === 0
            && answerLocalDeFuncionamento?.campo_5 === 0
            && answerLocalDeFuncionamento?.campo_6 === 0
            && answerLocalDeFuncionamento?.campo_7 === 0
            && answerLocalDeFuncionamento?.campo_8 === 0
        ){
            errors.localDeFuncionamento = "Local de funcionamento da escola não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
        }
        if(answerLocalDeFuncionamento?.campo_3 === 1 && answerLocalDeFuncionamento?.campo_9 === null){
            errors.campo_9 = "Campo Obrigatório"
        }
        if(answerLocalDeFuncionamento?.campo_3 === 1 && answerLocalDeFuncionamento?.campo_10 === null){
            errors.campo_10 = "Campo Obrigatório"
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_11 === ""){
            errors.campo_11 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_12 === ""){
            errors.campo_12 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_13 === ""){
            errors.campo_13 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_14 === ""){
            errors.campo_14 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_15 === ""){
            errors.campo_15 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_16 === ""){
            errors.campo_16 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_11 && answerLocalDeFuncionamento?.campo_11.length < 8){
            errors.campo_11 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_12 && answerLocalDeFuncionamento?.campo_12.length < 8){
            errors.campo_12 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_13 && answerLocalDeFuncionamento?.campo_13.length < 8){
            errors.campo_13 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_14 && answerLocalDeFuncionamento?.campo_14.length < 8){
            errors.campo_14 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_15 && answerLocalDeFuncionamento?.campo_15.length < 8){
            errors.campo_15 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_16 && answerLocalDeFuncionamento?.campo_16.length < 8){
            errors.campo_16 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_11 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_11)){
            errors.campo_11 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_12 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_12)){
            errors.campo_12 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_13 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_13)){
            errors.campo_13 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_14 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_14)){
            errors.campo_14 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_15 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_15)){
            errors.campo_15 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_16 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_16)){
            errors.campo_16 = "Informe apenas números";
        }
        if (Object.keys(errors).length > 0) {
            return errors;
        }else{
            return {};
        }
}

export default {validateLocalDeFuncionamento};