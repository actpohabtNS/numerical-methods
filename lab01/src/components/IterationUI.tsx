import React, { useState, useRef } from 'react'

const defA = 1,
      defB = 2,
      defX0 = 1.5,
      defEpsilon = 1e-4;

const RANGE_EPSILON = 1e-10;


const IterationUI = () => {
    // using refs to enable negative values input 
    const aInputRef = useRef<HTMLInputElement>(null);
    const bInputRef = useRef<HTMLInputElement>(null);
    const x0InputRef = useRef<HTMLInputElement>(null);

    const [ epsilon, setEpsilon ] = useState(defEpsilon)

    return (
        <form className="d-flex flex-column align-items-center">
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
                        step={defEpsilon}
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
                type="submit" className="btn btn-success px-5"
            >
                Run
            </button>
        </form> 
    )
}

export default IterationUI;