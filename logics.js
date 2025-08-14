// Signup
function signup() {
    let user = document.getElementById("signupUser").value;
    let pass = document.getElementById("signupPass").value;
    if(user && pass){
        localStorage.setItem("username", user);
        localStorage.setItem("password", pass);
        alert("Signup successful! Please login.");
        window.location.href = "index.html";
    } else {
        alert("Please fill all fields");
    }
}

// Login
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;
    if(user === localStorage.getItem("username") && pass === localStorage.getItem("password")){
        window.location.href = "courses.html";
    } else {
        alert("Invalid credentials");
    }
}

// Logout
function logout(){
    window.location.href = "index.html";
}

// Load Courses
if(document.getElementById("courseList")){
    let courses = [
        {id:1, title:"HTML Basics", img:"https://via.placeholder.com/250x150"},
        {id:2, title:"CSS Mastery", img:"https://via.placeholder.com/250x150"},
        {id:3, title:"JavaScript Essentials", img:"https://via.placeholder.com/250x150"}
    ];
    let list = document.getElementById("courseList");
    courses.forEach(c=>{
        let card = document.createElement("div");
        card.className = "course-card";
        card.innerHTML = `<img src="${c.img}"><h3>${c.title}</h3>`;
        card.onclick = () => {
            localStorage.setItem("currentCourse", JSON.stringify(c));
            window.location.href = "course.html";
        };
        list.appendChild(card);
    });
}

// Load Course Page
if(document.getElementById("courseVideo")){
    let course = JSON.parse(localStorage.getItem("currentCourse"));
    document.getElementById("courseTitle").innerText = course.title;

    let lessons = [
        {title:"Intro", src:"sample.mp4"},
        {title:"Part 1", src:"sample.mp4"},
        {title:"Part 2", src:"sample.mp4"}
    ];

    let list = document.getElementById("lessonList");
    let video = document.getElementById("courseVideo");
    let progress = JSON.parse(localStorage.getItem("progress")) || {};

    lessons.forEach((l, i)=>{
        let li = document.createElement("li");
        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.disabled = true;
        cb.checked = progress[l.title] || false;
        li.appendChild(cb);
        li.appendChild(document.createTextNode(" "+l.title));
        li.onclick = () => {
            video.src = l.src;
            video.dataset.lesson = l.title;
        };
        list.appendChild(li);
    });

    video.addEventListener("ended", ()=>{
        let currentLesson = video.dataset.lesson;
        if(currentLesson){
            progress[currentLesson] = true;
            localStorage.setItem("progress", JSON.stringify(progress));
            let checkboxes = document.querySelectorAll("#lessonList input");
            checkboxes.forEach(cb=>{
                if(cb.nextSibling.textContent.trim() === currentLesson){
                    cb.checked = true;
                }
            });
        }
    });
}
