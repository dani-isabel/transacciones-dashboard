import {useState, useEffect} from "react"

export function useMediaQuery(mediaQuery: string) {
    const [isMatchMedia, setIsMatchMedia] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(mediaQuery).matches;
    });
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const currentSize = window.matchMedia(mediaQuery);
        setIsMatchMedia(currentSize.matches);

        const handler = (e: MediaQueryListEvent) => setIsMatchMedia(e.matches);
        currentSize.addEventListener('change', handler);

        return () => currentSize.removeEventListener('change', handler);
    }, [mediaQuery]);
    
    return isMounted ? isMatchMedia : false;
}