import React, {Fragment} from 'react';
import Lead from './Leads';
import Forms from  './Form';

export default function Dashboard() {
    return(
        <Fragment>
            <Forms />
            <Lead />
        </Fragment>
    )
};