import { atom } from 'jotai';

export const alertAtom = atom('')
export const signedInAtom = atom(false)
export const readAlertAtom = atom(
    (get) => get(alertAtom)
)