import { atom } from 'jotai';

export const alertAtom = atom('')
export const writeAlertAtom = () => atom(
    null,
    (get, set, update) => { set(alertAtom, 'testing123') }
)

export const readAlertAtom = atom(
    (get) => get(alertAtom)
)