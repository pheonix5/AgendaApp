import firebase from "firebase/compat";
import "firebase/firestore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CardAgendaProps } from "@/app/components/cardAgenda/cardAgenda";

export const AgendaUtil = [
  {
    bairro: "Flamengo",
    dias: [
      {
        date: 12312312,
        dia: "28/03",
        horarios: [
          {
            horario: "10:30",
            vagas: 2,
            vagasOcupadas: 0,
          },
          {
            horario: "12:00",
            vagas: 2,
            vagasOcupadas: 0,
          },
        ],
      },
      {
        date: 312321,
        dia: "28/03",
        horarios: [
          {
            horario: "10:30",
            vagas: 2,
            vagasOcupadas: 0,
          },
          {
            horario: "12:00",
            vagas: 2,
            vagasOcupadas: 0,
          },
          {
            horario: "14:00",
            vagas: 2,
            vagasOcupadas: 0,
          },
        ],
      },
    ],
  },
];

function createTimestamp(
  seconds: number,
  nanoseconds: number
): firebase.firestore.Timestamp {
  return new firebase.firestore.Timestamp(seconds, nanoseconds);
}

export const AgendamentosFakes = [
  {
    id: "1",
    status: "agendado",
    idVihicle: "M2CzPeM6OP81NKgs89fA",
    diaAgendamento: "03/08/2024",
    tipoServico: "Clareamento",
    userAgendamento: {
      cpf: "376.627.270-50",
      nome: "Lucas Felix ",
      cep: "24903-465",
      bairro: "Flamengo",
      situacaoAgenda: "agendado",
      telefone: "(61) 99441-6449",
      email: "lucas@teste.com",
      userId: "0gQ2uANqnBbXprNmCxWRkwY4K312",
    },
    date: createTimestamp(1722654000, 577000000),
    diaSemana: "sábado",
    horaAgendamento: "14:00",
  },
  {
    id: "2",
    status: "atendido",
    idVihicle: "M2CzPeM6OP81NKgs89fA",
    diaAgendamento: "03/08/2024",
    tipoServico: "Clareamento",
    userAgendamento: {
      cpf: "376.627.270-50",
      nome: "Lucas Felix ",
      cep: "24903-465",
      bairro: "Flamengo",
      situacaoAgenda: "atendido",
      telefone: "(61) 99441-6449",
      email: "lucas@teste.com",
      userId: "0gQ2uANqnBbXprNmCxWRkwY4K312",
    },
    date: createTimestamp(1722654000, 577000000),
    diaSemana: "sábado",
    horaAgendamento: "14:00",
  },
  {
    id: "3",
    status: "cancelado",
    idVihicle: "M2CzPeM6OP81NKgs89fA",
    diaAgendamento: "03/08/2024",
    tipoServico: "Clareamento",
    userAgendamento: {
      cpf: "376.627.270-50",
      nome: "Lucas Felix ",
      cep: "24903-465",
      bairro: "Flamengo",
      situacaoAgenda: "cancelado",
      telefone: "(61) 99441-6449",
      email: "lucas@teste.com",
      userId: "0gQ2uANqnBbXprNmCxWRkwY4K312",
    },
    date: createTimestamp(1722654000, 577000000),
    diaSemana: "sábado",
    horaAgendamento: "14:00",
  },
  {
    id: "4",
    status: "confirmado",
    idVihicle: "M2CzPeM6OP81NKgs89fA",
    diaAgendamento: "03/08/2024",
    tipoServico: "Clareamento",
    userAgendamento: {
      cpf: "376.627.270-50",
      nome: "Lucas Felix ",
      cep: "24903-465",
      bairro: "Flamengo",
      situacaoAgenda: "confirmado",
      telefone: "(61) 99441-6449",
      email: "lucas@teste.com",
      userId: "0gQ2uANqnBbXprNmCxWRkwY4K312",
    },
    date: createTimestamp(1722654000, 577000000),
    diaSemana: "sábado",
    horaAgendamento: "14:00",
  },
];

export function getDayWeek(date: firebase.firestore.Timestamp) {
  return format(date.toDate(), "eeee", { locale: ptBR });
}

export function getDayWeekDate(date: Date) {
  return format(date, "eeee", { locale: ptBR });
}

export function formatData(date: firebase.firestore.Timestamp) {
  return format(date.toDate(), "dd/MM/yyyy", { locale: ptBR });
}

export function formatDataDate(date: Date) {
  return format(date, "dd/MM/yyyy", { locale: ptBR });
}

export type HorarioProps = {
  horario: string;
  vagas: number;
  vagasOcupadas: number;
};

export type ListHorarioProps = HorarioProps[];

export type DiasProps = {
  date: firebase.firestore.Timestamp;
  diaString: string;
  horarios: ListHorarioProps;
};

export type ListDiasProps = DiasProps[];

export type AgendaDataProps = {
  idVehicle: string;
  bairro: string;
  dias: ListDiasProps;
};
