import {format} from "date-fns/format";

interface Props {
    date?: Date|string|number;
    dateFormat?: string;
};

const FormatDate=({date=new Date(),dateFormat="PPP"}:Props) => {
    try{
        return (
            <span>{format(new Date(date), dateFormat)}</span>
        );
    }
    catch(error){
        return (
            <span>Invalid Date</span>
        );
    }
}

export default FormatDate;