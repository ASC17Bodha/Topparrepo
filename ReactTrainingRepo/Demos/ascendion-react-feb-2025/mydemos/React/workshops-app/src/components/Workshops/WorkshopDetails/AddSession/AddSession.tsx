import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from "react-bootstrap"

import { addSession } from '../../../../services/Session';
import { Level } from '../../../../models/ISession';
interface Props {
    id: number
}

// uncontrolled components
const AddSession = ( { id } : Props) => {
    // sequenceIdRef.current = null
    // after the first render `current` will refer to the DOM node for the sequence ID input)
    const sequenceIdRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const speakerRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);
    const levelRef = useRef<HTMLSelectElement>(null);
    const abstractRef = useRef<HTMLTextAreaElement>(null);

    const [sequenceIdError, setSequenceIdError] = useState('')

    const validate = () => {
        let isValid = true;

        if( sequenceIdRef.current ) {
            const sequenceId = sequenceIdRef.current.value;
            let sequenceIdError = '';

            if( sequenceId === '' ) {
                sequenceIdError += 'Sequence ID cannot be empty.';
                isValid = false;
            }

            if( sequenceId !== '' && /^\d+$/.test(sequenceId) === false ) {
                sequenceIdError += 'Sequence ID must be a positive number';
                isValid = false;
            }

            setSequenceIdError(sequenceIdError);

            // do all other checks
            // ..

            return isValid;
        }
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement> ) => {
        // prevent browser form submssion
        event.preventDefault();

        if( sequenceIdRef.current && nameRef.current && speakerRef.current && durationRef.current && levelRef.current && abstractRef.current) {
            const session = {
                sequenceId: +sequenceIdRef.current.value,
                name: nameRef.current.value,
                speaker: speakerRef.current.value,
                duration: +durationRef.current.value,
                level: levelRef.current.value as Level,
                abstract: abstractRef.current.value,
                upvoteCount: 0,
                workshopId: id
            };

            console.log( session );

            if( validate() ) {
                // POST the new session information to create a new session
                try {
                    const newSession = await addSession( session );
                    alert('New session has been added');
                } catch(error) {
                    alert((error as Error).message);
                }
            } else {
                alert( 'Correct the mistakes in the form and submit again.' )
            }
        }
    }

    return (
        <div>
            <h1 className="d-flex justify-content-between align-items-center">
                Add a Session
                <Link to=".." className="btn btn-primary">List of sessions</Link>
            </h1>

            <hr />

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-4" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                        ref={sequenceIdRef}
                    />
                    <div className="text-danger">{sequenceIdError}</div>
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                        ref={nameRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                        ref={speakerRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                        ref={durationRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select aria-label="Level" ref={levelRef}>
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        ref={abstractRef}
                    />
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
}

export default AddSession;