import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

export const DecryptText = ({ text, speed = 50, delay = 0 }: { text: string; speed?: number; delay?: number }) => {
    const [displayText, setDisplayText] = useState('');
    const [isDecrypted, setIsDecrypted] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let interval: any;
        let iteration = 0;

        const startDecryption = () => {
            interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    setIsDecrypted(true);
                }

                iteration += 1 / 3;
            }, speed);
        };

        const timeout = setTimeout(startDecryption, delay * 1000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [isInView, text, speed, delay]);

    return (
        <span ref={ref} className={isDecrypted ? 'text-black' : 'text-system-gray'}>
            {displayText || text}
        </span>
    );
};
