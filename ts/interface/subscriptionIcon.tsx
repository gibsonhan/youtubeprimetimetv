import { Snippet } from "./subscriptionList";

export interface SubscriptionIcon extends Snippet {
    select: (id: any) => void,
    deselect: (id: any) => void
}