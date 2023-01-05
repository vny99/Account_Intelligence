import React, { useState, useEffect } from "react";
import "./search-dropdown.component.css";
import Ideasearch from "./search-ideas.component";
import BusinessChallengesSearch from "./search-challenges.component";
import IdeasAndBcSearch from "./search-ideas-and-bc.component";

export default function SearchDropdown() {
  const [search, setSearch] = useState("both");
  const [ideasContentVisible, setIdeasContentVisible] = useState(true);
  const [bcContentVisible, setBcContentVisible] = useState(false);
  const [bothContentVisible, setBothContentVisible] = useState(false);

  useEffect(() => {
    search === "ideas" ? setIdeasContentVisible(true) : setIdeasContentVisible(false);
    search=== "bc" ? setBcContentVisible(true) : setBcContentVisible(false);
    search === "both" ? setBothContentVisible(true) : setBothContentVisible(false);
  }, [search]);

  const handleOnChange = (e) => { setSearch(e.target.value); };

  return (
    <div className="container mt-3">
      <div className="mt-4" style={{"padding-left": "-20px"}}>
        <select className="form-select" value={search} onChange={handleOnChange} 
        style={{"width": "210px", "float":"right" , "transform":"translateX(-100%)"}}>
          <option selected value="both">Both</option>
          <option value="ideas">Ideas</option>
          <option value="bc">BusinessChallenges</option>
        </select>
      </div>

      {bothContentVisible && <IdeasAndBcSearch />}
      {ideasContentVisible && <Ideasearch />}
      {bcContentVisible && <BusinessChallengesSearch />} 

    </div>
  );
}