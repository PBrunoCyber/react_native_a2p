import { IRedeLocal } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IRedeLocal | undefined)=>{
    const errors: any = {};
    
    if (answer?.campo_114 === 0
        && answer?.campo_115 === 0
        && answer?.campo_116 === 0) {
        errors.redeLocal = "\"Rede local de interligação de computadores\" não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }

    if(answer?.campo_114 === 1 && answer?.campo_115 === null){
        errors.campo_115 = "Campo obrigatório";
    }
    

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
}

export default { validate };