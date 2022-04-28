import styles from "../../styles/Message.module.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";

export default function Message({ message, own, user, userr }) {
  const [more, setMore] = useState(true);
  const [change, setChange] = useState(true);
  const [res, setRes] = useState();

  //Counts each character except space
  useEffect(() => {
    let string = message.text;
    let count = 0;

    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i)) {
        count++;
      }
    }

    setRes(count);
  }, [message]);

  return (
    <div className={own ? "message own" : styles.message}>
      <div className={styles.messageTop}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {!own && (
            <img
              className={styles.messageImg}
              src={`${message.profile ? message.profile : "/image/nope.jpg"}`}
              alt=""
            />
          )}
          <p
            className={`messageText ${
              more ? "line-clamp-6" : "line-camp-none"
            }`}
          >
            {message.text}
          </p>

          {own && (
            <img
              className={styles.mesage}
              src={`${message.profile ? message.profile : "/image/nope.jpg"}`}
              alt=""
            />
          )}
        </div>

        <div className="messageBottom pl-11 flex space-x-5 items-center">
          <div>{format(message.createdAt)}</div>

          {res > 140 && (
            <div>
              {change && more ? (
                <h1
                  onClick={() => setMore(false)}
                  className="text-sm cursor-pointer text-blue-500 "
                >
                  read more ...
                </h1>
              ) : (
                <h1
                  onClick={() => setMore(true)}
                  className="text-sm cursor-pointer text-blue-500 "
                >
                  truncate...
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
