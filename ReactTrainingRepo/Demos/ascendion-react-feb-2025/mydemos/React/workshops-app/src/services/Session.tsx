import axios from "axios";
import ISession from "../models/ISession";

const getSessionsForWorkshop = async (workshopId: number) => {
    const response = await axios.get<ISession[]>(
        `https://workshops-server.onrender.com/workshops/${workshopId}/sessions`
    );

    return response.data;
};

const castVote = async (sessionId: number, voteType: "upvote" | "downvote") => {
    const response = await axios.put<ISession>(
        `https://workshops-server.onrender.com/sessions/${sessionId}/${voteType}`
    );

    return response.data;
};

const addSession = async (session: Omit<ISession, "id">) => {
    const response = await axios.post<ISession>(
        `https://workshops-server.onrender.com/sessions`,
        session,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export { getSessionsForWorkshop, castVote, addSession };