import {useState, useEffect} from "react"

export function useMediaQuery(mediaQuery: string) {
    const [isMatchMedia, setIsMatchMedia] = useState(() => window?.matchMedia(mediaQuery).matches);

    useEffect(() => {
        const currentSize = window?.matchMedia(mediaQuery);

        const handler = (e: MediaQueryListEvent) => setIsMatchMedia(e.matches);
        currentSize.addEventListener('change', handler);

        return () => currentSize.removeEventListener('change', handler);
    }, [mediaQuery]);
    return isMatchMedia;
}