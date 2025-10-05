// Courses with real YouTube video IDs
const courses = {
    js: {
        title: "JavaScript Basics",
        desc: "Learn the fundamentals of JavaScript.",
        videos: ["PkZNo7MFNFg","upDLs1sn7g4"]
    },
    react: {
        title: "React for Beginners",
        desc: "Build interactive UIs with React.",
        videos: ["Ke90Tje7VS0","w7ejDZ8SWv8"]
    },
    python: {
        title: "Data Science with Python",
        desc: "Analyze and visualize data using Python.",
        videos: ["LHBE6Q9XlzI","xxFYro8QuXA"]
    },
    ux: {
        title: "UI/UX Design Fundamentals",
        desc: "Learn UI/UX design concepts.",
        videos: ["y9Dgf-Ve2lQ","Fj6RdZ3x9nY"]
    }
};

// Open course page
function openCourse(courseId){
    window.open('course.html?course=' + courseId, "_blank");
}



// Mark course complete
function markComplete() {
    const title = document.getElementById("course-title").textContent;
    let completed = JSON.parse(localStorage.getItem("completedCourses") || "[]");
    if(!completed.includes(title)){
        completed.push(title);
        localStorage.setItem("completedCourses", JSON.stringify(completed));
        alert("Course marked as complete!");
    }
}

// Play all videos
function playAll() {
    if(window.playlist && window.playlist.length>0){
        window.currentVideoIndex = 0;
        playVideo(window.currentVideoIndex);
    }
}

// Play a video from playlist
function playVideo(index){
    const videoId = window.playlist[index];
    const container = document.getElementById("video-container");
    container.innerHTML = `
        <iframe width="100%" height="800" 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    `;
    window.currentVideoIndex = index;
}

// On course page load
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("course");

    if(courseId && courses[courseId]){
        const course = courses[courseId];
        document.getElementById("course-title").textContent = course.title;
        document.getElementById("course-desc").textContent = course.desc;

        window.playlist = course.videos;
        const playlistEl = document.getElementById("playlist");
        playlistEl.innerHTML = "";

        course.videos.forEach((vid,i)=>{
            const li = document.createElement("li");
            li.textContent = "Video " + (i+1);
            li.style.cursor = "pointer";
            li.onclick = ()=>playVideo(i);
            playlistEl.appendChild(li);
        });

        // Autoplay first video
        if(course.videos.length>0) playVideo(0);
    }

     // Rotate testimonials
    let testimonialIndex=0;
    const testimonials = document.querySelectorAll(".testimonial");
    function rotateTestimonials(){
        testimonials.forEach(t=>t.style.display="none");
        testimonialIndex++;
        if(testimonialIndex>testimonials.length)testimonialIndex=1;
        testimonials[testimonialIndex-1].style.display="block";
        setTimeout(rotateTestimonials,1000);
    }
    if(testimonials.length>0) rotateTestimonials();

    // Progress page
    const completed = JSON.parse(localStorage.getItem("completedCourses") || "[]");
    const progressList = document.getElementById("progress-list");
    if(progressList){
        completed.forEach(title=>{
            const li=document.createElement("li");
            li.textContent=title;
            progressList.appendChild(li);
        });
    }
};
 