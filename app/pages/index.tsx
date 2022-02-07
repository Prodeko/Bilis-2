import type { NextPage } from "next";
import Leaderboard from "../components/Leaderboard";

const Home: NextPage = () => {
  return (
    <div className='ml-8 py-4 flex flex-col h-screen content-center'>
      <h1 className='text-9xl font-bold'>Biliskilke 2.0</h1>
      <div className='flex flex-grow justify-around p-10'>
        <Leaderboard />
        <Leaderboard />
      </div>
    </div>
  );
};

export default Home;
