const rows = [...document.querySelectorAll('#attendanceList tr')];
const presentCount = document.querySelector('#presentCount');
const rate = document.querySelector('#attendanceRate');
const presentNote = document.querySelector('#presentNote');
const searchResult = document.querySelector('#searchResult');
const themeButton = document.querySelector('#themeButton');
const total = rows.length;

const today = new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
document.querySelector('#todayDate').textContent = today;

function updateSummary() {
  const present = rows.filter(row => row.querySelector('.status').classList.contains('present')).length;
  const percentage = Math.round((present / total) * 100);
  presentCount.textContent = present;
  rate.textContent = percentage + '%';
  presentNote.textContent = present === total ? 'Everyone is here' : present + ' ready to learn';
  document.querySelector('#rateNote').textContent = percentage >= 80 ? 'A great start' : 'Today so far';
}

function setStatus(button, isPresent) {
  button.classList.toggle('present', isPresent);
  button.classList.toggle('absent', !isPresent);
  button.setAttribute('aria-pressed', String(isPresent));
  button.innerHTML = isPresent ? '<span>✓</span> Present' : '<span>–</span> Absent';
}

document.querySelectorAll('.status').forEach(button => {
  button.addEventListener('click', () => {
    setStatus(button, !button.classList.contains('present'));
    updateSummary();
  });
});

document.querySelector('#searchInput').addEventListener('input', event => {
  const term = event.target.value.trim().toLowerCase();
  let matches = 0;
  rows.forEach(row => {
    const match = row.dataset.name.toLowerCase().includes(term);
    row.hidden = !match;
    if (match) matches += 1;
  });
  searchResult.textContent = term ? matches + (matches === 1 ? ' child found' : ' children found') : '';
});

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeButton.querySelector('span:last-child').textContent = isDark ? 'Light mode' : 'Dark mode';
  themeButton.querySelector('span:first-child').textContent = isDark ? '☀' : '☾';
  localStorage.setItem('brightstart-theme', isDark ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem('brightstart-theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) setTheme(true);
themeButton.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

updateSummary();
