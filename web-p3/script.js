// 1. بيانات المدربين (عرض عشوائي وفرز في صفحة قصتنا)
const trainers = [
    { name: "ريماس ناصر", role: "قائدة الفريق", exp: 9, img: "images/rms.jpg" },
    { name: "ليان الطويل", role: "مدربة خيول", exp: 4, img: "images/ليان.jpg" },
    { name: "سارة موكلي", role: "مدربة خيول ", exp: 10, img: "images/ساره.jpg" },
    { name: "ريتال عبدالكريم", role: "مدربة أساسيات", exp: 6, img: "images/retal.JPG" },
    { name: "ريما الدوسري", role: "خبيرة سباقات", exp: 11, img: "images/reema.jpg" }
];

// دالة العرض الموحدة للبطاقات
function display(list) {
    const container = document.getElementById('trainers-container');
    if (!container) return; 
    container.innerHTML = ""; 
    for (let i = 0; i < list.length; i++) {
        container.innerHTML += `
            <div class="trainer-card">
                <div class="trainer-img-circle"><img src="${list[i].img}" alt="${list[i].name}"></div>
                <h4>${list[i].name}</h4>
                <p>${list[i].role}</p>
                <p class="exp-text">خبرة ${list[i].exp} سنوات</p>
            </div>`;
    }
}

// دالة الساعة (تتحدث كل ثانية في الفوتر)
function updateClock() {
    const clockDiv = document.getElementById('clock');
    if (clockDiv) {
        const now = new Date();
        clockDiv.innerHTML = "التوقيت الحالي: " + now.toLocaleTimeString('ar-SA');
    }
}

// ---------------------------------------------------------
// الوظيفة الأساسية التي تعمل عند تحميل أي صفحة
// ---------------------------------------------------------
window.onload = function() {
    
    // أولاً: تشغيل الساعة وتحديثها فوراً (في جميع الصفحات)
    updateClock();
    setInterval(updateClock, 1000);

    if (document.getElementById('notesContainer')) {
        displayNotes();
    }

    // ثانياً: منطق صفحة "قصتنا" (About Us)
    if (document.getElementById('trainers-container')) {
        let shuffledList = [...trainers].sort(() => Math.random() - 0.5);
        display(shuffledList);
        
        const sortDropdown = document.getElementById('sort-select');
        if (sortDropdown) {
            sortDropdown.onchange = function() {
                let val = this.value;
                let sortedList = [...trainers];
                if (val === "az") sortedList.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
                else if (val === "za") sortedList.sort((a, b) => b.name.localeCompare(a.name, 'ar'));
                else if (val === "exp-high") sortedList.sort((a, b) => b.exp - a.exp);
                else if (val === "exp-low") sortedList.sort((a, b) => a.exp - b.exp);
                display(sortedList);
            };
        }
    }

    // ثالثاً: منطق صفحة "تفاصيل الدورة" (زر المزيد)
    const moreBtn = document.getElementById('more-btn');
    if (moreBtn) {
        moreBtn.onclick = function() {
            let extras = document.querySelectorAll('.extra-lesson');
            extras.forEach(el => {
                if (el.style.display === "none" || el.style.display === "") {
                    el.style.display = "block";
                    this.innerHTML = "عرض أقل";
                } else {
                    el.style.display = "none";
                    this.innerHTML = "المزيد...";
                }
            });
        };
    }

    // رابعاً: تنبيهات صفحات الدروس (تظهر بعد 3 ثوانٍ)
    if (document.querySelector('.lesson-title')) {
        setTimeout(() => {
            alert("المحور الأول: فن تجهيز الخيل والتهيئة\nالهدف: تعلم طقوس التجهيز الصحيحة لسلامة الفارس والجواد.\nتذكير: لا تنسَ خوض الاختبار بعد إنهاء الدرس!");
        }, 3000);
    } else if (document.querySelector('.lesson2-title')) {
        setTimeout(() => {
            alert("هدف الدرس: فهم سيكولوجية العناد وتطبيق تقنيات الضغط والتحرير بذكاء.\nتذكير: لا تنسَ خوض الاختبار القصير بعد إنهاء الدرس!");
        }, 3000);
    }
    if (window.location.href.includes("Cou1.html")) {
    setTimeout(() => {
        alert("مرحباً بك! هدف هذا الدرس هو إتقان أساسيات التعامل مع الخيل. لا تنسى حل الاختبار في النهاية.");
    }, 3000);
}

    // خامساً: محرك الكويزات  (سارة، ريماس، ليان، ريتال، ريما)
    const submitQuizBtn = document.getElementById('submit-quiz');
    if (submitQuizBtn) {
        submitQuizBtn.onclick = function() {
            const form = document.getElementById('quiz-form');
            if (!form.q1.value || !form.q2.value) {
                alert("يرجى الإجابة على جميع الأسئلة أولاً!");
                return;
            }
            
            let score = 0;
            //  عنوان الكويز من الصفحة تلقائياً ليظهر بالداشبورد باسم الدورة
            const quizTitle = document.querySelector('.quiz-main-title')?.textContent.trim() || "اختبار حذوة";
            
            if (form.q1.value === "b") score++; 
            if (form.q2.value === "a") score++;

            const today = new Date().toLocaleDateString('ar-SA');

            let bestScores = JSON.parse(localStorage.getItem('bestQuizScores')) || {};
            let prevBest = bestScores[quizTitle] ? bestScores[quizTitle].score : 0;

            if (score >= prevBest) {
                bestScores[quizTitle] = { score: score, date: today };
                localStorage.setItem('bestQuizScores', JSON.stringify(bestScores));
            }
            
            localStorage.setItem('lastQuizResult', score);
            localStorage.setItem('lastQuizTitle', quizTitle);
            localStorage.setItem('lastQuizURL', window.location.href); // حفظ الرابط لزر الإعادة
            window.location.href = "result.html";
        };
    }

    // سادساً: تشغيل دوال الربط والتقييم والداشبورد
    setupDashboard();
    displayQuizResult();
};

