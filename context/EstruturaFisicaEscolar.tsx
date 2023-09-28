import React, { createContext, useEffect, useState } from "react";
import { IAbastecimentoDeAgua, IAcessoInternet, IDependenciasFisicas, IDestinacaoDoLixo, IEnergiaEletrica, IEquipamentos, IEquipamentosAlunosInternet, IEsgotamentoSanitario, IInstrumentosEMateriais, ILinguaMinistrada, ILocalDeFuncionamento, IOrgaosColegiados, IQuantidadeEquipamentos, IRecursosDeAcessibilidade, IRedeLocal, IReservaDeVagas, ITotalProfissionais, ITratamentoDoLixo } from "../types/EstruturaFisicaEscolar";

interface IContextProps {
    //Limpar Contexto 
    limparContexto: () => void,
    // Local de Funcionamento
    answerLocalDeFuncionamento: ILocalDeFuncionamento,
    onLocalDeFuncionamentoChange: (answer: ILocalDeFuncionamento) => void,
    formErrorsLocalDeFuncionamento: Object,
    setFormErrorsLocalDeFuncionamento: React.Dispatch<React.SetStateAction<{}>>,
    // Abastecimento De Agua
    answerAbstecimentoDeAgua: IAbastecimentoDeAgua,
    onAbastecimentoDeAguaChange: (answer: IAbastecimentoDeAgua) => void,
    formErrorsAbastecimentoDeAgua: Object,
    setFormErrorsAbastecimentoDeAgua: React.Dispatch<React.SetStateAction<{}>>
    // Fonte Energia Eletrica
    answerEnergiaEletrica: IEnergiaEletrica,
    onEnergiaEletricaChange: (answer: IEnergiaEletrica) => void,
    formErrorsEnergiaEletrica: Object,
    setFormErrorsEnergiaEletrica: React.Dispatch<React.SetStateAction<{}>>
    // Esgotamento Sanitario
    answerEsgotamentoSanitario: IEsgotamentoSanitario,
    onEsgotamentoSanitarioChange: (answer: IEsgotamentoSanitario) => void,
    formErrorsEsgotamentoSanitario: Object,
    setFormErrorsEsgotamentoSanitario: React.Dispatch<React.SetStateAction<{}>>
    // Destinação Do Lixo
    answerDestinacaoDoLixo: IDestinacaoDoLixo,
    onDestinacaoDoLixoChange: (answer: IDestinacaoDoLixo) => void,
    formErrorsDestinacaoDoLixo: Object,
    setFormErrorsDestinacaoDoLixo: React.Dispatch<React.SetStateAction<{}>>,
    // Tratamento Do Lixo
    answerTratamentoDoLixo: ITratamentoDoLixo,
    onTratamentoDoLixoChange: (answer: ITratamentoDoLixo) => void,
    formErrorsTratamentoDoLixo: Object,
    setFormErrorsTratamentoDoLixo: React.Dispatch<React.SetStateAction<{}>>,
    // Dependencias Fisicas
    answerDependenciasFisicas: IDependenciasFisicas,
    onDependenciasFisicasChange: (answer: IDependenciasFisicas) => void,
    formErrorsDependenciasFisicas: Object,
    setFormErrorsDependenciasFisicas: React.Dispatch<React.SetStateAction<{}>>
    // Recursos De Acessibilidade
    answerRecursosDeAcessibilidade: IRecursosDeAcessibilidade,
    onRecursosDeAcessibilidadeChange: (answer: IRecursosDeAcessibilidade) => void,
    formErrorsRecursosDeAcessibilidade: Object,
    setFormErrorsRecursosDeAcessibilidade: React.Dispatch<React.SetStateAction<{}>>
    // Equipamentos
    answerEquipamentos: IEquipamentos,
    onEquipamentosChange: (answer: IEquipamentos) => void,
    formErrorsEquipamentos: Object,
    setFormErrorsEquipamentos: React.Dispatch<React.SetStateAction<{}>>,
    // Acesso A Internet
    answerAcessoInternet: IAcessoInternet,
    onAcessoInternetChange: (answer: IAcessoInternet) => void,
    formErrorsAcessoInternet: Object,
    setFormErrorsAcessoInternet: React.Dispatch<React.SetStateAction<{}>>,
    // Equipamentos Alunos Internet
    answerEquipamentosAlunosInternet: IEquipamentosAlunosInternet,
    onEquipamentosAlunosInternetChange: (answer: IEquipamentosAlunosInternet) => void,
    formErrorsEquipamentosAlunosInternet: Object,
    setFormErrorsEquipamentosAlunosInternet: React.Dispatch<React.SetStateAction<{}>>,
    // Quantidade De Equipamentos
    answerQuantidadeDeEquipamentos: IQuantidadeEquipamentos,
    onQuantidadeDeEquipamentosChange: (answer: IQuantidadeEquipamentos) => void,
    formErrorsQuantidadeDeEquipamentos: Object,
    setFormErrorsQuantidadeDeEquipamentos: React.Dispatch<React.SetStateAction<{}>>,
    // Rede Local
    answerRedeLocal: IRedeLocal,
    onRedeLocalChange: (answer: IRedeLocal) => void,
    formErrorsRedeLocal: Object,
    setFormErrorsRedeLocal: React.Dispatch<React.SetStateAction<{}>>,
    // Total De Profissionais
    answerTotalDeProfissionais: ITotalProfissionais,
    onTotalDeProfissionaisChange: (answer: ITotalProfissionais) => void,
    formErrorsTotalDeProfissionais: Object,
    setFormErrorsTotalDeProfissionais: React.Dispatch<React.SetStateAction<{}>>,
    // Instrumentos E Materiais
    answerInstrumentosEMateriais: IInstrumentosEMateriais,
    onInstrumentosEMateriaisChange: (answer: IInstrumentosEMateriais) => void,
    formErrorsInstrumentosEMateriais: Object,
    setFormErrorsInstrumentosEMateriais: React.Dispatch<React.SetStateAction<{}>>,
    // Linguas Ministradas
    answerLinguasMinistradas: ILinguaMinistrada,
    onLinguasMinistradasChange: (answer: ILinguaMinistrada) => void,
    formErrorsLinguasMinistradas: Object,
    setFormErrorsLinguasMinistradas: React.Dispatch<React.SetStateAction<{}>>,
    // Reserva De Vagas
    answerReservaDeVagas: IReservaDeVagas,
    onReservaDeVagasChange: (answer: IReservaDeVagas) => void,
    formErrorsReservaDeVagas: Object,
    setFormErrorsReservaDeVagas: React.Dispatch<React.SetStateAction<{}>>,
    // Orgaos Colegiados
    answerOrgaosColegiados: IOrgaosColegiados,
    onOrgaosColegiadosChange: (answer: IOrgaosColegiados) => void,
    formErrorsOrgaosColegiados: Object,
    setFormErrorsOrgaosColegiados: React.Dispatch<React.SetStateAction<{}>>,
}

