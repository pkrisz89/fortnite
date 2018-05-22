import React from 'react';

const calcPercentage = (val1, val2) => {
    const total = parseFloat(val1) + parseFloat(val2);
    return (val) => Math.round(parseFloat(val) / total * 100)
}

const getBackground = (val1, val2) => val1 >= val2
    ? 'green'
    : 'red';

const Graph = ({getStats, label}) => {
    const stat1 = getStats("stats", label);
    const stat2 = getStats("friendStats", label);
    const percent1 = calcPercentage(stat1, stat2)(stat1);
    const percent2 = calcPercentage(stat1, stat2)(stat2);

    return (
        <div className="stats__container">
            <div className="stats__col--big stats__col--right">
                <div
                    className="stats__bar stats__col--right stats__bar--small-font"
                    style={{
                    width: `${percent1}%`,
                    background: getBackground(percent1, percent2)
                }}>{stat1}
                    ({percent1}
                    %)</div>
            </div>
            <div className="stats__col--small stats__bar">{label}</div>
            <div className="stats__col--big stats__col--left">
                <div
                    className="stats__bar stats__col--left stats__bar--small-font"
                    style={{
                    width: `${percent2}%`,
                    background: getBackground(percent2, percent1)
                }}>{stat2}
                    ({percent2}
                    %)</div>
            </div>
        </div>
    )
};

export default Graph;