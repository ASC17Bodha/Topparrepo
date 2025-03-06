import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { LoadingSpinner } from "../../../common/LoadingSpinner/loadingspinner";
import { ErrorAlert } from "../../../common/ErrorAlert/errorAlert";
import Item from "./Item/Item";

import { getSessionsForWorkshop, castVote } from "../../../../services/Session";
import ISession from "../../../../models/ISession";

interface Props {
    id: number
}

const SessionsList = ( { id } : Props ) => {
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const sessions = await getSessionsForWorkshop(id);

                    setLoading(false);
                    setSessions(sessions);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        []
    );

    const vote = useCallback(
        async (
            sessionId: number,
            voteType: 'upvote' | 'downvote'
        ) => {
            alert(sessionId + ' ' + voteType);

            // call the service
            try {
                const updatedSession = await castVote(sessionId, voteType);
                setSessions(
                    sessions => sessions.map( s => s.id === updatedSession.id ? updatedSession : s )
                );
            } catch(error) {
                alert((error as Error).message);
            }
        },
        []
    );

    return (
        <div>
            <h1 className="d-flex justify-content-between align-items-center">
                List of Sessions
                <Link to="add" className="btn btn-primary">Add a session</Link>
            </h1>
            
            <hr />

            {/* we are ok with the default value for `variant` prop */}
            {loading && (
                <LoadingSpinner />
            )}

            {!loading && error && (
                <ErrorAlert error={error} />
            )}

            {!loading && !error && (
                <>
                    <div className="row">
                        <Row xs={1}>
                            {sessions.map((s, idx) => (
                                <Col className="my-3 d-flex" key={s.id}>
                                    <Item
                                        session={s}
                                        vote={vote}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </>
            )}
        </div>
    );
};

export default SessionsList;