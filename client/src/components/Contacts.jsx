import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat, createRoom }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [roomTitle, setRoomTitle] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    let data = "";
    async function fetchData() {
      data = await JSON.parse(localStorage.getItem("current_user"));
      setCurrentUserName(data.username);
    }
    fetchData();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const handleChange = (e) => {
    setRoomTitle(e.target.value);
  };
  return (
    <>
      <Container>
        <div className="brand">
          <h3>Rooms</h3>
        </div>
        <div className="contacts">
          {contacts
            .filter((item) => item.type === "public")
            .map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h3>{contact.title}</h3>
                  </div>
                </div>
              );
            })}
        </div>
        <div>
          <form
            onSubmit={() => createRoom({ title: roomTitle, type: "public" })}
          >
            <input
              type="text"
              placeholder="Room Name"
              onChange={handleChange}
            />
            <button disabled={roomTitle === ""}>Create Room</button>
          </form>
        </div>
        <div className="brand">
          <h3>Private Chat</h3>
        </div>
        <div className="contacts">
          {contacts
            .filter((item) => item.type === "private")
            .map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h3>{contact.title}</h3>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64}`} alt="avatar" />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 30% 10% 30% 10%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 3rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      overflow-y: scroll;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  input {
    // background-color: ;
    padding: 10px;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: black;
    width: 50%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 6px;
    border: none;
    margin-left: 5px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
