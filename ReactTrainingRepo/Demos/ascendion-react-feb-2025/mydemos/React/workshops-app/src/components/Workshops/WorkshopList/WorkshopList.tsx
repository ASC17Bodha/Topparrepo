import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import { LoadingSpinner } from "../../common/LoadingSpinner/loadingspinner";
import { ErrorAlert } from "../../common/ErrorAlert/errorAlert";
import Pagination from "../../common/Pagination/Pagination";
import Item from "./Item/Item";

import { getWorkshops } from "../../../services/Workshop";
import { IWorkshop } from "../../../models/IWorkshop";

const WorkshopsList = () => {
    const [loading, setLoading] = useState(true);
    const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const [filterKey, setFilterKey] = useState('');
    // const [filteredWorkshops, setFilteredWorkshops] = useState<IWorkshop[]>([]);

    // const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +(searchParams.get("page") || "1"); // Default to page 1
    const category = searchParams.get("category") || "";

    // fetching data when page, category etc. changes
    useEffect(
        // side-effect function (f)
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const workshops = await getWorkshops(page, category);

                    setLoading(false);
                    setWorkshops(workshops);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        // dependency array - when you pass an empty array, f will behave like componentDidMount, i.e. f executes AFTER the first render
        // []
        [page, category]
    );

    // in this case there is no asycn operation, and there is an extra render due to setting state - setFilteredWorkshops()
    // filtering logic side-effect -  filtering when filterKey, workshops change
    // useEffect(
    //     () => {
    //         setFilteredWorkshops(
    //             workshops.filter(
    //                 (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
    //             )
    //         );
    //     },
    //     [filterKey, workshops]
    // );

    // runs every time there is a render, and not only when filterKey, workshops changes
    // not efficient when workshops is a large array, and especially when workshops did not change, but the re-rendering was due to some other prop / state change
    const filteredWorkshops = useMemo(
        () => workshops.filter(
            (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
        ),
        [filterKey, workshops]
    );

    const next = (newPage: number) => {
        // when the new state depends on the current state, a better way to update the state is using the function form of the state setter
        // do not make use of page variable
        // setPage((p) => p + 1);
        // console.log( page );
        setSearchParams(
            {
                page: '' + newPage
            }
        );
    };

    const previous = (newPage: number) => {
        setSearchParams(
            {
                page: '' + newPage
            }
        );
    };

    return (
        <div>
            <h1>List of Workshops</h1>
            <hr />

            <div>
                <Pagination
                    page={page}
                    onPrevious={previous}
                    onNext={next}
                    disablePrevious={!(loading === false && error === null)}
                    disableNext={!(loading === false && error === null)}
                />
            </div>
            <div>
                <div className="btn-group my-3" role="group" aria-label="Filter by category">
                    <button type="button" className="btn btn-primary" onClick={() => setSearchParams({ category: '' })}>All</button>
                    <button type="button" className="btn btn-danger" onClick={() => setSearchParams({ category: 'frontend' })}>Frontend</button>
                    <button type="button" className="btn btn-warning" onClick={() => setSearchParams({ category: 'backend' })}>Backend</button>
                    <button type="button" className="btn btn-success" onClick={() => setSearchParams({ category: 'devops' })}>Devops</button>
                    <button type="button" className="btn btn-info" onClick={() => setSearchParams({ category: 'language' })}>Language</button>
                    <button type="button" className="btn btn-light" onClick={() => setSearchParams({ category: 'mobile' })}>Mobile</button>
                    <button type="button" className="btn btn-dark" onClick={() => setSearchParams({ category: 'database' })}>Database</button>
                </div>
            </div>
            <div>
                {/* uncontrolled component - you set up an initial value from filterKey, and then no connection between filterKey and the input value */}
                {/*defaultValue={filterKey}*/}

                {/* controlled component - you set up an initial value from filterKey, and then you connect filterKey and the input value */}
                <input
                    type="search"
                    className="form-control"
                    placeholder="Type to search by name"
                    value={filterKey}
                    onChange={(event) => setFilterKey(event.target.value)}
                />
                <div>
                    Workshops whose name has
                    <span className="text-primary"> {filterKey} </span> are shown.
                </div>
            </div>

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
                        <Row xs={1} md={3} lg={4}>
                            {filteredWorkshops.map((workshop, idx) => (
                                <Col className="my-3 d-flex" key={workshop.id}>
                                    {/* {...workshop} -> id, name, startDtate, endDate, location etc. are the props */}
                                    <Item {...workshop} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkshopsList;