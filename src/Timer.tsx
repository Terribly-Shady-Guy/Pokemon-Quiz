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
        
        const intervalId = setInterval(() => {
            let shouldTimeout = false;

            setSecondsLeft(seconds => {
                if (seconds <= 1) {
                    shouldTimeout = true;
                    return 0;
                }

                return seconds - 1;
            });

            if (shouldTimeout) {
                clearInterval(intervalId);
                onTimeoutEvent();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isDisabled]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return <time dateTime={`PT0H${minutes}M${seconds}S`} role="timer">{minutes}:{secondsFormatter.format(seconds)}</time>
}