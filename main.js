//////////////////////////////////
// Email validation

function validation() {
  var email = document.getElementById("email").value;

  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2.3}$/;

  if (email.match(pattern)) {
    formData.classList.add("valid");
    formData.classList.remove("invalid");
    text.innerHTML = "You Email Addresss is Valid";
    text.style.color = "#00ff00";
  } else {
    FormData.classList.remove("valid");
    FormData.classList.add("invalid");
    text.innerHTML = "Please Enter Valid Email Address";
    text.style.color = "#ff0000";
  }
}

// ////////////////////////////////
// Hero Section Video popup
const modal = document.querySelector(".hero-vid", ".close-modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////
// Slider with Progress bar
$(document).ready(function () {
  $(".slider").slick({
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  //ticking machine
  var percentTime;
  var tick;
  var time = 1;
  var progressBarIndex = 0;

  $(".progressBarContainer .progressBar").each(function (index) {
    var progress = "<div class='inProgress inProgress" + index + "'></div>";
    $(this).html(progress);
  });

  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    tick = setInterval(interval, 10);
  }

  function interval() {
    if (
      $(
        '.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]'
      ).attr("aria-hidden") === "true"
    ) {
      progressBarIndex = $(
        '.slider .slick-track div[aria-hidden="false"]'
      ).data("slickIndex");
      startProgressbar();
    } else {
      percentTime += 1 / (time + 5);
      $(".inProgress").parent().parent().removeClass("yellow-text");
      $(".inProgress" + progressBarIndex)
        .parent()
        .parent()
        .addClass("yellow-text");
      $(".inProgress" + progressBarIndex).css({
        width: percentTime + "%",
      });
      if (percentTime >= 100) {
        $(".single-item").slick("slickNext");
        progressBarIndex++;
        if (progressBarIndex > 2) {
          progressBarIndex = 0;
        }
        startProgressbar();
      }
    }
  }

  function resetProgressbar() {
    $(".inProgress").css({
      width: 0 + "%",
    });
    clearInterval(tick);
  }
  startProgressbar();
  // End ticking machine

  $(".progressBarContainer div").click(function () {
    clearInterval(tick);
    var goToThisIndex = $(this).find("span").data("slickIndex");
    $(".single-item").slick("slickGoTo", goToThisIndex, false);
    startProgressbar();
  });
});

// End Of Slider
// //////////////////////////////////

// /////////////////////////////////
// Testimonials slider

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
}

// ////////////////////////////
// Add Email form to firebase database

// Unique firebase object
const firebaseConfig = {
  apiKey: "AIzaSyAKAa1f13s_zty0m-CpYYPwHIikghrJ54A",
  authDomain: "shopify-signup-c49a3.firebaseapp.com",
  projectId: "shopify-signup-c49a3",
  storageBucket: "shopify-signup-c49a3.appspot.com",
  messagingSenderId: "442289744099",
  appId: "1:442289744099:web:4ad434e22d5d7ecac2fdd6",
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("signup");

//Get Submit Form
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  //Get Form Values
  let email = document.getElementById("email").value;

  firestore
    .collection("signup")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const emailid = doc.data().email;
        if (email === emailid) {
          console.log("Email Already Exists");
        }

        // console.log("data", doc.data().fname);
      });
    });
  //Save Form Data To Firebase
  db.doc()
    .set({
      email: email,
    })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });

  //clear form after submission
  function clearForm() {
    document.getElementById("clearFrom").reset();
  }
  clearForm();
});
