import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "./Socket";
import { ACTIONS } from "./Action";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";

function EditorPage() {
  const [clients, setClients] = useState([]);
  const codeRef = useRef(null);

  const Location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: Location.state?.username,
      });

      // Listen for new clients joining the chatroom
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          // this insure that new user connected message do not display to that user itself
          if (username !== Location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          // also send the code to sync
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    // cleanup
    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`roomIs is copied`);
    } catch (error) {
      console.log(error);
      toast.error("unable to copy the room Id");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  return (
    <div className="bg-red-300 min-h-screen flex flex-row">
      {/* Client panel */}
      <div className="w-1/4 bg-dark text-light p-4 flex flex-col">
        <img
          src="https://cdn.buttercms.com/resize=w:1600,h:900,fit:crop/3GK7ZHYZSluwToa6effL"
          alt="Logo"
          className="mt-3  mb-4"
          style={{ maxWidth: "150px", marginTop: "-43px" }}
        />
        <div className="text-2xl text-red-700">Collaboration-Realtime</div>
        <hr className="my-4" />

        {/* Client list container */}
        <div className="flex flex-col flex-grow overflow-auto">
          <h5 className="text-center">Members</h5>
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>

        <hr className="my-4" />
        {/* Buttons */}
        <div className="mt-auto">
          <button
            className="btn btn-success w-full mb-2"
            onClick={copyRoomId}
          >
            Copy Room ID
          </button>
          <button
            className="btn btn-danger w-full"
            onClick={leaveRoom}
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* Editor panel */}
      <div className="w-3/4 text-light p-4">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
}

export default EditorPage;
