import React from 'react';
import Graph from './graph';

const StatsComparer = ({stats, friendStats, getStats, close}) => {
    return (
        <React.Fragment>

            <div className="stats__container">
                <div>
                    <h2 className="stats__title">{stats.response.epicUserHandle}</h2>
                </div>
                <div>
                    <h2 className="stats__title">{friendStats.response.epicUserHandle}</h2>
                </div>
            </div>
            <div className="stats">
                <div className="stats__close" onClick={close}>X</div>
                <Graph getStats={getStats} label="Matches Played"/>
                <Graph getStats={getStats} label="Wins"/>
                <Graph getStats={getStats} label="Kills"/>
                <Graph getStats={getStats} label="K/d"/>
                <Graph getStats={getStats} label="Top 3"/>
                <Graph getStats={getStats} label="Score"/>
            </div>
        </React.Fragment>
    )
}

export default StatsComparer;