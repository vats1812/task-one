import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Components/Card/Card";
import axios from "axios";
import "./App.css";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [assignment, setAssignment] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(
          "https://s3.amazonaws.com/open-to-cors/assignment.json"
        );

        const sortedAssignment = Object.entries(res.data.products).sort(
          (a, b) => b[1].popularity - a[1].popularity
        );

        setAssignment(sortedAssignment);
        setDisplayedItems(sortedAssignment.slice(0, 15));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAssignment(); // eslint-disable-next-line
  }, []); // Run once on component mount

  // Load more items when the user scrolls
  const loadMoreItems = () => {
    const nextItems = displayedItems.length + 15;
    setDisplayedItems(assignment.slice(0, nextItems));
    setProgress(displayedItems.length / 9.5);

    if (nextItems >= assignment.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="App">
      <nav>
        <div className="navbar">
          <h1>ZenTrades Task 1</h1>
        </div>
      </nav>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={5}
      />
      <InfiniteScroll
        dataLength={displayedItems.length}
        next={loadMoreItems}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={{
          paddingTop: "100px",
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {displayedItems.map((prod) => (
          <Card
            key={prod[1].id} // Assuming there's an 'id' property
            subcat={prod[1].subcategory}
            title={prod[1].title}
            price={prod[1].price}
            popularity={prod[1].popularity}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
