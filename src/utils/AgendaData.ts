import firebase from "firebase/compat";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export const AgendaUtil = [
  {
    bairro: 'Flamengo',
    dias: [
      {
        date: 12312312,
        dia: '28/03',
        horarios: [
          {
            horario: '10:30',
            vagas: 2,
            vagasOcupadas: 0
          },
          {
            horario: '12:00',
            vagas: 2,
            vagasOcupadas: 0
          }
        ]
      },
      {
        date: 312321,
        dia: '28/03',
        horarios: [
          {
            horario: '10:30',
            vagas: 2,
            vagasOcupadas: 0
          },
          {
            horario: '12:00',
            vagas: 2,
            vagasOcupadas: 0
          },
          {
            horario: '14:00',
            vagas: 2,
            vagasOcupadas: 0
          }
        ]
      }
    ]
  }
]

export function getDayWeek(date: firebase.firestore.Timestamp) {
  return format(date.toDate(), 'eeee', { locale: ptBR });
}

export type HorarioProps = {
  horario: string;
  vagas: number;
  vagasOcupadas: number;

}

export type ListHorarioProps = HorarioProps[]

export type DiasProps = {
  date: firebase.firestore.Timestamp;
  diaString: string;
  horarios: ListHorarioProps;
}

export type ListDiasProps = DiasProps[]

export type AgendaDataProps = {
  idVehicle: string;
  bairro: string;
  dias: ListDiasProps;
}
