import React, { useState } from 'react'

const defA = 1,
      defB = 2,
      defEpsilon = 1e-4;

const RANGE_EPSILON = 1e-10;

const DichotomyUI = () => {
    const [ a, setA ] = useState(defA);
    const [ b, setB ] = useState(defB);
    const [ epsilon, setEpsilon ] = useState(defEpsilon);

    return (
        <form className="d-flex flex-column align-items-center">
            <h3 className="mb-4">Select x range [a, b]:</h3>

            <div className="row g-3 align-items-center mb-4">
                <div className="col-auto">
                    <label htmlFor="range-a" className="col-form-label">a:</label>
                </div>
                <div className="col-auto me-5">
                    <input
                        value={a}
                        onChange={e => setA(e.target.valueAsNumber)}
                        step={RANGE_EPSILON}
                        max={b}
                        type="number" id="range-a" className="form-control"
                    />
                </div>

                <div className="col-auto">
                    <label htmlFor="range-b" className="col-form-label">b:</label>
                </div>
                <div className="col-auto">
                    <input
                        onChange={e => setB(e.target.valueAsNumber)}
                        step={RANGE_EPSILON}
                        min={a}
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
                        type="number" id="range-epsilon" className="form-control"
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

export default DichotomyUI;