console.log("Playlist Builder startar...");

const form = document.querySelector("#track-form") as HTMLFormElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const durationInput = document.querySelector("#duration") as HTMLInputElement;
const list = document.querySelector("#list") as HTMLUListElement;
const totalEl = document.querySelector("#total") as HTMLSpanElement;

type Track = {
  title: string;
  duration: number;
};

const tracks: Track[] = [];

function parseDuration(input: string): number | null {
  const parts = input.split(":");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  if (isNaN(minutes) || isNaN(seconds) || seconds < 0 || seconds >= 60)
    return null;
  return minutes * 60 + seconds;
}

console.log(parseDuration("03:45"));

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

console.log(formatDuration(225));

function render() {
  list.innerHTML = "";
  let totalSeconds = 0;

  tracks.forEach((track) => {
    const li = document.createElement("li");
    li.textContent = `${track.title} (${formatDuration(track.duration)})`;
    list.appendChild(li);
    totalSeconds += track.duration;
  });

  totalEl.textContent = formatDuration(totalSeconds);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim(); // 1. Läs titel och längd
  const duration = parseDuration(durationInput.value.trim()); // 2. Använd parseDuration

  if (!title || duration === null) {
    alert("Ogiltig inmatning");
    return;
  }

  const track: Track = { title, duration }; // 3. Skapa ett Track-objekt
  tracks.push(track); // 4. Lägg till i tracks-arrayen
  titleInput.value = ""; // 5. Töm formuläret
  durationInput.value = "";
  render(); // 6. Anropa render()
});
