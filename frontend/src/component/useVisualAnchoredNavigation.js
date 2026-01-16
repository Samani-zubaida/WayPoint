import { useEffect, useState } from "react";
import { getTurnNodes } from "../utils/getTurnNodes";
import { fetchLandmarks } from "../services/fetchLandmarks";
import { scoreLandmark } from "../utils/scoreLandmark";
import { buildInstruction } from "../utils/buildInstruction";

export const useVisualAnchoredNavigation = (routeLatLng) => {
    const [instructions, setInstructions] = useState([]);

    useEffect(() => {
        if (!routeLatLng) return;

        const build = async () => {
            const turns = getTurnNodes(routeLatLng);
            const results = [];

            for (const turn of turns) {
                const landmarks = await fetchLandmarks(turn.lat, turn.lon);

                const best = landmarks
                    .map((l) => ({ ...l, score: scoreLandmark(l) }))
                    .sort((a, b) => b.score - a.score)[0];

                results.push({
                    ...turn,
                    instruction: buildInstruction(turn, best),
                    landmark: best,
                });
            }

            setInstructions(results);
        };

        build();
    }, [routeLatLng]);

    return instructions;
};
