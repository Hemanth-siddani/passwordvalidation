let empDetailsList = {};

let Password = document.querySelector(".Password");

let passwordLength = () => {
    if (Password.value.length >= 8) {
        console.log(Password.value);
        Rule_01 = document.querySelector("#Rule_01");
        Rule_01.setAttribute("class", 'highLight');
    } else {
        Rule_01 = document.querySelector("#Rule_01");
        Rule_01.setAttribute("class", '');
    }
}

var password = '';
var numberCount = 0;
var specialCharCount = 0;
var upperCharCount = 0;
var minLenRuleDiv = document.querySelector("#Rule_02");
var maxLenRuleDiv = document.querySelector("#Rule_03");
var specialSymbDiv = document.querySelector("#Rule_04");
var upperCaseDiv = document.querySelector("#Rule_05");

var specialCharsAscii = [33, 64, 35, 36, 37, 38, 94];

document.getElementById('employeePass').addEventListener('keyup', (event) => passwordValidation(event));

var passwordValidation = (event) => {
    switch(rule(event.keyCode)) {
        case 0: minNumberCountCheck();
                break;
        case 1: maxNumberCountCheck();
                break;
        case 2: specialCharCheck();
                break;
        case 3: upperCaseCheck();
                break;
        case 4: updateCounts();
                break;
        default: return 'invalid keyCode';
    }
    password = document.getElementById('employeePass').value;
}

function rule(keyCode) {
    if (keyCode >= 48 && keyCode <= 57) {
        numberCount++;
        return numberCount > 2 ? 1 : 0;
    }

    if(specialCharsAscii.includes(keyCode)) {
        specialCharCount++;
        return 2;
    }

    if (keyCode >= 65 && keyCode <= 90) {
        upperCharCount++;
        return 3;
    }

    if(keyCode === 8) {
        return 4;
    }
    return 5;
}

function minNumberCountCheck() {
    if (numberCount == 1) {
        toggleHighlight(minLenRuleDiv);
        return;
    } else if(numberCount == 0) {
        toggleHighlight(minLenRuleDiv);
        return;
    }
}

function maxNumberCountCheck() {
    if (numberCount >= 3) {
        toggleHighlight(maxLenRuleDiv);
        return;
    } else if(numberCount < 3 && numberCount > 1) {
        toggleHighlight(maxLenRuleDiv);
        return;
    }
}

function specialCharCheck() {
    if(specialCharCount >= 1) {
        toggleHighlight(specialSymbDiv);
    }
}

function upperCaseCheck() {
    if (upperCharCount >= 1) {
        toggleHighlight(upperCaseDiv);
    }
}

function updateCounts() {
    var lastWord = password.split('').pop();
    if(!isNaN(lastWord)) {
        numberCount--;
        if(numberCount > 2) {
            maxNumberCountCheck();
        } else {
            minNumberCountCheck();
        }
    } else {
        if(specialCharsAscii.includes(lastWord)) {
            specialCharCount--;
            specialCharCheck();
        } else {
            upperCharCount--;
            upperCaseCheck();
        }
    }
}

function toggleHighlight(ele) {
    ele.classList.toggle('highLight');
}

let eyeOpen = () => {
    let closedEye = document.querySelector("#closedEye");
    let openedEye = document.querySelector("#openedEye");
    if(Password.type === "password") {
        Password.type = "text";
        closedEye.style.display = "inline";
        openedEye.style.display = "none"
    }
}
let eyeClose = () => {
    let closedEye = document.querySelector("#closedEye");
    let openedEye = document.querySelector("#openedEye");
    if(Password.type === "text") {
        Password.type = "password";
        openedEye.style.display = "inline";
        closedEye.style.display = "none";
    }
}

let Button = document.querySelector(".Button");

Button.addEventListener("click", (event) => {
    let Name = document.querySelector(".Name");
    let Age = document.querySelector(".Age");
    let Email = document.querySelector(".Email");
    let Mobile = document.querySelector(".Mobile");
    let Salary = document.querySelector(".Salary");
    
    let Gender = document.querySelector('input[name="gender"]:checked').value;
    console.log(event);
    event.preventDefault();

    empDetailsList.EmployeeName = Name.value;
    empDetailsList.EmployeeAge = parseInt(Age.value);
    empDetailsList.EmployeeGender = Gender;
    empDetailsList.EmployeeEmail = Email.value;
    empDetailsList.EmployeePassword = Password.value;
    empDetailsList.EmployeeSalary = parseInt(Salary.value);
    empDetailsList.EmployeeMobile = parseInt(Mobile.value);

    empDetailsList.TotalEmployeeSalary = () => {
        var pf = (empDetailsList.EmployeeSalary * 14) / 100;
        var hra = (empDetailsList.EmployeeSalary * 24) / 100;
        return (empDetailsList.EmployeeSalary + pf + hra);
    };

    // Display_Employee_Details_Block.

    let DisplayContainer = document.querySelector(".DisplayContainer");

    let DisplayEmployeeTitle = document.createElement("h2");
    DisplayEmployeeTitle.setAttribute("class","DisplayEmployeeTitle");
    DisplayEmployeeTitle.innerText = "Employee Details";
    DisplayContainer.appendChild(DisplayEmployeeTitle);

    let DisplayEmployeeName = document.createElement("div");
    DisplayEmployeeName.setAttribute("class","DisplayEmployeeName");
    DisplayEmployeeName.innerText = "Employee Name : " + empDetailsList.EmployeeName;
    DisplayContainer.appendChild(DisplayEmployeeName);

    let DisplayEmployeeAge = document.createElement("div");
    DisplayEmployeeAge.setAttribute("class","DisplayEmployeeAge");
    DisplayEmployeeAge.innerText = "Employee Age : " + empDetailsList.EmployeeAge;
    DisplayContainer.appendChild(DisplayEmployeeAge);
   
    let DisplayEmployeeGender = document.createElement("div");
    DisplayEmployeeGender.setAttribute("class","DisplayEmployeeGender");
    DisplayEmployeeGender.innerText = "Employee Gender : " + empDetailsList.EmployeeGender;
    DisplayContainer.appendChild(DisplayEmployeeGender);

    let DisplayEmployeeEmail = document.createElement("div");
    DisplayEmployeeEmail.setAttribute("class","DisplayEmployeeEmail");
    DisplayEmployeeEmail.innerText = "Employee Email : " + empDetailsList.EmployeeEmail;
    DisplayContainer.appendChild(DisplayEmployeeEmail);

    let DisplayEmployeeMobile = document.createElement("div");
    DisplayEmployeeMobile.setAttribute("class","DisplayEmployeeMobile");
    DisplayEmployeeMobile.innerText = "Employee Mobile : " + empDetailsList.EmployeeMobile;
    DisplayContainer.appendChild(DisplayEmployeeMobile);

    let DisplayEmployeeTotalSalary = document.createElement("div");
    DisplayEmployeeTotalSalary.setAttribute("class","DisplayEmployeeSalary");
    DisplayEmployeeTotalSalary.innerHTML = "Employee Total Salary : " + parseInt(empDetailsList.TotalEmployeeSalary());
    DisplayContainer.appendChild(DisplayEmployeeTotalSalary);

    DisplayContainer.style.display = "block";


    let Shield = document.querySelector(".Shield");
    Shield.style.display = "flex";
    Shield.style.justifyContent = "center";
    Shield.style.alignItems = "center";
    Shield.style.gap = "50px";

    let Form = document.querySelector(".Form");
    Form.style.margin = "0px";

    Form.style.display = "none";

    let passwordRules = document.querySelector(".passwordRules");
    passwordRules.style.display = "none";

});


