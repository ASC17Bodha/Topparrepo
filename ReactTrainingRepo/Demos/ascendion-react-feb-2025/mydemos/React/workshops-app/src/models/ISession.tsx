type Level= "Basic" |"Interemdiate" | "Advanced";

interface ISession{
    id: number;
    name: string;
    workshopId: number;
    sequenceId: number;
    level: Level;
    speaker: string;
    duration: number;
    abstract: string;
    upvoteCount: number;
};

export type { Level, ISession as default };