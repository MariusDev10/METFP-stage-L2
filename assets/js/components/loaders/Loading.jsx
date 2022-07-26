import React from "react";
import '../../../styles/app.css';
import load from '../../../image/load.gif';

const Loading = () => {

    return (
        <>
            <div className="loader text-center">
                <div className="loader-inner">
                    <div className="lds-roller mb-3" id="test">
                        <img src={load} alt="" className="test" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Loading;