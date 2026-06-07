// Đợi toàn bộ cây cấu trúc HTML tải xong mới thực thi code
document.addEventListener("DOMContentLoaded", () => {
    initRandomQuote();
    createParticles();
});

/**
 * Hàm hiển thị ngẫu nhiên câu nói truyền cảm hứng văn học
 */
function initRandomQuote() {
    const quotes = [
        "Mỗi học sinh là một câu chuyện đang được viết tiếp.",
        "Từ trang sách đến cuộc đời.",
        "Giáo dục là nghệ thuật đánh thức tiềm năng.",
        "Người thầy gieo hạt, thời gian sẽ nở hoa.",
        "Mỗi ngày đến trường là một ngày hạnh phúc."
    ];
    
    const quoteBox = document.getElementById("quoteBox");
    if (quoteBox) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteBox.innerText = `"${randomQuote}"`;
    }
}

/**
 * Hàm sinh hạt phát sáng lấp lánh chuyển động ngẫu nhiên
 */
function createParticles() {
    const container = document.getElementById("particles");
    if (!container) return;

    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;

        container.appendChild(particle);
    }
}

/**
 * Hàm xử lý đăng nhập và chuyển cảnh mượt mà
 */
function login() {
    const userField = document.getElementById("username");
    const passField = document.getElementById("password");

    if (!userField || !passField) return;

    const user = userField.value.trim(); 
    const pass = passField.value;

    // Kiểm tra tài khoản và mật khẩu cứng
    if (user === "admin" && pass === "123456") {
        const loginPage = document.getElementById("loginPage");
        const dashboardPage = document.getElementById("dashboardPage");

        if (loginPage && dashboardPage) {
            // Biến mất hiệu ứng mờ dần trang đăng nhập (Fade Out)
            loginPage.style.transition = "opacity 0.5s ease";
            loginPage.style.opacity = "0";

            setTimeout(() => {
                loginPage.style.display = "none";
                
                // Kích hoạt hiển thị trang Dashboard mờ dần rồi sáng lên (Fade In)
                dashboardPage.style.display = "block";
                dashboardPage.style.opacity = "0";
                dashboardPage.style.transition = "opacity 0.5s ease";
                
                setTimeout(() => {
                    dashboardPage.style.opacity = "1";
                }, 50);
            }, 500);
        }
    } else {
        alert("Sai tài khoản hoặc mật khẩu! Thầy/Trò vui lòng kiểm tra lại ạ.");
    }
}