// Time related variables
let timeDisplay = document.getElementById("currentDay");
let DateTime = luxon.DateTime;
let today = DateTime.local();
let hour = { hour: "2-digit" };
let currentHourStamp = today.get("hour");
let weekday = DateTime.now().toLocaleString({ weekday: "long" });
let month = DateTime.now().toLocaleString({ month: "long" });
let day = DateTime.now().toLocaleString({ day: "numeric" });
let daySuffix;

// Save related variables
let saveBtn = document.getElementsByClassName("saveBtn");
let textArea = document.querySelectorAll("textarea");
let hourDiv = document.querySelectorAll(".hour");

// This array allows me to access the the text content of each div.
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

// This array allows me to access the set times for each time slot.
let setHours = [
    today.set({ hour: 8 }),
    today.set({ hour: 9 }),
    today.set({ hour: 10 }),
    today.set({ hour: 11 }),
    today.set({ hour: 12 }),
    today.set({ hour: 13 }),
    today.set({ hour: 14 }),
    today.set({ hour: 15 }),
    today.set({ hour: 16 }),
    today.set({ hour: 17 }),
];

// These statements make sure the day is listed as an ordinal.
if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
} else if (day === 2 || day === 22) {
    daySuffix = "nd";
} else if (day === 3 || day === 23) {
    daySuffix = "rd";
} else {
    daySuffix = "th";
}

// This displays the current day, including the day number as an ordinal.
timeDisplay.textContent = weekday + ", " + month + " " + day + daySuffix;


// This loop associates a specific hour with each timeslot.
for (i = 0; i < hourDiv.length; i++) {
    hourDiv[i].textContent = setHours[i].toLocaleString(hour);
}

// This loop will change the color of each time slot based on the hour.
for (z = 0; z < setHours.length; z++) {
    if (setHours[z].get("hour") < currentHourStamp) {
        textContentEl[z].attr("class", "past");
    }
    if (setHours[z].get("hour") > currentHourStamp) {
        textContentEl[z].attr("class", "future");
    }
    if (setHours[z].get("hour") === currentHourStamp) {
        textContentEl[z].attr("class", "present");
    }
}

// This function saves the content in the text areas.
function saveTextContent() {
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
    // This code will send saved content to local storage and convert it into a string.
    localStorage.setItem("savedText", JSON.stringify(savedText));
    return;
};

// This function will render the saved content on the page so it stays there until you input new content.
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

// This save button will run the saveTextContent function.
for (q of saveBtn) {
    q.addEventListener("click", function (event) {
        event.preventDefault();
        saveTextContent();
    }
)
};

// This function must be run separate from any buttons, so that local storage is immediately rendered on the page upon load.
renderTextContent();