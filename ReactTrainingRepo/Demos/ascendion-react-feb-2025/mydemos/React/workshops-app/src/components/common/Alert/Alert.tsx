import React from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export const AlertMessage = () => {
    const [show, setShow] = React.useState(true);
    return ( 
        <>
        {show && (<Alert
    variant='warning'
    onClose={() => setShow(false)}
    dismissible>
      <Alert.Heading>Note on react version</Alert.Heading>
      <p>The current version of react is version 19</p>

    </Alert>)}
        </>
     );
};
 
