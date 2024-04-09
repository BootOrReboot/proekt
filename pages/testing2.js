import { io } from "socket.io-client";

export default function test() {
  function test() {
    const sockets = io("ws://localhost:3001");
    sockets.on("data", (element) => {
      console.log(element);
    });
  }

  return (
    <>
      <div>Messages:</div>
      <input />
      <button onClick={test}>Submit</button>
    </>
  );
}
