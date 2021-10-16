import { atom } from 'jotai';

export const alertAtom = atom('')

export const readAlertAtom = atom(
    (get) => get(alertAtom)
)