export default function Home() {
  function test() {
    fetch("http://localhost:3000/api/testInsert")
      .then((res) => {
        return res.json();
      })
      .then((rez) => {
        console.log(rez.message);
      });
  }
  return (
    <div>
      <button onClick={test}>CLick to test</button>
    </div>
  );
}
