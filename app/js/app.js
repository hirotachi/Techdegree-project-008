$(document).ready(function () {

    const states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];


// fetching===============================================
    // fetch data from api
    function fetchData(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => createCards(data.results))
    }

    fetchData("https://randomuser.me/api/?results=12&nat=us");

// helpers function==================================

// creates employee from data passed
    function createEmployee(data) {
        const li =
            `<li class="employee">
        <img class="employee_img" src="${data.picture.large}" alt="employee picture">
        <div class="employee_info">
            <p class="employee_info-name">${data.name.first} ${data.name.last}</p>
            <p class="employee_info-email">${data.email}</p>
            <p class="employee_info-city">${data.location.city}</p>
        </div>
        <div class="more_info">
            <div class="phone">${data.phone}</div>
            <div class="address">${data.location.street}, ${abbreaviator(data.location.state)} ${data.location.postcode}</div>
            <div class="birthday">Birthday: ${createBirthDay(data.dob.date)}</div>
        </div>
    </li>`

        $(".grid").append(li);
        $(".more_info").hide();
    }

    //reverse date format
    function createBirthDay(data){
        const date = data.slice(2, 10);
        return date.split('-').reverse().join('/');
    }
// creates card depending on the length of the request
    function createCards(data) {
        $(data).each(function () {
            createEmployee(this);
        });
    }


// create overlay on employee click
    function createOverlay() {
        const li = $(this).clone();
        const overlay = document.createElement("ul");
        $(overlay).addClass("overlay");
        $(overlay).append(li);
        $(overlay).insertAfter(".grid");
        showMore(li);
    }

    //add close and arrow icons and show more info
    function showMore(li) {
        $(li).append("<i class='fas fa-times'></i>");
        $(li).append("<i class='fas fa-angle-right arrow'></i>");
        $(li).append("<i class='fas fa-angle-left arrow'></i>");
        $(".overlay li .more_info").show();
    }

// state abbreaviator
    function abbreaviator(state) {
        for (let i = 0; i < states.length; i++) {
            if (states[i][0].toLowerCase() === state) {
                return states[i][1];
            }
            ;
        }
        ;
    };

// remove overlay
    function removeOver(e) {
            if($(e.target).hasClass("fa-times") || $(e.target).hasClass("overlay")) {
                $(".overlay").fadeOut();
                setTimeout(() => $(".overlay").remove(), 500);
            }
    }

    //overlay naviagtion for employees
    function navigate() {
        let arrow = this;
        let direction = $(arrow).hasClass("fa-angle-right");
        const li = $(this).parent();
        const name = $(arrow).siblings().eq(1).find("p").eq(0).text();
        $(".grid .employee").each(function () {
            const employee = $(this).find("p").eq(0).text();
            if (name === employee) {
                if (direction) {
                    $(li).html($(this).next().html());
                } else {
                    $(li).html($(this).prev().html());
                }
                showMore(li);
            }
        });
    }

    //search for employees
    function search() {
        const search = $(this).val().replace(/[^A-Za-z]/g, '').toLowerCase();
        $(".grid .employee").each(function () {
            const employee = $(this).find("p").eq(0).text().replace(/[^A-Za-z]/g, '');
            if (employee.indexOf(search) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    };


// event handlers==========================================

    $(".grid").on("click", "li", createOverlay);

// on employee overlay click close the overlay
    $(".wrapper").on("click", ".overlay", removeOver);

// navigate through the employees overlay with arrows
    $(".wrapper").on("click", ".arrow", navigate);

//    search for employees by input
    $("#search").on("keyup", search);

});//document finish load