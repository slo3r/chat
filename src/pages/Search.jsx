import React, { useState, useContext, useEffect } from "react";
import { AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";
import userImage from "../images/user.png";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

const Search = (props) => {
  const [isOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const handleSearch = async (searchValue) => {
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", searchValue),
      where("displayName", "<=", searchValue + "\uf8ff")
    );

    try {
      if (searchValue !== "") {
        const q = query(
          collection(db, "users"),
          where("displayName", ">=", searchValue),
          where("displayName", "<=", searchValue + "\uf8ff")
        );
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data());
          });
          setUser(users);
        });

      return unsubscribe;
    } else {
      setUser(null);
    }
    }catch (err) {
      setErr(true);
      console.log(err.message);
    }
  };

  const debouncedSearch = debounce(handleSearch, 100);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setUsername(inputValue);
    debouncedSearch(inputValue);
  };
  useEffect(() => {
    if (username.length == 0) {
      handleSearch();
      setUser(null);
    } else {
      handleSearch();
    }
  }, [username]);
  

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch(value);
    }
  };

  return (
    <div
      style={{ width: props.isOpen ? "400px" : "100px" }}
      className="userSearch"
    >
      {err && <span>User not found!</span>}
      <div className="searchResult">
        {user &&
          user.map((u) => (
            <div className="searchEntry" key={u.uid}>
              <img src={u.photoURL || userImage} />
              <p>{u.displayName}</p>
              <AiOutlineUserAdd size="30px" />
            </div>
          ))}
      </div>

      <div className="searchPanel">
        <div className="userSearchIcon" onClick={() => handleSearch(value)}>
          <AiOutlineSearch
            size="40px"
            style={{ marginLeft: "30px", marginRight: "30px" }}
          />
        </div>
        <input
          onKeyDown={handleKey}
          onChange={handleInputChange}
          value={username}
          placeholder="Search for an user"
          style={{ display: props.isOpen ? "unset" : "none" }}
          className="userSearchInput"
        ></input>
      </div>
    </div>
  );
};

export default Search;
