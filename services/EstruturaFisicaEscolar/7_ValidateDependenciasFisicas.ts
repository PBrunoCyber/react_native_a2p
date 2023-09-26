import { IDependenciasFisicas } from "../../types/EstruturaFisicaEscolar";

const validate = (answer: IDependenciasFisicas | undefined) => {
    const errors: any = {};
    if (answer?.campo_77 === null) {
        errors.campo_77 = "Campo Obrigatório"
    }
    if (answer?.campo_40 === 0
        && answer?.campo_41 === 0
        && answer?.campo_42 === 0
        && answer?.campo_43 === 0
        && (answer?.campo_44 === 0 || answer?.campo_44 === null)
        && (answer?.campo_45 === 0 || answer?.campo_45 === null)
        && (answer?.campo_46 === 0 || answer?.campo_46 === null)
        && (answer?.campo_47 === 0 || answer?.campo_47 === null)
        && answer?.campo_48 === 0
        && answer?.campo_49 === 0
        && answer?.campo_50 === 0
        && answer?.campo_51 === 0
        && answer?.campo_52 === 0
        && answer?.campo_53 === 0
        && answer?.campo_54 === 0
        && answer?.campo_55 === 0
        && answer?.campo_56 === 0
        && answer?.campo_57 === 0
        && answer?.campo_58 === 0
        && answer?.campo_59 === 0
        && answer?.campo_60 === 0
        && answer?.campo_61 === 0
        && answer?.campo_62 === 0
        && answer?.campo_63 === 0
        && answer?.campo_64 === 0
        && answer?.campo_65 === 0
        && answer?.campo_66 === 0
        && answer?.campo_67 === 0
        && answer?.campo_68 === 0
        && answer?.campo_69 === 0
        && answer?.campo_70 === 0
        && answer?.campo_71 === 0
        && answer?.campo_72 === 0
        && answer?.campo_73 === 0
        && answer?.campo_74 === 0
        && answer?.campo_75 === 0
        && answer?.campo_76 === 0
        && answer?.campo_77 === 0) {
        errors.dependenciasFisicas = "\"Dependências físicas existentes na escola\" não foram preenchidas corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
    }
    if (answer?.campo_77 === 0 && answer?.campo_40 === null) {
        errors.campo_40 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_41 === null) {
        errors.campo_41 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_42 === null) {
        errors.campo_42 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_43 === null) {
        errors.campo_43 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_43 === 1 && answer?.campo_44 === null) {
        errors.campo_44 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_43 === 1 && answer?.campo_45 === null) {
        errors.campo_45 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_43 === 1 && answer?.campo_46 === null) {
        errors.campo_46 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_43 === 1 && answer?.campo_47 === null) {
        errors.campo_47 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_48 === null) {
        errors.campo_48 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_49 === null) {
        errors.campo_49 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_50 === null) {
        errors.campo_50 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_51 === null) {
        errors.campo_51 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_52 === null) {
        errors.campo_52 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_53 === null) {
        errors.campo_53 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_54 === null) {
        errors.campo_54 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_55 === null) {
        errors.campo_55 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_56 === null) {
        errors.campo_56 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_57 === null) {
        errors.campo_57 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_58 === null) {
        errors.campo_58 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_59 === null) {
        errors.campo_59 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_60 === null) {
        errors.campo_60 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_61 === null) {
        errors.campo_61 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_62 === null) {
        errors.campo_62 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_63 === null) {
        errors.campo_63 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_64 === null) {
        errors.campo_64 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_65 === null) {
        errors.campo_65 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_66 === null) {
        errors.campo_66 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_67 === null) {
        errors.campo_67 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_68 === null) {
        errors.campo_68 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_69 === null) {
        errors.campo_69 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_70 === null) {
        errors.campo_70 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_71 === null) {
        errors.campo_71 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_72 === null) {
        errors.campo_72 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_73 === null) {
        errors.campo_73 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_74 === null) {
        errors.campo_74 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_75 === null) {
        errors.campo_75 = "Campo obrigatório";
    }
    if (answer?.campo_77 === 0 && answer?.campo_76 === null) {
        errors.campo_76 = "Campo obrigatório";
    }
    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return {};
    }
}

export default { validate };