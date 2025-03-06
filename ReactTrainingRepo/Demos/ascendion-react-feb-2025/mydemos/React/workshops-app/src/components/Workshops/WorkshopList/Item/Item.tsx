import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IWorkshop } from "../../../../models/IWorkshop";
import FormattedDate from "../../../common/FormattedDate/FormattedDate";
import { useAppSelector } from "../../../../store";
import type { Theme,ThemeState } from "../../../../features/themeSlice";
import './Item.scss';

const Item = ({ id, name, category, imageUrl, location, startDate, endDate }: IWorkshop ) => {
    // whicever component is using some piece of the state needs to calls useSelector (or useAppSelector)
    // you need to pass the selector function
    // React-redux will make sure that this component will re-render only when theme.value changes - not on any other state change
    // we have defined the seletor inline below. Alternatively you can import from themeSlice and use it.
    const theme = useAppSelector(state => state.theme.value)

    return (
        <Card className="w-100 p-3" bg={theme}>
            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={imageUrl} alt={name} />
            </div>
            <Card.Body>
                <Card.Title>
                    {name} ({category})</Card.Title>
                <Card.Text>
                    <div>{location.address}, {location.city}, {location.state}</div>
                    <div>
                        <FormattedDate date={startDate} />
                        <span> - </span>
                        <FormattedDate date={endDate} />
                    </div>
                </Card.Text>
                <Link to={`/workshops/${id}`}>
                    <Button variant="primary">Know more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Item;