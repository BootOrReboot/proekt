import { io } from "socket.io-client";

export default function test() {
  function test() {
    const sockets = io("ws://localhost:3001");
    sockets.on("data", (element) => {
      console.log(element);
    });
    ("<div>На ден 23.02.2024г. се одржа онлајн општински натпревар по хемија со присуство на делегат од ПМФ. На натпреварот учествуваа 13 ученици<div>( 6 од прва, 2 од втора и 5 ученика од трета година), а од нив 9 се пласираа на регионален натпревар.</div><div>Учениците ги менторираа професорките по хемија: Валентина Цветановска и Жаклина Димитровска и ги постигнаа следниве резултати:</div><div>Ученици од прва година:</div><div> 1. Катерина Алексовска ,3-та награда ,диплома</div> <div>2. Михаела Георгиевска,успешно учество ,пофалница</div><div>3.Невена Стефановска,успешно учество ,пофалница</div><div>4.Меланија Тасковска ,успешно учество ,пофалница</div><div>5.Кристијан Ценевски ,учество ,сертификат</div><div>6. Нина Милковска ,учество ,сертификат </div><div>Ученици од втора година: </div><div>1.Вања Костовска ,2-ра награда ,диплома</div><div>2. Димитар Стојановски ,2-ра награда диплома</div><div>Ученици од трета година:</div><div>1. Ева Симонова ,успешно учество ,пофалница</div><div>2.Нина Димитровска ,успешно учество ,пофалница</div> <div>3. Ведран Велиновски ,успешно учество ,пофалница</div> <div> 4. Дамјан Стоилковски ,учество сертификат </div><div> 5. Мила Пешовска ,учество ,сертификат</div></div>");
  }

  return (
    <>
      <div>Messages:</div>
      <input />
      <button onClick={test}>Submit</button>
    </>
  );
}
