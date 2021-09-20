import React, { useState, useContext, useRef } from 'react'
import { FunctContext } from '../utils/context';
import { dichotomy } from '../utils/dichotomy';

const defA = -1,
      defB = -0.25,
      defX0 = -0.5,
      defEpsilon = 1e-4;

const RANGE_EPSILON = 1e-10;

const DichotomyUI = () => {
    const [ epsilon, setEpsilon ] = useState(defEpsilon);

    // using refs to enable negative values input 
    const aInputRef = useRef<HTMLInputElement>(null);
    const bInputRef = useRef<HTMLInputElement>(null);
    const x0InputRef = useRef<HTMLInputElement>(null);

    const [ errMessage, setErrMessage ] = useState('');
    const [ res, setRes ] : [ null | number, any ] = useState(null);

    const { f } = useContext(FunctContext);

    const handleDichotomy = () => {
        let x0 = x0InputRef.current!.valueAsNumber,
            a = aInputRef.current!.valueAsNumber,
            b = bInputRef.current!.valueAsNumber;

        try {
            setErrMessage('');
            setRes(dichotomy(x0, a, b, epsilon, f));
        } catch (e : any) {
            setErrMessage(e.message);
        }
    }

    return (
        <>
            <form className="d-flex flex-column align-items-center mb-5" onSubmit={(e) => e.preventDefault()}>
                <h3 className="mb-4">Select x range [a, b]:</h3>

                <div className="row g-3 align-items-center mb-4">
                    <div className="col-auto">
                        <label htmlFor="range-a" className="col-form-label">a:</label>
                    </div>
                    <div className="col-auto me-5">
                        <input
                            defaultValue={defA}
                            ref={aInputRef}
                            step={RANGE_EPSILON}
                            type="number" id="range-a" className="form-control"
                        />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="range-b" className="col-form-label">b:</label>
                    </div>
                    <div className="col-auto">
                        <input
                            defaultValue={defB}
                            ref={bInputRef}
                            step={RANGE_EPSILON}
                            type="number" id="range-b" className="form-control"
                        />
                    </div>
                </div>

                <div className="row g-3 align-items-center mb-4">
                    <div className="col-auto">
                        <label htmlFor="range-epsilon" className="col-form-label">Select epsilon:</label>
                    </div>
                    <div className="col-auto me-5">
                        <input
                            value={epsilon}
                            onChange={e => setEpsilon(e.target.valueAsNumber)}
                            step={defEpsilon}
                            min={0}
                            type="number" id="range-epsilon" className="form-control"
                        />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="x0" className="col-form-label">Set x0:</label>
                    </div>
                    <div className="col-auto me-5">
                        <input
                            defaultValue={defX0}
                            ref={x0InputRef}
                            step={defEpsilon}
                            type="number" id="x0" className="form-control"
                        />
                    </div>
                </div>

                <button
                    onClick={handleDichotomy}
                    type="button" className="btn btn-success px-5"
                >
                    Run
                </button>
            </form>

            { errMessage
            ? (<div className="alert alert-danger" role="alert">
                    Error: { errMessage }
                </div>)
            : res && (<div className="alert alert-success" role="alert">
                    x* = { res }
                </div>)}
        </>
    )
}

export default DichotomyUI;