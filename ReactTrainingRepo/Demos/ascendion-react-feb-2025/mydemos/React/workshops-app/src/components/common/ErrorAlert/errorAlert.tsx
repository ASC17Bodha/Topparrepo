import  { Alert } from "react-bootstrap";
import { Theme } from "../../../models/utils";

interface props{
    error?:Error;
    variant?:Theme;
};

export const ErrorAlert = ({error=new Error('something went wrong'),variant="danger"}:props) => {
    return (
        <Alert variant={variant}>
            {error.message}
        </Alert>
     );
}