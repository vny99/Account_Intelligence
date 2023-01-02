import React, { useState } from "react";
import "./search-dropdown.component.css";
import Ideasearch from "./search-ideas.component";
import BusinessChallengesSearch from "./search-challenges.component";

export default function SearchDropdown() {
  const [search, setSearch] = useState("ideas");
  const [ideasContentVisible, setIdeasContentVisible] = useState(true);
  const [businesschallengesContentVisible, setBusinesschallengesContentVisible] = useState(false);

  const handleOnChange = (e) => {
    setSearch(e.target.value === "ideas" ? "ideas" : "businesschallenges");
    let localSearch = e.target.value === "ideas" ? "ideas" : "businesschallenges"
    localSearch === "businesschallenges" ?
    <div>
      {setBusinesschallengesContentVisible(true)}
      {setIdeasContentVisible(false)}
    </div>
    :
    <div>
      {setBusinesschallengesContentVisible(false)}
      {setIdeasContentVisible(true)}
    </div>
  };

  return (
    <div className="container mt-3">
      <div className="mt-4" style={{"padding-left": "-20px"}}>
        <select className="form-select" value={search} onChange={handleOnChange} style={{"width": "210px", "float":"right" , "transform":"translateX(-100%)"}}>
          <option selected value="ideas">Ideas</option>
          <option value="businesschallenges">BusinessChallenges</option>
        </select>
      </div>

      {ideasContentVisible && <Ideasearch />}
      {businesschallengesContentVisible && <BusinessChallengesSearch />}

    </div>
  );
}