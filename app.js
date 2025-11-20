// Canvas 설정
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 창 크기 변경 시 캔버스 크기 조정
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 잠만보 클래스
class Snorlax {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 80;
        this.bobOffset = 0;
        this.bobSpeed = 0.05;
    }

    draw() {
        ctx.save();

        // 위아래로 살짝 움직이는 효과
        this.bobOffset += this.bobSpeed;
        const bobY = Math.sin(this.bobOffset) * 5;

        ctx.translate(this.x, this.y + bobY);

        // 그림자
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(0, this.size * 0.8, this.size * 0.6, this.size * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // 몸통 (진한 청록색)
        ctx.fillStyle = '#0F4C5C';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.7, this.size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();

        // 배 (베이지색)
        ctx.fillStyle = '#E6D5B8';
        ctx.beginPath();
        ctx.ellipse(0, 10, this.size * 0.5, this.size * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();

        // 발
        ctx.fillStyle = '#0F4C5C';
        // 왼쪽 발
        ctx.beginPath();
        ctx.ellipse(-this.size * 0.4, this.size * 0.6, this.size * 0.25, this.size * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        // 오른쪽 발
        ctx.beginPath();
        ctx.ellipse(this.size * 0.4, this.size * 0.6, this.size * 0.25, this.size * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // 발톱
        ctx.fillStyle = '#E6D5B8';
        for (let i = -1; i <= 1; i++) {
            ctx.beginPath();
            ctx.arc(-this.size * 0.4 + i * 10, this.size * 0.65, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.size * 0.4 + i * 10, this.size * 0.65, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // 팔
        // 왼쪽 팔
        ctx.fillStyle = '#0F4C5C';
        ctx.beginPath();
        ctx.ellipse(-this.size * 0.7, 0, this.size * 0.2, this.size * 0.35, -0.3, 0, Math.PI * 2);
        ctx.fill();
        // 오른쪽 팔
        ctx.beginPath();
        ctx.ellipse(this.size * 0.7, 0, this.size * 0.2, this.size * 0.35, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // 귀
        // 왼쪽 귀
        ctx.beginPath();
        ctx.arc(-this.size * 0.5, -this.size * 0.6, this.size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        // 오른쪽 귀
        ctx.beginPath();
        ctx.arc(this.size * 0.5, -this.size * 0.6, this.size * 0.15, 0, Math.PI * 2);
        ctx.fill();

        // 얼굴
        ctx.fillStyle = '#0F4C5C';
        ctx.beginPath();
        ctx.arc(0, -this.size * 0.3, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // 눈 (감은 눈)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        // 왼쪽 눈
        ctx.beginPath();
        ctx.arc(-this.size * 0.2, -this.size * 0.35, 8, 0.2, Math.PI - 0.2);
        ctx.stroke();
        // 오른쪽 눈
        ctx.beginPath();
        ctx.arc(this.size * 0.2, -this.size * 0.35, 8, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // 코
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(0, -this.size * 0.2, 5, 0, Math.PI * 2);
        ctx.fill();

        // 입
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -this.size * 0.15, 15, 0.2, Math.PI - 0.2);
        ctx.stroke();

        ctx.restore();
    }
}

// 구름 클래스
class Cloud {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = Math.random() * 40 + 60;
    }

    update() {
        this.x -= this.speed;
        if (this.x + this.size < 0) {
            this.x = canvas.width + this.size;
            this.y = Math.random() * canvas.height * 0.5;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.arc(this.x + this.size * 0.3, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.arc(this.x + this.size * 0.6, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 나무 클래스
class Tree {
    constructor(x, speed) {
        this.x = x;
        this.y = canvas.height - 150;
        this.speed = speed;
        this.height = Math.random() * 50 + 80;
    }

    update() {
        this.x -= this.speed;
        if (this.x + 50 < 0) {
            this.x = canvas.width + 50;
            this.height = Math.random() * 50 + 80;
        }
    }

    draw() {
        // 나무 줄기
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x - 10, this.y, 20, this.height);

        // 나무 잎
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 40);
        ctx.lineTo(this.x - 40, this.y + 20);
        ctx.lineTo(this.x + 40, this.y + 20);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 20);
        ctx.lineTo(this.x - 35, this.y + 30);
        ctx.lineTo(this.x + 35, this.y + 30);
        ctx.closePath();
        ctx.fill();
    }
}

// 별 클래스
class Star {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random();
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = canvas.width;
            this.y = Math.random() * canvas.height * 0.4;
        }

        this.opacity += this.fadeDirection * 0.01;
        if (this.opacity > 1 || this.opacity < 0.2) {
            this.fadeDirection *= -1;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 게임 상태
let gameSpeed = 1;
let isRunning = true;

// 객체 생성
const snorlax = new Snorlax(canvas.width / 2, canvas.height - 200);
const clouds = [];
const trees = [];
const stars = [];

// 구름 생성
for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.5,
        Math.random() * 0.3 + 0.2
    ));
}

// 나무 생성
for (let i = 0; i < 8; i++) {
    trees.push(new Tree(
        Math.random() * canvas.width,
        Math.random() * 0.5 + 0.5
    ));
}

// 별 생성
for (let i = 0; i < 30; i++) {
    stars.push(new Star(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.4,
        Math.random() * 0.2 + 0.1
    ));
}

// 애니메이션 루프
function animate() {
    // 배경 그라디언트
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 땅
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // 별 업데이트 및 그리기
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // 구름 업데이트 및 그리기
    clouds.forEach(cloud => {
        if (isRunning) {
            cloud.speed = (Math.random() * 0.3 + 0.2) * gameSpeed;
            cloud.update();
        }
        cloud.draw();
    });

    // 나무 업데이트 및 그리기
    trees.forEach(tree => {
        if (isRunning) {
            tree.speed = (Math.random() * 0.5 + 0.5) * gameSpeed;
            tree.update();
        }
        tree.draw();
    });

    // 잠만보 그리기
    snorlax.draw();

    requestAnimationFrame(animate);
}

// 컨트롤 버튼
document.getElementById('startBtn').addEventListener('click', () => {
    isRunning = true;
});

document.getElementById('stopBtn').addEventListener('click', () => {
    isRunning = false;
});

document.getElementById('speedUpBtn').addEventListener('click', () => {
    gameSpeed = Math.min(gameSpeed + 0.5, 5);
});

document.getElementById('slowDownBtn').addEventListener('click', () => {
    gameSpeed = Math.max(gameSpeed - 0.5, 0.5);
});

// 애니메이션 시작
animate();