const EstruturaFisicaEscolarContext = createContext<IContextProps>({
    //Limpar Contexto
    limparContexto: () => null,
    // Local De Funcionamento
    answerLocalDeFuncionamento: { campo_3: null, campo_4: null, campo_5: null, campo_6: null, campo_7: null, campo_8: null, campo_9: null, campo_10: null, campo_11: '', campo_12: '', campo_13: '', campo_14: '', campo_15: '', campo_16: '' },
    onLocalDeFuncionamentoChange: () => null,
    formErrorsLocalDeFuncionamento: {},
    setFormErrorsLocalDeFuncionamento: () => null,
    // Abastecimento De Agua
    answerAbstecimentoDeAgua: { campo_17: null, campo_18: null, campo_19: null, campo_20: null, campo_21: null, campo_22: 0 },
    onAbastecimentoDeAguaChange: () => null,
    formErrorsAbastecimentoDeAgua: {},
    setFormErrorsAbastecimentoDeAgua: () => null,
    // Fonte Energia Eletrica
    answerEnergiaEletrica: { campo_23: null, campo_24: null, campo_25: null, campo_26: 0 },
    onEnergiaEletricaChange: () => null,
    formErrorsEnergiaEletrica: {},
    setFormErrorsEnergiaEletrica: () => { },
    // Esgotamento Sanitario
    answerEsgotamentoSanitario: { campo_27: null, campo_28: null, campo_29: null, campo_30: 0 },
    onEsgotamentoSanitarioChange: () => null,
    formErrorsEsgotamentoSanitario: {},
    setFormErrorsEsgotamentoSanitario: () => null,
    // Destinacao Do Lixo
    answerDestinacaoDoLixo: { campo_31: null, campo_32: null, campo_33: null, campo_34: null, campo_35: null },
    onDestinacaoDoLixoChange: () => null,
    formErrorsDestinacaoDoLixo: {},
    setFormErrorsDestinacaoDoLixo: () => null,
    // Tratamento Do Lixo
    answerTratamentoDoLixo: { campo_36: null, campo_37: null, campo_38: null, campo_39: 0 },
    onTratamentoDoLixoChange: () => null,
    formErrorsTratamentoDoLixo: {},
    setFormErrorsTratamentoDoLixo: () => null,
    // Dependencias Fisicas
    answerDependenciasFisicas: { campo_40: null, campo_41: null, campo_42: null, campo_43: null, campo_44: null, campo_45: null, campo_46: null, campo_47: null, campo_48: null, campo_49: null, campo_50: null, campo_51: null, campo_52: null, campo_53: null, campo_54: null, campo_55: null, campo_56: null, campo_57: null, campo_58: null, campo_59: null, campo_60: null, campo_61: null, campo_62: null, campo_63: null, campo_64: null, campo_65: null, campo_66: null, campo_67: null, campo_68: null, campo_69: null, campo_70: null, campo_71: null, campo_72: null, campo_73: null, campo_74: null, campo_75: null, campo_76: null, campo_77: 0 },
    onDependenciasFisicasChange: () => null,
    formErrorsDependenciasFisicas: {},
    setFormErrorsDependenciasFisicas: () => null,
    // Recursos De Acessibilidade
    answerRecursosDeAcessibilidade: { campo_78: null, campo_79: null, campo_80: null, campo_81: null, campo_82: null, campo_83: null, campo_84: null, campo_85: null, campo_86: 0, campo_87: '', campo_88: '', campo_89: '', campo_90: '' },
    onRecursosDeAcessibilidadeChange: () => null,
    formErrorsRecursosDeAcessibilidade: {},
    setFormErrorsRecursosDeAcessibilidade: () => null,
    // Equipamentos
    answerEquipamentos: { campo_91: null, campo_92: null, campo_93: null, campo_94: null, campo_95: null, campo_96: null, campo_97: 0 },
    onEquipamentosChange: () => null,
    formErrorsEquipamentos: {},
    setFormErrorsEquipamentos: () => null,
    // Acesso A Internet
    answerAcessoInternet: { campo_106: null, campo_107: null, campo_108: null, campo_109: null, campo_110: 0 },
    onAcessoInternetChange: () => null,
    formErrorsAcessoInternet: {},
    setFormErrorsAcessoInternet: () => null,
    // Equipamentos Alunos Internet
    answerEquipamentosAlunosInternet: { campo_111: null, campo_112: null, campo_113: null },
    onEquipamentosAlunosInternetChange: () => null,
    formErrorsEquipamentosAlunosInternet: {},
    setFormErrorsEquipamentosAlunosInternet: () => null,
    // Quantidade De Equipamentos
    answerQuantidadeDeEquipamentos: { campo_98: '', campo_99: '', campo_100: '', campo_101: '', campo_102: '', campo_103: '', campo_104: '', campo_105: '' },
    onQuantidadeDeEquipamentosChange: () => null,
    formErrorsQuantidadeDeEquipamentos: {},
    setFormErrorsQuantidadeDeEquipamentos: () => null,
    // Rede Local
    answerRedeLocal: { campo_114: null, campo_115: null, campo_116: 0 },
    onRedeLocalChange: () => null,
    formErrorsRedeLocal: {},
    setFormErrorsRedeLocal: () => null,
    // Total De Profissionais
    answerTotalDeProfissionais: { campo_117: '', campo_118: '', campo_119: '', campo_120: '', campo_121: '', campo_122: '', campo_123: '', campo_124: '', campo_125: '', campo_126: '', campo_127: '', campo_128: '', campo_129: '', campo_130: '', campo_131: '', campo_132: '', campo_133: 0, campo_134: null },
    onTotalDeProfissionaisChange: () => null,
    formErrorsTotalDeProfissionais: {},
    setFormErrorsTotalDeProfissionais: () => null,
    // Instrumentos E Materiais
    answerInstrumentosEMateriais: { campo_135: null, campo_136: null, campo_137: null, campo_138: null, campo_139: null, campo_140: null, campo_141: null, campo_142: null, campo_143: null, campo_144: null, campo_145: null, campo_146: null, campo_147: 0, campo_148: null },
    onInstrumentosEMateriaisChange: () => null,
    formErrorsInstrumentosEMateriais: {},
    setFormErrorsInstrumentosEMateriais: () => null,
    // Linguas Ministradas
    answerLinguasMinistradas: { campo_149: null, campo_150: null, campo_151: '', campo_152: '', campo_153: '' },
    onLinguasMinistradasChange: () => null,
    formErrorsLinguasMinistradas: {},
    setFormErrorsLinguasMinistradas: () => null,
    // Reserva De Vagas
    answerReservaDeVagas: { campo_155: null, campo_156: null, campo_157: null, campo_158: null, campo_159: null, campo_160: 0, campo_161: null, campo_162: null, campo_163: null },
    onReservaDeVagasChange: () => null,
    formErrorsReservaDeVagas: {},
    setFormErrorsReservaDeVagas: () => null,
    // Orgaos Colegiados
    answerOrgaosColegiados: { campo_164: null, campo_165: null, campo_166: null, campo_167: null, campo_168: null, campo_169: 0 },
    onOrgaosColegiadosChange: () => null,
    formErrorsOrgaosColegiados: {},
    setFormErrorsOrgaosColegiados: () => null,
});

