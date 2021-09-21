import React, { useState, useRef, useContext } from 'react'
import { FunctContext } from '../utils/context';
import iteration from '../utils/iteration';

const defA = -1,
      defB = 1,
      defX0 = 0.1,
      defEpsilon = 1e-4;

const RANGE_EPSILON = 1e-10;


const IterationUI = () => {
    // using refs to enable negative values input 
    const aInputRef = useRef<HTMLInputElement>(null);
    const bInputRef = useRef<HTMLInputElement>(null);
    const x0InputRef = useRef<HTMLInputElement>(null);

    const [ epsilon, setEpsilon ] = useState(defEpsilon);
    const [ errMessage, setErrMessage ] = useState('');
    const [ res, setRes ] : [ null | number, any ] = useState(null);

    const { sigma, sigmaStr, maxModDerSig } = useContext(FunctContext);

    const handleIteration = () => {
        let x0 = x0InputRef.current!.valueAsNumber,
            a = aInputRef.current!.valueAsNumber,
            b = bInputRef.current!.valueAsNumber;

        try {
            setErrMessage('');
            setRes(iteration(x0, a, b, epsilon, sigma, maxModDerSig));
        } catch (e : any) {
            setErrMessage(e.message);
        }
    }

    return (
        <>
            <form className="d-flex flex-column align-items-center" onSubmit={(e) => e.preventDefault()}>
                <h3 className="mb-4">Sigma: { sigmaStr }</h3>

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
                        <label htmlFor="epsilon" className="col-form-label">Select epsilon:</label>
                    </div>
                    <div className="col-auto me-5">
                        <input
                            value={epsilon}
                            onChange={e => setEpsilon(e.target.valueAsNumber)}
                            step={RANGE_EPSILON}
                            min={0}
                            type="number" id="epsilon" className="form-control"
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
                    onClick={handleIteration}
                    type="button" className="btn btn-success px-5 mb-5"
                >
                    Run
                </button>
            </form>

            { errMessage
            ? (<div className="alert alert-danger" role="alert">
                    Error: { errMessage }
                </div>)
            : res != null && (<div className="alert alert-success" role="alert">
                    x* = { res }
                </div>)}
        </> 
    )
}

export default IterationUI;