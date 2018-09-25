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
    function fetchData(url){
        fetch("https://randomuser.me/api/?results=12&nat=us")
        .then(res => res.json())
        .then(data => createCards(data.results))
    }
    
fetchData();

// helpers function==================================

// creates employee from data passed
function createEmployee(data){
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
            <div class="birthday">Birthday: 01/04/85</div>
        </div>
    </li>`

    $(".grid").append(li);
    $(".more_info").hide();
}

// creates card depending on the length of the request
function createCards(data){
    $(data).each(function() {
        createEmployee(this);
    });
}


// create overlay on employee click
function createOverlay(){
    const li = $(this).clone();
    $(li).append("<i class='fas fa-times'></i>");
    $(li).append("<i class='fas fa-angle-right'></i>");
    $(li).append("<i class='fas fa-angle-left'></i>");
    const overlay = document.createElement("div");
    $(overlay).addClass("overlay");
    $(overlay).append(li);
    $(overlay).insertAfter(".grid");
    $(".overlay li .more_info").show();
}

// state abbreaviator
function abbreaviator(state){
    for (let i = 0; i < states.length; i++){
        if(states[i][0].toLowerCase() === state){
            return states[i][1];
        };
    };
};

// remove overlay
function removeOver(){
    $(".overlay").fadeOut();
    setTimeout(() => $(".overlay").remove(), 500);
}

// get the next overlay of employee
function next(e){
    const target = e.target;
    const direction = $(target).hasClass("fa-angle-right");
    let li = $(target).parent();
    const text = $(li).children()[0];
    let src = $(text).attr("src");

    $(".grid .employee").each(function(){
        if(direction && $(this).children()[0].src === src){
            if($(this).next().length === 1){
                $(li).html($(this).next().html());
                $(li).append("<i class='fas fa-times'></i>");
                $(li).append("<i class='fas fa-angle-right'></i>");
                $(li).append("<i class='fas fa-angle-left'></i>");
                $(".overlay li .more_info").show();
            }
        }
    });
}

// get previous employee and put on overlay
function prev(e){
    const target = e.target;
    const direction = $(target).hasClass("fa-angle-left");
    let li = $(target).parent();
    const text = $(li).children()[0];
    let src = $(text).attr("src");

    $(".grid .employee").each(function(){
        if(direction && $(this).children()[0].src === src){
            if($(this).prev().length === 1){
                $(li).html($(this).prev().html());
                $(li).append("<i class='fas fa-times'></i>");
                $(li).append("<i class='fas fa-angle-right'></i>");
                $(li).append("<i class='fas fa-angle-left'></i>");
                $(".overlay li .more_info").show();
            }
            
        }
    });
}


// event handlers==========================================

$(".grid").on("click","li", createOverlay);

// on employee overlay click close the overlay
$(".wrapper").on("click",".fa-times", removeOver);

// next employee show and remove the current one from overlay
$(".wrapper").on("click", ".overlay", next);
$(".wrapper").on("click", ".overlay", prev);

});//document finish load


