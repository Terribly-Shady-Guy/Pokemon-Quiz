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

    const onTimeoutEvent = useEffectEvent(() => onTimeout());
    useEffect(() => {
        if (isDisabled) {
            return;
        }
        
        let shouldTimeout = false;
        const intervalId = setInterval(() => {
            if (shouldTimeout) {
                clearInterval(intervalId);
                onTimeoutEvent();
                return;
            }

            setSecondsLeft(seconds => {
                shouldTimeout = seconds <= 1;
                return seconds - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isDisabled]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return (
        <time dateTime={`PT0H${minutes}M${seconds}S`} role="timer">
            {minutes}:{secondsFormatter.format(seconds)}
        </time>
    );
}