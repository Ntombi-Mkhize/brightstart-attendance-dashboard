const rows = [...document.querySelectorAll('#attendanceList tr')];
const presentCount = document.querySelector('#presentCount');
const rate = document.querySelector('#attendanceRate');
const total = rows.length;
document.querySelector('#todayDate').textContent = new Intl.DateTimeFormat('en-ZA',{day:'numeric',month:'long',year:'numeric'}).format(new Date());
function updateSummary(){const present=rows.filter(row=>row.querySelector('.status').classList.contains('present')).length;presentCount.textContent=present;rate.textContent=Math.round((present/total)*100)+'%';}
document.querySelectorAll('.status').forEach(button=>button.addEventListener('click',()=>{const isPresent=button.classList.toggle('present');button.classList.toggle('absent',!isPresent);button.textContent=isPresent?'Present':'Absent';updateSummary();}));
document.querySelector('#searchInput').addEventListener('input',event=>{const term=event.target.value.toLowerCase();rows.forEach(row=>row.hidden=!row.dataset.name.toLowerCase().includes(term));});
document.querySelector('#themeButton').addEventListener('click',event=>{document.body.classList.toggle('dark');event.target.textContent=document.body.classList.contains('dark')?'Light mode':'Dark mode';});
updateSummary();
