//var name = "Dmytro";

//let number = 7;
//const pi = 3.14;

//number = 4;

//let leftBorderWight = 200;

// number
// string - "", '', ``
// true/false
// null
// undefined
//let obj = {
//    name: 'apple',
//    color: 'green',
//    weight: 200
//}
//alert(1234);
//console.log(1233);
//console.log(number);
//let answer = confirm("Вам есть 18");
//console.log(answer);

//let answer = prompt("Вам есть 18", "");
//console.log(answer);
//console.log(4 + 4);

//let isCheeked = true,
//isClose = true;

//console.log(isCheeked && isClose);

//console.log(isCheeked || isClose);

//if (3 * 4 == 8 * 1) {
//  console.log("Верно");
//} else {
//  console.log("Ошибка");
//}

//let answer = confirm("Вам есть 18");
//if (answer) {
//  console.log("Проходите");
//} else {
//  console.log("Уходи");
//}

//const num = 50;

//if (num < 49) {
//  console.log("Неправильно");
//} else if (num > 100) {
//  console.log("Много");
//} else {
//  console.log("Верно");
//}

//for (let i = 1; i < 8; i++) {
//  console.log(i);
//}
//function logging(a, b) {
//  console.log(a + b);
//}
//logging(3, 5);

//logging(4, 8);

$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/watch/chevron-left-solid.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/watch/chevron right solid.svg"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  });

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //Modal
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation , #thanks, #order").fadeOut("slow");
  });
  $(".button_mini").on("click", function () {
    $(".overlay, #order").fadeIn("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!"),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свой почту",
          email: "Неправильно введен формат почты name@domain.com",
        },
      },
    });
  }

  valideForms("#consultation-form");
  valideForms("#consultation form");
  valideForms("#order form");

  var phoneMask = $("input[name='phone']");
  if (phoneMask) {
    phoneMask.mask("+7 (999) 999-99-99");
  }
  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  //Smooth scroll and pageup
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  new WOW().init();
});
