import { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import { LoadingSpinner } from '../../common/LoadingSpinner/loadingspinner';
import { ErrorAlert } from '../../common/ErrorAlert/errorAlert';

import { getWorkshopById } from '../../../services/Workshop';
import { IWorkshop } from '../../../models/IWorkshop';
import SessionsList from './SessionList/SessionList';
import AddSession from './AddSession/AddSession';
import { Route,Routes } from 'react-router';



interface Props {
    id: number
}

// EXERCISE: Check React Query, TanStack Query
const WorkshopDetails = ({ id } : Props) => {
    const [loading, setLoading] = useState(true);
    const [workshop, setWorkshop] = useState<IWorkshop | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        // side-effect function (f)
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const workshop = await getWorkshopById(id);

                    setLoading(false);
                    setWorkshop(workshop);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        []
    );

    return (
        <div>
            {loading && (
                <LoadingSpinner />
            )}

            {!loading && error && (
                <ErrorAlert error={error} />
            )}

            {!loading && !error && workshop && (
                <Row>
                    <Col xs={12} md={4}>
                        <Image
                            src={workshop.imageUrl}
                            alt={workshop.name}
                            fluid
                        />
                    </Col>
                    <Col xs={12} md={8}>
                        <h1>{workshop.name}</h1>
                        <hr />
                        <div dangerouslySetInnerHTML={{
                            __html: workshop.description
                        }}></div>
                    </Col>
                </Row>
            )}


            <div className="my-4">
                <Routes>
                    <Route path="" element={<SessionsList id={id} />} />
                    <Route path="/add" element={<AddSession id={id} />} />
                </Routes>
            </div>
        </div>

    );
}

export default WorkshopDetails;