import Head from "next/head";
import React from "react";
import CreateUser from "../components/CreateUser";
import Search from "../components/Search";

const Home = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      <CreateUser />
      <h1>SEARCH</h1>
      <Search />
    </div>
  );
};
export default Home;
