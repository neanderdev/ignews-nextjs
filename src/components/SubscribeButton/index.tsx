import { signIn, useSession } from "next-auth/react";
import styled from "./styles.module.scss";

interface SubscribeButtonProps {
    priceId: string,
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const { data: session } = useSession();

    async function handleSubscribe() {
        if (!session) {
            signIn('github');
            return;
        }

        // criação da checkout session
        
    }

    return (
        <button
            type="button"
            className={styled.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}