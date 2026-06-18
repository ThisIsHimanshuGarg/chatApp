
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useEffect, useRef } from "react";

const MessageArea = ({ messages, setMessages }) => {
  const { userId } = useParams();
  const { token, socketConnected, socketRef } = useSocket();

  const loginUser = JSON.parse(localStorage.getItem("user"));
  const bottomRef = useRef();

  const fetchMessages = async () => {
    try {
      const port = import.meta.env.VITE_API_URL;

      const res = await axios.get(
        `${port}/api/get-message/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.data);
      setMessages(res.data.data);
    } catch (error) {
      console.log(error.response || error);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchMessages();
    }
  }, [userId, token]);

  useEffect(() => {
    if (!socketRef?.current) return;

    const handleMessage = (msg) => {
      console.log("Socket Message:", msg);
      setMessages((prev) => [...prev, msg]);
    };

    socketRef.current.on("newMessage", handleMessage);

    return () => {
      socketRef.current.off("newMessage", handleMessage);
    };
  }, [socketConnected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((msg, index) => {
        const isMe =
          msg.senderId?._id === loginUser?._id ||
          msg.senderId === loginUser?._id;

        return (
          <div
            key={msg._id || index}
            className={`flex mb-3 ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg shadow max-w-[70%] ${
                isMe ? "bg-[#DCF8C6]" : "bg-white"
              }`}
            >
              {/* Text */}
              {msg.text && (
                <p className="text-gray-800 whitespace-pre-wrap">
                  {msg.text}
                </p>
              )}

              {/* Images */}
              {msg.imageUrl?.length > 0 &&
                msg.imageUrl.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="message"
                    className="rounded-lg mt-2 max-w-[250px]"
                  />
                ))}

              {/* Videos */}
              {msg.videoUrl?.length > 0 &&
                msg.videoUrl.map((video, i) => (
                  <video
                    key={i}
                    src={video}
                    controls
                    className="rounded-lg mt-2 max-w-[250px]"
                  />
                ))}

              {/* Audio */}
              {msg.audioUrl?.length > 0 &&
                msg.audioUrl.map((audio, i) => (
                  <audio
                    key={i}
                    src={audio}
                    controls
                    className="mt-2 w-full"
                  />
                ))}

              {/* Time */}
              {msg.createdAt && (
                <p className="text-[10px] text-gray-500 text-right mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default MessageArea;
