import React from 'react';
import Head from "./head";

const Loader = (props) => {
    return props.loading
        ? <React.Fragment>
                <Head/>
                <p className="text loader-text">Loading...</p>
            </React.Fragment>
        : props.children;
}

export default Loader;