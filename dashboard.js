let APP_DB = JSON.parse(localStorage.getItem('THAY_HIEU_DB')) || {
    "2026-2027": { "10A1": { students: [] } }
};
let currentYear = "2026-2027", currentClass = "10A1";

function saveDB() { localStorage.setItem('THAY_HIEU_DB', JSON.stringify(APP_DB)); }

// Các hàm xử lý tab và render
function switchTab(tabName, element) {
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    element.classList.add('active');
    const content = document.getElementById('content-dynamic');
    
    if (tabName === 'bo-mon') {
        content.innerHTML = `
            <h2>Quản Lý Lớp Học</h2>
            <div class="control-panel">
                <select onchange="changeYear(this.value)">${Object.keys(APP_DB).map(y => `<option value="${y}" ${y===currentYear?'selected':''}>${y}</option>`).join('')}</select>
                <select onchange="changeClass(this.value)">${Object.keys(APP_DB[currentYear]).map(c => `<option value="${c}" ${c===currentClass?'selected':''}>${c}</option>`).join('')}</select>
                <button class="btn-action" onclick="addStudent()">+ HS</button>
                <button class="btn-action" onclick="toggleModal(true)">Dán Excel</button>
            </div>
            <table class="kingdom-table">
                <thead><tr><th>STT</th><th>Họ tên</th><th>Biệt danh</th><th>Điểm</th><th>Trạng thái</th><th>Xóa</th></tr></thead>
                <tbody id="studentBody"></tbody>
            </table>
        `;
        renderTable();
    }
}

function renderTable() {
    const list = APP_DB[currentYear][currentClass]?.students || [];
    const tbody = document.getElementById('studentBody');
    tbody.innerHTML = list.map((s, i) => `
        <tr>
            <td>${i+1}</td>
            <td contenteditable="true" onblur="updateHS(${i}, 'name', this.innerText)">${s.name}</td>
            <td contenteditable="true" onblur="updateHS(${i}, 'alias', this.innerText)">${s.alias}</td>
            <td contenteditable="true" onblur="updateHS(${i}, 'score', this.innerText)">${s.score}</td>
            <td contenteditable="true" onblur="updateHS(${i}, 'status', this.innerText)">${s.status}</td>
            <td><i class="fa-solid fa-trash" style="color:#f87171; cursor:pointer" onclick="deleteStudent(${i})"></i></td>
        </tr>
    `).join('');
}

function updateHS(idx, field, val) { APP_DB[currentYear][currentClass].students[idx][field] = val; saveDB(); }
function addStudent() { APP_DB[currentYear][currentClass].students.push({name:"HS mới", alias:"-", score:0, status:"Tốt"}); saveDB(); renderTable(); }
function deleteStudent(i) { APP_DB[currentYear][currentClass].students.splice(i, 1); saveDB(); renderTable(); }
function toggleModal(s) { document.getElementById('importModal').style.display = s ? 'flex' : 'none'; }
function processData() {
    const lines = document.getElementById('excelInput').value.split('\n');
    lines.forEach(l => {
        const [n, a, s, st] = l.split('\t');
        if(n) APP_DB[currentYear][currentClass].students.push({ name: n, alias: a||"-", score: s||0, status: st||"Tốt" });
    });
    saveDB(); toggleModal(false); renderTable();
}