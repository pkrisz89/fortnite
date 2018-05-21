import React from 'react';

const StatsComparer = ({stats, friendStats, getStats}) => {
    return (
        <React.Fragment>

            <div className="stats__container">
                <div>
                    <h1>{stats.response.epicUserHandle}</h1>
                    <p>{getStats("stats", "Matches Played")}</p>
                    <p>{getStats("stats", "Wins")}</p>
                    <p>{getStats("stats", "Kills")}</p>
                    <p>
                        {getStats("stats", "K/d")}</p>
                    <p>
                        {getStats("stats", "Top 3")}</p>
                    <p>
                        {getStats("stats", "Score")}</p>
                </div>

                <div>
                    <p>Name</p>
                    <p>Matches played</p>
                    <p>Wins</p>
                    <p>Kills</p>
                    <p>Kill/Death</p>
                    <p>Top3</p>
                    <p>Score</p>
                </div>

                <div>
                    <h1>{friendStats.response.epicUserHandle}</h1>
                    <p>
                        {getStats("friendStats", "Matches Played")}
                    </p>
                    <p>
                        {getStats("friendStats", "Wins")}</p>
                    <p>
                        {getStats("friendStats", "Kills")}</p>
                    <p>
                        {getStats("friendStats", "K/d")}</p>
                    <p>
                        {getStats("friendStats", "Top 3")}</p>
                    <p>
                        {getStats("friendStats", "Score")}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StatsComparer;