export default EstruturaFisicaEscolarContext;

interface IProps {
    children: React.ReactNode
}

export function Provider({ children }: IProps) {
    const [formErrorsLocalDeFuncionamento, setFormErrorsLocalDeFuncionamento] = useState({});
    const [answerLocalDeFuncionamento, setAnswerLocalDeFuncionamento] = useState<ILocalDeFuncionamento>({ campo_3: null, campo_4: null, campo_5: null, campo_6: null, campo_7: null, campo_8: null, campo_9: null, campo_10: null, campo_11: '', campo_12: '', campo_13: '', campo_14: '', campo_15: '', campo_16: '' });
    const [formErrorsAbastecimentoDeAgua, setFormErrorsAbastecimentoDeAgua] = useState({});
    const [answerAbastecimentoDeAgua, setAnswerAbastecimentoDeAgua] = useState<IAbastecimentoDeAgua>({ campo_17: null, campo_18: null, campo_19: null, campo_20: null, campo_21: null, campo_22: 0 });
    const [formErrorsFonteEnergiaEletrica, setFormErrorsFonteEnergiaEletrica] = useState({});
    const [answerEnergiaEletrica, setAnswerEnergiaEletrica] = useState<IEnergiaEletrica>({ campo_23: null, campo_24: null, campo_25: null, campo_26: 0 });
    const [answerEsgotamentoSanitario, setAnswerEsgotamentoSanitario] = useState<IEsgotamentoSanitario>({ campo_27: null, campo_28: null, campo_29: null, campo_30: 0 });
    const [formErrorsEsgotamentoSanitario, setFormErrorsEsgotamentoSanitario] = useState({});
    const [answerDestinacaoDoLixo, setAnswerDestinacaoDoLixo] = useState<IDestinacaoDoLixo>({ campo_31: null, campo_32: null, campo_33: null, campo_34: null, campo_35: null });
    const [formErrorsDestinacaoDoLixo, setFormErrorsDestinacaoDoLixo] = useState({});
    const [answerTratamentoDoLixo, setAnswerTratamentoDoLixo] = useState<ITratamentoDoLixo>({ campo_36: null, campo_37: null, campo_38: null, campo_39: 0 });
    const [formErrorsTratamentoDoLixo, setFormErrorsTratamentoDoLixo] = useState({});
    const [answerDependenciaFisica, setAnswerDependenciaFisica] = useState<IDependenciasFisicas>({ campo_40: null, campo_41: null, campo_42: null, campo_43: null, campo_44: null, campo_45: null, campo_46: null, campo_47: null, campo_48: null, campo_49: null, campo_50: null, campo_51: null, campo_52: null, campo_53: null, campo_54: null, campo_55: null, campo_56: null, campo_57: null, campo_58: null, campo_59: null, campo_60: null, campo_61: null, campo_62: null, campo_63: null, campo_64: null, campo_65: null, campo_66: null, campo_67: null, campo_68: null, campo_69: null, campo_70: null, campo_71: null, campo_72: null, campo_73: null, campo_74: null, campo_75: null, campo_76: null, campo_77: 0 });
    const [formErrorsDependenciasFisicas, setFormErrorsDependenciasFisicas] = useState({});
    const [answerRecursosDeAcessibilidade, setAnswerRecursosDeAcessibilidade] = useState<IRecursosDeAcessibilidade>({ campo_78: null, campo_79: null, campo_80: null, campo_81: null, campo_82: null, campo_83: null, campo_84: null, campo_85: null, campo_86: 0, campo_87: '', campo_88: '', campo_89: '', campo_90: '' });
    const [formErrorsRecursosDeAcessibilidade, setFormErrorsRecursosDeAcessibilidade] = useState({});
    const [answerEquipamentos, setAnswerEquipamentos] = useState<IEquipamentos>({ campo_91: null, campo_92: null, campo_93: null, campo_94: null, campo_95: null, campo_96: null, campo_97: 0 });
    const [formErrorsEquipamentos, setFormErrorsEquipamentos] = useState({});
    const [answerAcessoInternet, setAnswerAcessoInternet] = useState<IAcessoInternet>({ campo_106: null, campo_107: null, campo_108: null, campo_109: null, campo_110: 0 });
    const [formErrorsAcessoInternet, setFormErrorsAcessoInternet] = useState({});
    const [answerEquipamentosAlunosInternet, setAnswerEquipamentosAlunosInternet] = useState<IEquipamentosAlunosInternet>({ campo_111: null, campo_112: null, campo_113: null });
    const [formErrorsEquipamentoAlunoInternet, setFormErrorsEquipamentoAlunoInternet] = useState({});
    const [answerQuantidadeEquipamentos, setAnswerQuantidadeEquipamentos] = useState<IQuantidadeEquipamentos>({ campo_98: '', campo_99: '', campo_100: '', campo_101: '', campo_102: '', campo_103: '', campo_104: '', campo_105: '' });
    const [formErrorsQuantidadeEquipamentos, setFormErrorsQuantidadeEquipamentos] = useState({});
    const [answerRedeLocal, setAnswerRedeLocal] = useState<IRedeLocal>({ campo_114: null, campo_115: null, campo_116: 0 });
    const [formErrorsRedeLocal, setFormErrorsRedeLocal] = useState({});
    const [answerTotalProfissionais, setAnswerTotalProfissionais] = useState<ITotalProfissionais>({ campo_117: '', campo_118: '', campo_119: '', campo_120: '', campo_121: '', campo_122: '', campo_123: '', campo_124: '', campo_125: '', campo_126: '', campo_127: '', campo_128: '', campo_129: '', campo_130: '', campo_131: '', campo_132: '', campo_133: 0, campo_134: null });
    const [formErrorsTotalDeProfissionais, setFormErrorsTotalDeProfissionais] = useState({});
    const [answerInstrumentosEMateriais, setAnswerInstrumentosEMaterias] = useState<IInstrumentosEMateriais>({ campo_135: null, campo_136: null, campo_137: null, campo_138: null, campo_139: null, campo_140: null, campo_141: null, campo_142: null, campo_143: null, campo_144: null, campo_145: null, campo_146: null, campo_147: 0, campo_148: null });
    const [formErrorsInstrumentosEMateriais, setFormErrorsInstrumentosEMateriais] = useState({});
    const [answerLinguaMinistrada, setAnswerLinguaMinistrada] = useState<ILinguaMinistrada>({ campo_149: null, campo_150: null, campo_151: '', campo_152: '', campo_153: '' });
    const [formErrorsLinguaMinistrada, setFormErrorsLinguaMinistrada] = useState({});
    const [answerReservaDeVagas, setAnswerReservaDeVagas] = useState<IReservaDeVagas>({ campo_155: null, campo_156: null, campo_157: null, campo_158: null, campo_159: null, campo_160: 0, campo_161: null, campo_162: null, campo_163: null });
    const [formErrorsReservaDeVagas, setFormErrorsReservarDeVagas] = useState({});
    const [answerOrgaosColegiados, setAnswerOrgaosColegiados] = useState<IOrgaosColegiados>({ campo_164: null, campo_165: null, campo_166: null, campo_167: null, campo_168: null, campo_169: 0 });
    const [formErrorsOrgaosColegiados, setFormErrorsOrgaosColegiados] = useState({});

    const limparContexto = () => {
        setAnswerLocalDeFuncionamento({ campo_3: null, campo_4: null, campo_5: null, campo_6: null, campo_7: null, campo_8: null, campo_9: null, campo_10: null, campo_11: '', campo_12: '', campo_13: '', campo_14: '', campo_15: '', campo_16: '' });
        console.log("Hello");
    }

    const onLocalDeFuncionamentoChange = (answer: ILocalDeFuncionamento) => {
        setAnswerLocalDeFuncionamento(answer);
        setFormErrorsLocalDeFuncionamento({});
    }

    const onAbastecimentoDeAguaChange = (answer: IAbastecimentoDeAgua) => {
        setAnswerAbastecimentoDeAgua(answer);
        setFormErrorsAbastecimentoDeAgua({});
    }

    const onFonteEnergiaEletricaChange = (answer: IEnergiaEletrica) => {
        setAnswerEnergiaEletrica(answer);
        setFormErrorsFonteEnergiaEletrica({});
    }

    const onEsgotamentoSanitarioChange = (answer: IEsgotamentoSanitario) => {
        setAnswerEsgotamentoSanitario(answer);
        setFormErrorsEsgotamentoSanitario({});
    }

    const onDestinacaoDoLixo = (answer: IDestinacaoDoLixo) => {
        setAnswerDestinacaoDoLixo(answer);
        setFormErrorsDestinacaoDoLixo({});
    }

    const onTratamentoDoLixo = (answer: ITratamentoDoLixo) => {
        setAnswerTratamentoDoLixo(answer);
        setFormErrorsTratamentoDoLixo({});
    }

    const onDependenciasFisicas = (answer: IDependenciasFisicas) => {
        setAnswerDependenciaFisica(answer);
        setFormErrorsDependenciasFisicas({});
    }

    const onRecursosDeAcessibilidade = (answer: IRecursosDeAcessibilidade) => {
        setAnswerRecursosDeAcessibilidade(answer);
        setFormErrorsRecursosDeAcessibilidade({});
    }

    const onEquipamentos = (answer: IEquipamentos) => {
        setAnswerEquipamentos(answer);
        setFormErrorsEquipamentos({});
    }

    const onAcessoInternet = (answer: IAcessoInternet) => {
        setAnswerAcessoInternet(answer);
        setFormErrorsAcessoInternet({});
        setFormErrorsEquipamentos({});
    }

    const onEquipamentosAlunosInternet = (answer: IEquipamentosAlunosInternet) => {
        setAnswerEquipamentosAlunosInternet(answer);
        setFormErrorsEquipamentoAlunoInternet({});
    }

    const onQuantidadeEquipamentos = (answer: IQuantidadeEquipamentos) => {
        setAnswerQuantidadeEquipamentos(answer);
        setFormErrorsQuantidadeEquipamentos({});
    }

    const onRedeLocal = (answer: IRedeLocal) => {
        setAnswerRedeLocal(answer);
        setFormErrorsRedeLocal({});
    }

    const onTotalDeProfissionais = (answer: ITotalProfissionais) => {
        setAnswerTotalProfissionais(answer);
        setFormErrorsTotalDeProfissionais({});
    }

    const onInstrumentosEMateriais = (answer: IInstrumentosEMateriais) => {
        setAnswerInstrumentosEMaterias(answer);
        setFormErrorsInstrumentosEMateriais({});
    }

    const onLinguaMinistrada = (answer: ILinguaMinistrada) => {
        setAnswerLinguaMinistrada(answer);
        setFormErrorsLinguaMinistrada({});
    }

    const onReservaDeVagas = (answer: IReservaDeVagas) => {
        setAnswerReservaDeVagas(answer);
        setFormErrorsReservarDeVagas({});
    }

    const onOrgaosColegiados = (answer: IOrgaosColegiados) => {
        setAnswerOrgaosColegiados(answer);
        setFormErrorsOrgaosColegiados({});
    }

    const contextData: IContextProps = {
        // Limpar Contexto 
        limparContexto: limparContexto,
        // Local De Funcionamento
        answerLocalDeFuncionamento: answerLocalDeFuncionamento,
        onLocalDeFuncionamentoChange: onLocalDeFuncionamentoChange,
        formErrorsLocalDeFuncionamento: formErrorsLocalDeFuncionamento,
        setFormErrorsLocalDeFuncionamento: setFormErrorsLocalDeFuncionamento,
        // Abastecimento De Agua
        answerAbstecimentoDeAgua: answerAbastecimentoDeAgua,
        onAbastecimentoDeAguaChange: onAbastecimentoDeAguaChange,
        formErrorsAbastecimentoDeAgua: formErrorsAbastecimentoDeAgua,
        setFormErrorsAbastecimentoDeAgua: setFormErrorsAbastecimentoDeAgua,
        // Energia Eletrica
        answerEnergiaEletrica: answerEnergiaEletrica,
        onEnergiaEletricaChange: onFonteEnergiaEletricaChange,
        formErrorsEnergiaEletrica: formErrorsFonteEnergiaEletrica,
        setFormErrorsEnergiaEletrica: setFormErrorsFonteEnergiaEletrica,
        // Esgotamento Sanitario
        answerEsgotamentoSanitario: answerEsgotamentoSanitario,
        onEsgotamentoSanitarioChange: onEsgotamentoSanitarioChange,
        formErrorsEsgotamentoSanitario: formErrorsEsgotamentoSanitario,
        setFormErrorsEsgotamentoSanitario: setFormErrorsEsgotamentoSanitario,
        // Destinação Do Lixo
        answerDestinacaoDoLixo: answerDestinacaoDoLixo,
        onDestinacaoDoLixoChange: onDestinacaoDoLixo,
        formErrorsDestinacaoDoLixo: formErrorsDestinacaoDoLixo,
        setFormErrorsDestinacaoDoLixo: setFormErrorsDestinacaoDoLixo,
        // Tratamento Do Lixo
        answerTratamentoDoLixo: answerTratamentoDoLixo,
        onTratamentoDoLixoChange: onTratamentoDoLixo,
        formErrorsTratamentoDoLixo: formErrorsTratamentoDoLixo,
        setFormErrorsTratamentoDoLixo: setFormErrorsTratamentoDoLixo,
        // Dependencias Fisicas
        answerDependenciasFisicas: answerDependenciaFisica,
        onDependenciasFisicasChange: onDependenciasFisicas,
        formErrorsDependenciasFisicas: formErrorsDependenciasFisicas,
        setFormErrorsDependenciasFisicas: setFormErrorsDependenciasFisicas,
        // Recursos de Acessibilidade
        answerRecursosDeAcessibilidade: answerRecursosDeAcessibilidade,
        onRecursosDeAcessibilidadeChange: onRecursosDeAcessibilidade,
        formErrorsRecursosDeAcessibilidade: formErrorsRecursosDeAcessibilidade,
        setFormErrorsRecursosDeAcessibilidade: setFormErrorsRecursosDeAcessibilidade,
        // Equipamentos
        answerEquipamentos: answerEquipamentos,
        onEquipamentosChange: onEquipamentos,
        formErrorsEquipamentos: formErrorsEquipamentos,
        setFormErrorsEquipamentos: setFormErrorsEquipamentos,
        // Acesso A Internet
        answerAcessoInternet: answerAcessoInternet,
        onAcessoInternetChange: onAcessoInternet,
        formErrorsAcessoInternet: formErrorsAcessoInternet,
        setFormErrorsAcessoInternet: setFormErrorsAcessoInternet,
        // Equipamentos Alunos Internet
        answerEquipamentosAlunosInternet: answerEquipamentosAlunosInternet,
        onEquipamentosAlunosInternetChange: onEquipamentosAlunosInternet,
        formErrorsEquipamentosAlunosInternet: formErrorsEquipamentoAlunoInternet,
        setFormErrorsEquipamentosAlunosInternet: setFormErrorsEquipamentoAlunoInternet,
        // Quantidade De Equipamentos
        answerQuantidadeDeEquipamentos: answerQuantidadeEquipamentos,
        onQuantidadeDeEquipamentosChange: onQuantidadeEquipamentos,
        formErrorsQuantidadeDeEquipamentos: formErrorsQuantidadeEquipamentos,
        setFormErrorsQuantidadeDeEquipamentos: setFormErrorsQuantidadeEquipamentos,
        // Rede Local
        answerRedeLocal: answerRedeLocal,
        onRedeLocalChange: onRedeLocal,
        formErrorsRedeLocal: formErrorsRedeLocal,
        setFormErrorsRedeLocal: setFormErrorsRedeLocal,
        // Total De Profissionais
        answerTotalDeProfissionais: answerTotalProfissionais,
        onTotalDeProfissionaisChange: onTotalDeProfissionais,
        formErrorsTotalDeProfissionais: formErrorsTotalDeProfissionais,
        setFormErrorsTotalDeProfissionais: setFormErrorsTotalDeProfissionais,
        // Instrumentos E Materiais
        answerInstrumentosEMateriais: answerInstrumentosEMateriais,
        onInstrumentosEMateriaisChange: onInstrumentosEMateriais,
        formErrorsInstrumentosEMateriais: formErrorsInstrumentosEMateriais,
        setFormErrorsInstrumentosEMateriais: setFormErrorsInstrumentosEMateriais,
        // Linguas Ministradas
        answerLinguasMinistradas: answerLinguaMinistrada,
        onLinguasMinistradasChange: onLinguaMinistrada,
        formErrorsLinguasMinistradas: formErrorsLinguaMinistrada,
        setFormErrorsLinguasMinistradas: setFormErrorsLinguaMinistrada,
        // Reserva De Vagas
        answerReservaDeVagas: answerReservaDeVagas,
        onReservaDeVagasChange: onReservaDeVagas,
        formErrorsReservaDeVagas: formErrorsReservaDeVagas,
        setFormErrorsReservaDeVagas: setFormErrorsReservarDeVagas,
        // Orgaos Colegiados
        answerOrgaosColegiados: answerOrgaosColegiados,
        onOrgaosColegiadosChange: onOrgaosColegiados,
        formErrorsOrgaosColegiados: formErrorsOrgaosColegiados,
        setFormErrorsOrgaosColegiados: setFormErrorsOrgaosColegiados,
    }

    return (
        <EstruturaFisicaEscolarContext.Provider value={contextData}>
            {children}
        </EstruturaFisicaEscolarContext.Provider>
    )

} 
