import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: null,
    roomName: null,
    users: [],
    rooms: [],
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const chatIdSuffix = action.payload ? action.payload.uid : '';
        //console.log(state.user)
        return {
          user: action.payload,
          chatId: currentUser.uid > chatIdSuffix ? currentUser.uid + chatIdSuffix : chatIdSuffix + currentUser.uid,
          roomName: null,
          users: [],
        };
      case "JOIN_ROOM":
        return {
          ...state,
          roomName: action.payload,
        };
      case "CREATE_ROOM":
        return {
          ...state,
          rooms: [...state.rooms, action.payload],
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const handleJoinRoom = async (roomName) => {
    // Check if the room already exists
    const res = await getDoc(doc(db, "groupChats", roomName));
    // const existingRoom = state.rooms.find((room) => room.name === roomName);

    if (res.exists()) {
      // If the room already exists, join the room
      dispatch({ type: "JOIN_ROOM", payload: roomName });
      console.log("test")
    } else {
      // If the room does not exist, create a new room and join the room
      console.log("test-bad one")
      // const newRoom = { name: roomName, users: [currentUser] };
      try {
        const docRef = doc(db, "groupChats", roomName);
  
        await setDoc(docRef, {
          name: roomName,
          users: [currentUser.uid],
          messages: [],
        });
        // dispatch({ type: "CREATE_ROOM", payload: newRoom });
        dispatch({ type: "JOIN_ROOM", payload: roomName });
      } catch (error) {
        console.error("Error creating room:", error);
      }
    }
  };
  const fetchUser = async () => {
    if (state.user) {
      const userRef = doc(db, "users", state.user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const user = userDoc.data();
        const updatedUser = { ...state.user, photoURL: user.photoURL };
        dispatch({ type: "CHANGE_USER", payload: updatedUser });
        return updatedUser;
      }
    }
  };
  
  

  return (
    <ChatContext.Provider value={{ data: state, dispatch, handleJoinRoom }}>
      {children}
    </ChatContext.Provider>
  );
};
