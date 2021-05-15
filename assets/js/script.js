//Questions:
// 1) How do i get my date time to use "th" "st" "rd" "nd"

// Time related variables
let timeDisplay = document.getElementById("currentDay");
let DateTime = luxon.DateTime;
let today = DateTime.local();
let hour = {hour: "2-digit"};
let currentHour = DateTime.now().toLocaleString(hour);
let currentHourStamp = today.get("hour");

// Save related variables
let saveBtn = document.getElementsByClassName("saveBtn");
let textArea = document.querySelectorAll("textarea");
let hourDiv = document.querySelectorAll(".hour");

let textContentEl = [
    $("#text8"),
    $("#text9"),
    $("#text10"),
    $("#text11"),
    $("#text12"),
    $("#text13"),
    $("#text14"),
    $("#text15"),
    $("#text16"),
    $("#text17"),
]

// This displays the current day
timeDisplay.textContent = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

// This array allows me to access the set times for each time slot
let setHours = [
    today.set({hour: 8}),
    today.set({hour: 9}),
    today.set({hour: 10}),
    today.set({hour: 11}),
    today.set({hour: 12}),
    today.set({hour: 13}),
    today.set({hour: 14}),
    today.set({hour: 15}),
    today.set({hour: 16}),
    today.set({hour: 17}),
];

// Associates a specific hour with each timeslot
for (i = 0; i < hourDiv.length; i++) { 
    hourDiv[i].textContent = setHours[i].toLocaleString(hour); 
}

// I need to get it so each time of day changes the color coding for the slot

if (setHours[9].get("hour") < currentHourStamp) {
    textContentEl[9].attr("class", "past");
}
if (setHours[9].get("hour") > currentHourStamp) {
    textContentEl[9].attr("class", "future");
}
if (setHours[9].get("hour") === currentHourStamp) {
    textContentEl[9].attr("class", "present");
}

// This function saves the content in the text areas.
function saveTextContent() {
    // saving entered content into an object
    let savedText = {
        hour8: textArea[0].value,
        hour9: textArea[1].value,
        hour10: textArea[2].value,
        hour11: textArea[3].value,
        hour12: textArea[4].value,
        hour13: textArea[5].value,
        hour14: textArea[6].value,
        hour15: textArea[7].value,
        hour16: textArea[8].value,
        hour17: textArea[9].value,
    };
    // sending saved content to local storage and converting into a string
    localStorage.setItem("savedText", JSON.stringify(savedText));
    return;
};

// This will render the saved content on the page so it stays there until you input new content.
function renderTextContent() {
    // Converts text in local storage back to an object.
    let storedText = JSON.parse(localStorage.getItem("savedText"));
    // Makes sure the saved text content stays in the text box.
    if (storedText !== null) {
        textArea[0].innerHTML = storedText.hour8;
        textArea[1].innerHTML = storedText.hour9;
        textArea[2].innerHTML = storedText.hour10;
        textArea[3].innerHTML = storedText.hour11;
        textArea[4].innerHTML = storedText.hour12;
        textArea[5].innerHTML = storedText.hour13;
        textArea[6].innerHTML = storedText.hour14;
        textArea[7].innerHTML = storedText.hour15;
        textArea[8].innerHTML = storedText.hour16;
        textArea[9].innerHTML = storedText.hour17;
    }
    return;
};

// save button will run the saveTextContent function
for (q of saveBtn) {
    q.addEventListener("click", function (event) {
        event.preventDefault();
        saveTextContent();
    }
    )};

// this function must be run separate from any buttons, so that local storage is immediately rendered on the page upon load.
renderTextContent();
