import ISession from "../../../../../models/ISession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import './Item.scss';


type VoteFunction=(
    sessionId:number,
    voteType:"upvote" | "downvote",
)=>void;

interface Props{
    session:ISession;
    vote:VoteFunction;
}

const Item=({session,vote}:Props)=>{
    const {id,name,level,abstract,upvoteCount,speaker}=session;
    return(
        <div>
        <h2>{name}</h2>
        <div>by {speaker}</div>
        <div className="badge bg-primary">{level}</div>
        <p>{abstract}</p>
        <div>
            <FontAwesomeIcon icon={faThumbsUp} onClick={()=>vote(id,"upvote") }className='fa-thumbs-up me-2 fa-2x'/>
                <span>{upvoteCount}</span>
            <FontAwesomeIcon icon={faThumbsDown} onClick={()=>vote(id,"downvote")} className='fa-thumbs-down fa-2x'/>
        </div>
        </div>
    )
}
export default Item;