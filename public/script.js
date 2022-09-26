const txtRoomCode = document.getElementById("txtRoomCode");
const btnSubmitRoomCode = document.getElementById("submitRoomCode");
const p1El = document.getElementById("p1");
const p2El = document.getElementById("p2");
const winnerEl = document.getElementById("winner");

const selectP1Pick = document.getElementById("selectP1Pick");
const btnP1Submit = document.getElementById("btnP1Submit");
const selectP2Pick = document.getElementById("selectP2Pick");
const btnP2Submit = document.getElementById("btnP2Submit");

let mode = "";

p1El.style.display = "none";
p2El.style.display = "none";
winnerEl.style.display = "none";

// get user id from url query string
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

// untuk melakukan pengecekan status secara realtime
function checkStatusPeriodicaly() {
  const roomCode = txtRoomCode.value;
  const interval = setInterval(async () => {
    const response = await axios.get("/api/game/status/" + roomCode);

    if (response.data.status == true) {
      // kalo uda kedua belah pihak antar p1 dan p2 sudah memilih giliran makan stop interval
      clearInterval(interval);
      if (response.data.data.winnerUserId == userId) {
        alert("You Are The Winner !");
      } else if (response.data.data.winnerUserId == null) {
        alert("Draw !");
      } else {
        alert("You Are The Loser !");
      }
    }
  }, 2000);
}

// handle ketika btn join di klik
btnSubmitRoomCode.addEventListener("click", () => {
  const roomCode = txtRoomCode.value;
  axios
    .post("/api/game/join", {
      userId: userId,
      code: roomCode,
    })
    .then((response) => {
      alert(response.data.message);

      // untuk menentukan user tsb menjadi P1 atau P2
      mode = response.data.mode;
      if (response.data.mode == "master") {
        p1El.style.display = "block";
        p2El.style.display = "none";
      } else if (response.data.mode == "guest") {
        p2El.style.display = "block";
        p1El.style.display = "none";
      }
    });

  // untuk menentukan decission P1 dan P2
  btnP1Submit.addEventListener("click", () => {
    const pick = selectP1Pick.value;
    submitPick(pick);
  });
  btnP2Submit.addEventListener("click", () => {
    const pick = selectP2Pick.value;
    submitPick(pick);
  });
});

// ini untuk submit jawaban dari masing masing player
async function submitPick(pick) {
  const roomCode = txtRoomCode.value;
  const response = await axios.post("/api/game/submit", {
    code: roomCode,
    pick: pick,
    userId: userId,
  });
  const data = response.data;
  if (
    (data.status == "pending" && data.success == true) ||
    (data.status == "settled" && data.success == true)
  ) {
    checkStatusPeriodicaly();
  }
}
