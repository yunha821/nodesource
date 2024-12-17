// Socket.IO 이용
// socket.io 모듈 불러오기
const SocketIO = require("socket.io");

module.exports = (server) => {
  // 익스프레스 서버와 소켓 io 연동
  const io = SocketIO(server, { path: "/socket.io" });

  // 이벤트 리스너 추가
  io.on("connection", (socket) => {
    // 소켓을 통해 클라이언트 요청 객체 접근
    const req = socket.request;

    // 클라이언트 ip 알아내기
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("새로운 클라이언트 접속", ip, socket.id, req.ip);

    // 클라이언트로부터 메세지가 도착하면 발생
    socket.on("reply", (message) => {
      console.log(message.toString());
    });

    // 웹소켓 연결중 에러 발생시
    socket.on("error", (error) => {
      console.log(error);
    });

    // 클라이언트와 연결이 종료된 경우
    socket.on("disconnect", () => {
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });

    // 3초마다 모든 클라이언트에게 메세지 전송
    socket.interval = setInterval(() => {
      socket.emit("news", "Hello Socket.IO");
    }, 3000);
  });
};
