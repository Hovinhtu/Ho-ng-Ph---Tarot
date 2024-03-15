// Dark mode
const dateObj = new Date();
var cssId = "dark-mode";
var toggle = document.getElementById("toggle");
var flag = false;

toggle.addEventListener("click", changeFlag);

function changeFlag(){
    flag = !flag;
    if (flag){
        darkMode();
    } else {
        removeDarkMode();
    }
}

function darkMode(){
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'dark-mode.css';
    head.appendChild(link);

    var changeImg = document.getElementById("img-2");
    changeImg.src = "./Image/Image-8.png";
}

function removeDarkMode(){
    var linkDarkMode  = document.getElementById(cssId);
    linkDarkMode.remove();

    var changeImg = document.getElementById("img-2");
    changeImg.src = "./Image/Image-2.png";
}