// 2. زر العودة للأعلى
const bttBtn = document.getElementById("backToTop");
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if (bttBtn) bttBtn.style.display = "block";
    } else {
        if (bttBtn) bttBtn.style.display = "none";
    }
};
if (bttBtn) {
    bttBtn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

// 3. تبديل الثيم
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
    themeBtn.onclick = function() {
        document.body.classList.toggle("dark-theme");
        themeBtn.textContent = document.body.classList.contains("dark-theme") ? "☀️" : "🌓";
    };
}

// 4. وظائف الملاحظات (شرط 30 حرفاً)
function displayNotes() {
    const container = document.getElementById('notesContainer');
    if (!container) return;
    let notes = JSON.parse(localStorage.getItem('myNotes')) || [];
    container.innerHTML = ""; 
    notes.forEach((note, index) => {
        const div = document.createElement('div');
        div.className = "note-item";
        div.style.cssText = "margin-bottom:10px; padding:15px; border-radius:8px; display:flex; align-items:center; color:#000;";
        if (note.priority === "1") div.style.backgroundColor = "#ffcccc";
        else if (note.priority === "2") div.style.backgroundColor = "#fff3cd";
        else if (note.priority === "3") div.style.backgroundColor = "#d4edda";
        div.innerHTML = `<input type="checkbox" class="note-checkbox" value="${index}" style="margin-left: 15px;">
                         <span style="flex-grow: 1;">${note.text}</span>`;
        container.appendChild(div);
    });
}

function saveNote() {
    const text = document.getElementById('noteText').value;
    const priority = document.getElementById('notePriority').value;
    if (text.trim().length < 30) { alert("يرجى كتابة 30 حرفاً على الأقل."); return; }
    if (priority === "") { alert("يرجى اختيار الأولوية."); return; }
    let notes = JSON.parse(localStorage.getItem('myNotes')) || [];
    notes.push({ text: text, priority: priority });
    localStorage.setItem('myNotes', JSON.stringify(notes));
    document.getElementById('noteText').value = "";
    displayNotes();
}

