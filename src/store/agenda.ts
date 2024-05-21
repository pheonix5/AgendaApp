import { AgendaDataProps } from '@/utils/AgendaData'
import { create } from 'zustand'

type AgendaStoreProps = {
  agendaAll: AgendaDataProps | null
  setAgendaAll: (agenda: AgendaDataProps | null) => void
}

export const useAgendaStore = create<AgendaStoreProps>((set) => ({
  agendaAll: null,
  setAgendaAll: (agendaAll) => set({ agendaAll }),
}))