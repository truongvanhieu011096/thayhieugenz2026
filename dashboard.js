let APP_DB = JSON.parse(localStorage.getItem('THAY_HIEU_DB')) || {
    "2026-2027": { "10A1": { students: [] } }
};
let HOMEROOM_DB = JSON.parse(localStorage.getItem('THAY_HIEU_CN')) || {
    "2026-2027": ["6/1"]
};
let currentYear = "2026-2027", currentClass = "10A1";

function saveDB() { localStorage.setItem('THAY_HIEU_DB', JSON.stringify(APP_DB)); }

// Các hàm xử lý tab và render
function saveHomeroom() {
    localStorage.setItem(
        'THAY_HIEU_CN',
        JSON.stringify(HOMEROOM_DB)
    );
}
function switchTab(tabName, element) {
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    if (element) element.classList.add('active');

    const content = document.getElementById('content-dynamic');
	

    switch (tabName) {

        // 📊 TỔNG QUAN
        case 'tong-quan':

content.innerHTML = `
<div class="teacher-profile-page">

    <div class="profile-header">

        <div class="profile-avatar">
            <img src="giaovien.jpg" alt="Giáo viên">
        </div>

        <div class="profile-info">
            <h1>TRƯƠNG VĂN HIẾU</h1>

            <div class="profile-position">
                Giáo viên Ngữ văn • Trường THCS Tố Hữu
            </div>

            <div class="profile-slogan">
                "Kiến tạo lớp học hạnh phúc bằng công nghệ và cảm hứng."
            </div>
        </div>

    </div>

    <div class="profile-grid">

        <div class="profile-card">
            <h3><i class="fa-solid fa-user"></i> Thông tin cá nhân</h3>

            <p><strong>Họ và tên:</strong> Trương Văn Hiếu</p>
            <p><strong>Chức vụ:</strong> Giáo viên</p>
            <p><strong>Môn giảng dạy:</strong> Ngữ văn</p>
            <p><strong>Đơn vị:</strong> Trường THCS Tố Hữu</p>
            <p><strong>Website:</strong> Thầy Hiếu Gen Z</p>
        </div>

        <div class="profile-card">
            <h3><i class="fa-solid fa-award"></i> Thành tích nổi bật</h3>

            <ul>
                <li>Giáo viên tích cực ứng dụng CNTT trong dạy học.</li>
                <li>Xây dựng mô hình lớp học hạnh phúc.</li>
                <li>Phát triển hệ thống Thầy Hiếu Gen Z.</li>
                <li>Ứng dụng AI vào giáo dục.</li>
            </ul>
        </div>

        <div class="profile-card">
            <h3><i class="fa-solid fa-book"></i> Chuyên môn</h3>

            <div class="skill">
                <span>Ngữ văn</span>
                <div class="skill-bar"><div style="width:95%"></div></div>
            </div>

            <div class="skill">
                <span>Công nghệ giáo dục</span>
                <div class="skill-bar"><div style="width:90%"></div></div>
            </div>

            <div class="skill">
                <span>Thiết kế học liệu</span>
                <div class="skill-bar"><div style="width:85%"></div></div>
            </div>

            <div class="skill">
                <span>AI trong giáo dục</span>
                <div class="skill-bar"><div style="width:88%"></div></div>
            </div>
        </div>

        <div class="profile-card">
            <h3><i class="fa-solid fa-heart"></i> Triết lý giáo dục</h3>

            <blockquote>
                "Mỗi học sinh là một câu chuyện đang được viết tiếp.
                Người thầy không chỉ truyền đạt kiến thức mà còn truyền cảm hứng,
                khơi dậy khát vọng và niềm tin để học sinh phát triển toàn diện."
            </blockquote>
        </div>

    </div>

</div>
`;

break;

        // 👩‍🏫 LỚP CHỦ NHIỆM
        case 'lop-chu-nhiem':

content.innerHTML = `
<h2>👩‍🏫 Lớp chủ nhiệm</h2>

<div class="control-panel">

    <select id="homeroomYear"
        onchange="renderHomeroomList()">

        ${Object.keys(HOMEROOM_DB)
            .map(y=>`
            <option value="${y}">
                ${y}
            </option>
        `).join('')}

    </select>

    <button class="btn-action add"
        onclick="addSchoolYear()">
        + Năm học
    </button>

</div>

<div id="homeroomList"></div>

<div class="control-panel">

    <button class="btn-action add"
        onclick="addHomeroomClass()">
        + Thêm lớp
    </button>

   <button class="btn-action save">
    <i class="fa-solid fa-floppy-disk"></i>
    Lưu dữ liệu
</button>

</div>
`;

renderHomeroomList();

break;

        // 📚 LỚP BỘ MÔN (GIỮ NGUYÊN CODE CŨ)
        case 'bo-mon':
            content.innerHTML = `
                <h2>Quản Lý Lớp Học</h2>

                <div class="control-panel">
                    <select onchange="changeYear(this.value)">
                        ${Object.keys(APP_DB).map(y => `<option value="${y}" ${y===currentYear?'selected':''}>${y}</option>`).join('')}
                    </select>

                    <select onchange="changeClass(this.value)">
                        ${Object.keys(APP_DB[currentYear]).map(c => `<option value="${c}" ${c===currentClass?'selected':''}>${c}</option>`).join('')}
                    </select>

                    <button class="btn-action" onclick="addStudent()">+ HS</button>
                    <button class="btn-action" onclick="toggleModal(true)">Dán Excel</button>
                </div>

                <table class="kingdom-table">
                    <thead>
                        <tr>
                            <th>STT</th><th>Họ tên</th><th>Biệt danh</th><th>Điểm</th><th>Trạng thái</th><th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody id="studentBody"></tbody>
                </table>
            `;
            renderTable();
            break;

        // 📸 KHOẢNH KHẮC
        case 'khoanh-khac':
            content.innerHTML = `<h2>📸 Khoảnh khắc đáng nhớ</h2><p>Album lớp học đang phát triển...</p>`;
            break;

        // 📁 TÀI LIỆU
        case 'tai-lieu':
            content.innerHTML = `<h2>📁 Tài liệu</h2><p>Kho học liệu lớp học...</p>`;
            break;

        // 🎮 TRÒ CHƠI
        case 'tro-choi':
            content.innerHTML = `<h2>🎮 Trò chơi dạy học</h2><p>Quiz & mini game đang phát triển...</p>`;
            break;

        // ⚙️ CÀI ĐẶT
        case 'cai-dat':
            content.innerHTML = `<h2>⚙️ Cài đặt</h2><p>Thiết lập hệ thống...</p>`;
            break;
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
function renderHomeroomList() {

    const year =
        document.getElementById('homeroomYear').value;

    const container =
        document.getElementById('homeroomList');

    const classes =
        HOMEROOM_DB[year] || [];

    container.innerHTML = `
        <table class="kingdom-table">
            <thead>
                <tr>
                    <th>Lớp</th>
                    <th>Xóa</th>
                </tr>
            </thead>
            <tbody>
                ${classes.map((c,i)=>`
                <tr>
                    <td
                        contenteditable="true"
                        onblur="
                        HOMEROOM_DB['${year}'][${i}] =
                        this.innerText">
                        ${c}
                    </td>

                    <td>
                        <button
                            class="btn-action delete"
                            onclick="
                            deleteHomeroomClass(${i})">
                            Xóa
                        </button>
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}
function addSchoolYear() {

    const year =
    prompt("Nhập năm học:");

    if(!year) return;

    if(!HOMEROOM_DB[year]) {

        HOMEROOM_DB[year] = [];

        saveHomeroom();

        switchTab(
            'lop-chu-nhiem',
            document.querySelector('.menu-item.active')
        );
    }
}
