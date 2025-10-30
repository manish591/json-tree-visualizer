import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
	const [isMatched, setIsMatched] = useState(false);

	useEffect(() => {
		function isQueryMatched() {
			const matches = matchMedia(query).matches;
			setIsMatched(matches);
		}

		isQueryMatched();

		window.addEventListener("resize", isQueryMatched);

		return () => window.removeEventListener("resize", isQueryMatched);
	}, [query]);

	return isMatched;
}
