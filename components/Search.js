import React from "react";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
import { algoliaClient } from "../config/algolia";

const Search = () => {
  console.log("env", process.env.NEXT_PUBLIC_ALGOLIA_APP_ID);
  const Hit = ({ hit }) => (
    <div>
      <h3>{hit.lastName}</h3>
      <h3>{hit.firstName}</h3>
    </div>
  );

  return (
    <div>
      <InstantSearch searchClient={algoliaClient} indexName="dev_SSR">
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
};

export default Search;
