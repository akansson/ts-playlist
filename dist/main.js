console.log("Playlist Builder startar...");
const form = document.querySelector("#track-form");
const titleInput = document.querySelector("#title");
const durationInput = document.querySelector("#duration");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");
const tracks = [];
function parseDuration(input) {
    const parts = input.split(":");
    if (parts.length !== 2 || !parts[0] || !parts[1])
        return null;
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    if (isNaN(minutes) || isNaN(seconds) || seconds < 0 || seconds >= 60)
        return null;
    return minutes * 60 + seconds;
}
console.log(parseDuration("03:45"));
function formatDuration(seconds) {
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
    const track = { title, duration }; // 3. Skapa ett Track-objekt
    tracks.push(track); // 4. Lägg till i tracks-arrayen
    titleInput.value = ""; // 5. Töm formuläret
    durationInput.value = "";
    render(); // 6. Anropa render()
});
export {};
//# sourceMappingURL=main.js.map