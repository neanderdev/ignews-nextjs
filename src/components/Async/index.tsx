import { useEffect, useState } from "react";

export function Async() {
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsButtonVisible(true)
        }, 1000)
    }, []);

    return (
        <div>
            <h1>Dicas de testes assíncronos</h1>
            {isButtonVisible && <button>Button</button>}
        </div>
    )
}