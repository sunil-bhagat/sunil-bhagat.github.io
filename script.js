/**
 * saving the current tab to sessionstorage , so it remains active even after page refresh.
 */
var activeTab = sessionStorage.getItem('activeTab') ? sessionStorage.getItem('activeTab') : "Home";
var activeNav = sessionStorage.getItem('activeNav') ? sessionStorage.getItem('activeNav') : 'hometab';
if (activeTab) {
    document.getElementById(activeNav).dispatchEvent(new Event('click'));
}


let imagesArr = localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [];
let temp;
/**
 * inserting default images if the local storage is empty.
 */
if (imagesArr.length == 0) {
    imagesArr[0] = {
        imgName: "Nice view",
        imgUrl: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        imgDate: new Date("1/02/2016"),
        imgInfo: "nice ocean view"
    };
    imagesArr[1] = {
        imgName: "lake side view",
        imgUrl: "https://i.pinimg.com/originals/5a/e5/8f/5ae58f5036997cfd4636917403c3c951.jpg",
        imgDate: new Date("1/02/2016"),
        imgInfo: "Lake Side View"
    };
    imagesArr[2] = {
        imgName: "Golden panther",
        imgUrl: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        imgDate: new Date("1/02/2016"),
        imgInfo: "awesome"
    };
    imagesArr[3] = {
        imgName: "Gdsdser",
        imgUrl: "https://www.w3schools.com/howto/img_snow.jpg",
        imgDate: new Date("1/02/2016"),
        imgInfo: "awesome"
    };
    imagesArr[4] = {
        imgName: "Gdevr",
        imgUrl: "https://images-cdn.9gag.com/photo/aVY8KMP_460s.jpg",
        imgDate: new Date("1/02/2016"),
        imgInfo: "awesome"
    };
}

for (var i = 0; i < imagesArr.length; i++) {
    updateGallery(imagesArr[i].imgUrl)
}

/**
 * change between different nav-bar tabs and manage active tab.
 * @param {*} curr 
 */
function toggleDivs(curr) {
    var arr = ['Home', 'ContactMe', 'AboutMe', 'Gallery']
    event.target.classList.add('active');
    var links = document.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) {
        if (links[i] === event.target) continue;
        links[i].classList.remove('active');
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == curr) {
            document.getElementById(arr[i]).style.display = "block";
            sessionStorage.setItem('activeTab', curr);
            sessionStorage.setItem('activeNav', event.target.id);
        } else {
            document.getElementById(arr[i]).style.display = "none";
        }
    }
}
/**
 * validate the contact me form details.
 */
function validate() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('Email').value;
    let number = document.getElementById('telephone').value;
    let message = document.getElementById('message').value;
    if (name == '' || email == '' || number == '' || message == '') {
        alert("Please fill out all the details")
    } else {
        let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let numberformat = /^\d{10}$/;
        if (!email.match(emailformat)) {
            alert("Invalid email format.");
        } else if (!number.match(numberformat)) {
            alert("please enter 10 digit number");

        }
        else {
            alert("Your query has been submitted.");
            document.getElementById('formcss').reset();
        }
    }
}
/**
 * crates a image element eith given url and add it to the gallery.
 * @param {*} url 
 */
function updateGallery(url) {

    let div = document.createElement('div');
    let img = document.createElement('img');
    img.addEventListener('click', showDetails);
    img.setAttribute('src', url);
    img.classList.add('img-thumbnail');
    div.appendChild(img);
    document.getElementById('gallery-grid').appendChild(div);
}

function isUrl(url) {
    let img = document.createElement('img');;
    img.setAttribute('src', url);
            if (img.naturalHeight + img.naturalWidth === 0 && img.height+img.width === 0) {
                return false;
            }
        return true;
}

/**
 * This method is used to add new image details to th local storage and call updateGallery();
 */
function addImage() {
    let imgName = document.getElementById('imgname').value;
    let imgUrl = document.getElementById('imgurl').value;
    let imgDate = new Date(document.getElementById('imgdate').value);
    let imgInfo = document.getElementById('imginfo').value;
    let img = document.createElement('img');
    img.setAttribute('src', imgUrl);
    if (imgName != '' && imgUrl != '' && imgDate != '' && imgInfo != '') {
        img.onload = function () {
            if(new Date(imgDate)> new Date()){
                alert("Invalid date format");
                return;
            }
            let imgDetails = {
                imgName,
                imgUrl,
                imgDate,
                imgInfo
            }
            imagesArr.push(imgDetails);
            localStorage.setItem('images', JSON.stringify(imagesArr));
            updateGallery(imgUrl)
        }
        img.onerror = function () {
            alert("Invalid Url.");
            return;;
        }
    } else {
        alert("please fill all the  required fields.")
    }
}
/**
 * show the image details when clicked on.
 * @param {*} e 
 */
function showDetails(e) {
    let element = e.target;
    let url = element.getAttribute('src');
    var i = 0;
    for (i = 0; i < imagesArr.length; i++) {
        if (url == imagesArr[i].imgUrl) {
            break;
        }
    }
    document.getElementById('imgnameedit').value = imagesArr[i].imgName;
    document.getElementById('imgurledit').value = imagesArr[i].imgUrl;
    document.getElementById('imgdateedit').value = imagesArr[i].imgDate;
    document.getElementById('imginfoedit').value = imagesArr[i].imgInfo;
    temp = i;
    document.getElementById('img-details').style.visibility = "visible";
}

function closeEdit() {
    document.getElementById('img-details').style.visibility = "hidden";
}

function saveEdit() {
    if (new Date(document.getElementById('imgdateedit').value) > new Date() || !isUrl(document.getElementById('imgurledit').value) || document.getElementById('imgnameedit').value == '') {
        alert("please check  edits again.");
        return;
    }
    var image = document.querySelector(`img[src = "${imagesArr[temp].imgUrl}" ]`);
    imagesArr[temp].imgName = document.getElementById('imgnameedit').value;
    imagesArr[temp].imgUrl = document.getElementById('imgurledit').value;
    imagesArr[temp].imgDate = document.getElementById('imgdateedit').value;
    imagesArr[temp].imgInfo = document.getElementById('imginfoedit').value;
    document.getElementById('img-details').style.visibility = "hidden";
    localStorage.setItem('images', JSON.stringify(imagesArr));
    image.src = document.getElementById('imgurledit').value;
    temp = undefined;
    alert("Changes has been saved.")

}
function deleteImage() {
    document.getElementById('img-details').style.visibility = "hidden";
    var image = document.querySelector(`img[src = "${imagesArr[temp].imgUrl}" ]`);
    imagesArr.splice(temp, 1);
    localStorage.setItem('images', JSON.stringify(imagesArr));
    temp = undefined;
    image.parentNode.parentNode.removeChild(image.parentNode);
    // $( ".gallery-grid" ).load(window.location.href + ".gallery-grid" );

}

