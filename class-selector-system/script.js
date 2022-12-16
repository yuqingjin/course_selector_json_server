

const baseUrl = 'http://localhost:4232/courseList/';



const checkCourseType = function(course) {
    return course['required'] === true ? 'Compulsory' : 'Elective'
};

const createTmp = (course_list) => {
    let tmp = '';

    course_list.forEach((course) => {
        const courseType = checkCourseType(course);
        tmp +=
        `<li id=${course['courseId']} onclick="selectedCourses(${course['courseId']}, ${course['credit']})">
            <span>${course['courseName']} </span>
            <br>
            <span>Course Type: ${courseType} </span>
            <br>
            <span>Course Credit: ${course['credit']} </span>
        </li>`;
    });
return tmp;
};

const selectedCourses = function(id, credit) {
    const cur_color = document.getElementById('#'+id).style.backgroundColor;
    var total = document.getElementById('#total-credits').textContent;
    if (cur_color === 'white') {
        document.getElementById('#'+id).style.backgroundColor = 'gray';
        total = Number(total) + Number(credit)
    } else {
        document.getElementById('#'+id).style.backgroundColor = 'white';
        total = Number(total) - Number(credit)
    }

}


const render = (ele, tmp) => {
    ele.innerHTML = tmp;
}

class State {
    #courselist = [];

    get courselist() {
        return this.#courselist;
}

    set courselist(new_courselist) {
        this.#courselist = new_courselist;

        const course_container = document.querySelector('#courselist_container')

        const tmp = createTmp(this.#courselist );

        render(course_container, tmp)
    }

}

const getCourses = () =>
    fetch(baseUrl).then((course_list) => course_list.json())

const course_list = getCourses();

const state = new State();
getCourses().then((courses) => {
    state.courselist = courses;
    console.log(courses)
});
