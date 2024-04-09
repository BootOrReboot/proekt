export default function test() {
  const sentMes = () => {
    fetch("http://localhost:3000/api/testInsert")
      .then((res) => {
        return res.json();
      })
      .then((rez) => {
        console.log(rez.message);
      });
  };
  return (
    <>
      <div>Messages:</div>
      <input />
      <button onClick={sentMes}>Submit</button>
    </>
  );
}