function deleteSelectedNotes() {
    const checkboxes = document.querySelectorAll('.note-checkbox:checked');
    if (checkboxes.length === 0) { alert("اختر ملاحظة واحدة على الأقل"); return; }
    if (confirm("هل أنتِ متأكدة؟")) {
        let notes = JSON.parse(localStorage.getItem('myNotes')) || [];
        let selected = Array.from(checkboxes).map(cb => parseInt(cb.value));
        let updated = notes.filter((_, i) => !selected.includes(i));
        localStorage.setItem('myNotes', JSON.stringify(updated));
        displayNotes();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const evalForm = document.getElementById('evaluation-form');
    if (evalForm) {
        evalForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const teacher = document.getElementById('teacher-select');
            const feedback = document.getElementById('feedback-text');
            const ratingInput = document.querySelector('input[name="r"]:checked');
            const ratingContainer = document.getElementById('ratingContainer');

            let isValid = true;

            // إعادة التنسيق الطبيعي (مسح التنبيهات السابقة)
            [teacher, feedback, ratingContainer].forEach(el => {
                if (el) el.style.border = "1px solid #e0d5c1";
            });

            // التحقق من الحقول وصبغها بالأحمر 
            if (!teacher.value || teacher.value.includes("--")) {
                teacher.style.border = "2px solid red";
                isValid = false;
            }

            if (!ratingInput) {
                if (ratingContainer) ratingContainer.style.border = "2px solid red";
                isValid = false;
            }

            if (feedback.value.trim() === "") {
                feedback.style.border = "2px solid red";
                isValid = false;
            }

            if (!isValid) {
                alert("الرجاء إكمال جميع الحقول المحددة باللون الأحمر");
                return;
            }

            const score = parseInt(ratingInput.value);
            if (score >= 4) {
                alert("شكراً لك! نحن سعداء بأن تجربتك مع مدربي حذوة كانت مميزة.");
            } else {
                alert("نعتذر عن عدم رضاك، سنعمل جاهداً لتحسين تجربتك.");
            }

            window.location.href = "Dashboard.html";
        });
    }

    // كود تواصل معنا
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('contact-name');
            const name = nameInput.value.trim();

            // 1. التحقق ألا يبدأ برقم
            if (/^\d/.test(name)) {
                alert("عذراً، لا يمكن أن يبدأ اسم الفارس برقم.");
                nameInput.style.borderColor = "red";
                return;
            }

            // 2. التحقق من الاسم الكامل 
            if (!name.includes(" ") || name.split(" ").filter(word => word.length > 0).length < 2) {
                alert("يرجى إدخال الاسم الكامل .");
                nameInput.style.borderColor = "red";
                return;
            }
            
            alert(`شكراً لك يا ${name}، تم استلام رسالتك بنجاح!`);
            nameInput.style.borderColor = ""; 
            contactForm.reset();
        });
    }
});

// 6. وظائف الداشبورد والنتائج (لدعم الكويزات الخمسة وزر الإعادة)
function setupDashboard() {
    const resultsBody = document.getElementById('results-body');
    if (!resultsBody) return;
    const bestScores = JSON.parse(localStorage.getItem('bestQuizScores')) || {};
    const quizTitles = Object.keys(bestScores);
    if (quizTitles.length > 0) {
        if(document.getElementById('results-section')) document.getElementById('results-section').style.display = "block";
        if(document.getElementById('no-results-msg')) document.getElementById('no-results-msg').style.display = "none";
        resultsBody.innerHTML = "";
        quizTitles.forEach(title => {
            const data = bestScores[title];
            resultsBody.innerHTML += `<tr><td>${title}</td><td>${data.score} / 2</td><td>${data.date}</td></tr>`;
        });
    }
}

function displayQuizResult() {
    const finalScoreElement = document.getElementById('final-score');
    if (!finalScoreElement) return;

    const lastScore = localStorage.getItem('lastQuizResult') || 0;
    const lastTitle = localStorage.getItem('lastQuizTitle') || "الاختبار";
    const lastURL = localStorage.getItem('lastQuizURL');
    const bestScores = JSON.parse(localStorage.getItem('bestQuizScores')) || {};
    const bestScore = bestScores[lastTitle] ? bestScores[lastTitle].score : lastScore;

    finalScoreElement.textContent = lastScore + " / 2";
    if (document.getElementById('best-score-display')) document.getElementById('best-score-display').textContent = bestScore + " / 2";
    if (document.getElementById('quiz-name-display')) document.getElementById('quiz-name-display').textContent = "نتيجتك في " + lastTitle;
    
    // تحديث رابط "إعادة الاختبار" عشان يرجع للصفحة
    const retryLink = document.getElementById('retry-link');
    if (retryLink && lastURL) {
        retryLink.href = lastURL;
    }
}

function toggleAccordion(element) {
    element.parentElement.classList.toggle("active");
}