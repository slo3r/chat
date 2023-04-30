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
import { AuthContext } from "../context/AuthContext";

const Search = (props) => {
  const [isOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

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
    if (!searchValue) return; 
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

  const handleSelect = async (selectedUser) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;
    console.log("currentUser.uid:", currentUser.uid);
    console.log("selectedUser.uid:", selectedUser.uid);
    console.log("combinedId:", combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
  
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
  
        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
  
    setUser(null);
    setUsername("");
  };
  return (
    <div
      style={{ width: props.isOpen ? "400px" : "100px" }}
      className="userSearch"
    >
      {err && <span>User not found!</span>}
      <div style={{ display: props.isOpen ? "unset" : "none" }} className="searchResult">
        {user &&
          user.map((u) => (
            <div className="searchEntry" onClick={() => handleSelect(u)} key={u.uid}>
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
