import styled from "./styles.module.scss";

interface SubscribeButtonProps {
    priceId: string,
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    return (
        <button
            type="button"
            className={styled.subscribeButton}
        >
            Subscribe now
        </button>
    );
}