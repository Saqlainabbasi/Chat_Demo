import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { addUserToRoom, allRooms, createRoom, host } from "../utils/APIRoutes";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [rooms, setRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("current_user")) {
        console.log("No user found");
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("current_user")));
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      getAllRooms();
    }
  }, [currentUser]);
  async function getAllRooms() {
    const { data } = await axios.get(allRooms);
    setRooms(data.rooms);
  }
  const handleChatChange = async (chat) => {
    setCurrentChat(chat);
    let users = rooms.find((room) => room._id === chat._id).users;
    // user does not belong to the room
    if (!users.includes(currentUser._id)) {
      //add user to the database
      await axios
        .post(addUserToRoom, {
          room_id: chat._id,
          user_id: currentUser._id,
        })
        .then((res) => {
          if (res.data.success === false) {
            toast.error("User could not be added to the room");
            return;
          }
        });
    }
    socket.current.emit("join-room", chat._id);
  };
  const handleCreateRoom = async (room) => {
    // socket.current.emit("create-room", room);

    const { data } = await axios.post(createRoom, {
      ...room,
      user: currentUser._id,
    });
    console.log(data);
    if (data.success === true) {
      getAllRooms();
    }
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={rooms}
            changeChat={handleChatChange}
            createRoom={handleCreateRoom}
          />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
