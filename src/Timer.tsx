import { useState, useEffect, useEffectEvent } from "react";

const secondsFormatter = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 2,
});

interface TimerProps {
    timeoutSeconds: number
    onTimeout: () => void
    isDisabled: boolean
}

export function Timer({ timeoutSeconds, onTimeout, isDisabled = false }: TimerProps) {
    const [secondsLeft, setSecondsLeft] = useState<number>(timeoutSeconds);
    const shouldTimeout = secondsLeft <= 0;

    const onTimeoutEvent = useEffectEvent(() => onTimeout());
    useEffect(() => {
        if (isDisabled) {
            return;
        }
        
        if (shouldTimeout) {
            onTimeoutEvent();
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsLeft(seconds => seconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isDisabled, shouldTimeout]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div role="timer">
            {minutes}:{secondsFormatter.format(seconds)}
        </div>
    );
}