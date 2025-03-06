import { Theme } from "../../../models/utils";
import { Spinner } from "react-bootstrap";

 interface Props{
    variant?:Theme
};

export const LoadingSpinner = ({variant='primary'}:Props) => {
    return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" variant={variant}/>
        </div>
     );
}