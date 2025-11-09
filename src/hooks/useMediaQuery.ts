import {useState, useEffect} from "react"

export function useMediaQuery(mediaQuery: string) {
    const getInitialMatch = () =>         typeof window !== "undefined"
            ? window.matchMedia(mediaQuery).matches
            : false;
    const [isMatchMedia, setIsMatchMedia] = useState(getInitialMatch);

    useEffect(() => {
        const currentSize = window?.matchMedia(mediaQuery);

        const handler = (e: MediaQueryListEvent) => setIsMatchMedia(e.matches);
        currentSize.addEventListener('change', handler);

        return () => currentSize.removeEventListener('change', handler);
    }, [mediaQuery]);
    return isMatchMedia;
}