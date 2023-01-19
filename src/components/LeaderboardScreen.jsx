import React, { useEffect, useState } from "react";
import { query, orderBy, collection, limit, getDocs } from "firebase/firestore";
import ConnectToDatabase from "../assets/js/connectToDatabase";
import GlowingWaldo from "./GlowingWaldo";
import "../assets/css/Leaderboard.css";

// Connect to dabase and get reference to users
const db = ConnectToDatabase();
const usersRef = collection(db, "users");

// eslint-disable-next-line react/prop-types
function Leaderboard({ goToStartScreen }) {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Build query for getting top 20 fastest players
    const q = query(
      usersRef,
      orderBy("hours"),
      orderBy("minutes"),
      orderBy("seconds"),
      limit(20)
    );

    // Build a leaderboard data array for setting to the state
    const boardData = (async () => {
      const querySnapshot = await getDocs(q);
      const data = [];
      let rank = 1;
      querySnapshot.forEach((u) => {
        const user = u.data();
        data.push({ rank, user });
        rank += 1;
      });
      return data;
    })();
    boardData.then((data) => setLeaderboardData(data));
  }, []);

  return (
    <div className="LeaderboardScreen App">
      <GlowingWaldo classList="svgGlow" w="100" h="100" />
      <h1 className="instructions glow">
        You&apos;re score has been submitted!
      </h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((row) => {
            return (
              <tr>
                <td>{row.rank}</td>
                <td>{row.user.name}</td>
                <td>{`${row.user.hours}:${row.user.minutes}:${row.user.seconds}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" className="again" onClick={goToStartScreen}>
        Play Again?
      </button>
    </div>
  );
}

export default Leaderboard;
