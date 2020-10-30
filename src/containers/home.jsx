import React from "react";
import SearchList from "../components/SearchList";

function Home() {
  const [searchKey, setSearchKey] = React.useState("react");

  return (
    <div>
      <input
        type="text"
        value={searchKey}
        placeholder="Enter a message"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <SearchList searchKey={searchKey} />
      {/* <pre>
        <code>{responseData && JSON.stringify(responseData, null, 4)}</code>
      </pre> */}
    </div>
  );
}
export default Home;
