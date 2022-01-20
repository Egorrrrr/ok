
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteAllCookies() {
    if (document.cookie != null) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}
function showMd(e) {

    var title = e.getElementsByClassName("card-title")[0].innerHTML
    var pic = e.getElementsByTagName("img")[0].src
    var price = e.getElementsByTagName("span")[0].innerHTML
    var mpr = document.getElementById("price").innerHTML = price
    var mt = document.getElementById("title").innerHTML = title
    var mp = document.getElementById("pic").src = pic
    console.log(pic)
    $('#mod').modal({ backdrop: 'static', keyboard: false })
    var md = document.getElementById("mod")
    console.log(md)
    $("#mod").modal('show');

}

function cross(e) {
    var vis = e.getElementsByClassName("rem")[0].style.display == "flex"
    e.getElementsByClassName("rem")[0].style.display = vis ? "none" : "flex"
}

function checkProdAndIncrement(cart, name) {
    var is = false
    cart.stuff.forEach(element => {
        if (element.name == name) {
            console.log("Trt")
            element.qty += 1
            is = true
            return true
        }
    });
    return is

}
function addToCart(e) {
    var cart = {}
    cart.stuff = []
    if (getCookie("cart") != undefined) {

        cart = JSON.parse(getCookie("cart"))
    }

    var mt = document.getElementById("title").innerHTML
    if (!checkProdAndIncrement(cart, mt)) {
        var mp = document.getElementById("pic").src
        var price = parseInt(document.getElementById("price").innerHTML.replace("$", ""))
        var prodcut = {}
        prodcut.name = mt;
        prodcut.pic = mp;
        prodcut.qty = 1
        prodcut.price = price
        cart.stuff.push(prodcut)
        console.log("pushed")
    }
    deleteAllCookies()
    console.log(cart)
    setCookie("cart", JSON.stringify(cart))
    $("#mod").modal('hide');

}

function fillCart() {
    var crt = JSON.parse(getCookie("cart"))
    var mcrt = document.getElementById("cart");
    mcrt.innerHTML = ""
    console.log(mcrt)
    console.log(crt)
    crt.stuff.forEach((element) => {
        mcrt.innerHTML += `<li class="list-group-item" onmouseenter="cross(this)" onmouseleave="cross(this)" style="max-height: 250px;">
        <h5>${element.name} x ${element.qty}</h5>

        <div class="d-flex flex-row justify-content-sm-between">
            <img class="card-img-top h-25 w-25" src="${element.pic}" alt="Card image cap">
            
            <input name="" id=""  style="display: none;" onclick="remove(this)" class="btn btn-sm btn-warning rem h-25 " type="button" value="X">
        </div>
        <div class="itm d-flex justify-content-sm-end"  style="width: 40rem;">

            <div class="d-flex">
                
                <span class="badge badge-secondary m-3">$${element.price * element.qty}</span>

            </div>

        </div>

    </li>
    `
    });
    var tot = document.getElementById("total")
    var sum = 0
    crt.stuff.forEach(element => {
        sum += element.price * element.qty
    });
    tot.innerHTML = "$" + sum
}


$(document).ready(function () {

    if (document.location.pathname == "/cart.html") {
        fillCart();
    }
    else {
        var input = document.getElementById("inp");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("send").click();
            }
        });
    }
    var shop = document.getElementById("things");
    shop.innerHTML = ""
    for (let index = 0; index < 12; index++) {
        shop.innerHTML += `
        <div class="col-auto mb-3 ex" onclick="showMd(this)">
                        <div class="card" style="width: 20rem;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">Item #${index}</h5>
                                <img src="https://picsum.photos/seed/0pic${index}/200/200" class="img img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                                <span class="badge badge-pill badge-info w-25 mt-3">$${index * 10 + 10}</span>
                            </div>
                        </div>
                    </div>
        `
    }
});

function remove(e) {
    console.log(e.parentNode.parentNode)
    var li = e.parentNode.parentNode;
    var name = li.getElementsByTagName("h5")[0].innerHTML
    var realname = name.substr(0, name.indexOf("x") - 1)
    var price = parseInt(name.substr(name.indexOf("x") + 2, name.length))
    cart = JSON.parse(getCookie("cart"))
    deleteAllCookies()
    cart.stuff.forEach(element => {
        if (element.name == realname) {
            if (element.qty > 1) {
                console.log(element.name + " " + realname)
                element.qty -= 1
            }
            else {
                cart.stuff.splice(element, 1)
            }
        }
    });
    setCookie("cart", JSON.stringify(cart))
    fillCart()

}

function* pseudoRandom(seed) {
    let value = seed;

    while (true) {
        value = value * 255 % 2147483647
        yield value;
    }

};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function page(e) {
    var pbtns = document.getElementsByClassName("page-link")
    console.log(pbtns)
    for (let item of pbtns) {
        item.className = "page-link"

    }
    e.className = "page-link bg-warning";
    var shop = document.getElementById("things");
    shop.innerHTML = ""
    for (let index = 0; index < 12; index++) {
        shop.innerHTML += `
        <div class="col-auto mb-3 ex" onclick="showMd(this)">
                        <div class="card" style="width: 20rem;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">Item #${index + ((parseInt(e.innerHTML) - 1) * 12)}</h5>
                                <img src="https://picsum.photos/seed/${e.innerHTML}pic${index}/200/200" class="img img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                                <span class="badge badge-pill badge-info w-25 mt-3">$${index * 10 + 10}</span>
                            </div>
                        </div>
                    </div>
        `
    }

}

var cs = false;
function coll() {
    if (!cs) {
        $("#sidebar").hide(23, function () {

        });
        cs = true
    }
    else {
        $("#sidebar").show(23, function () {

        });
        cs = false
    }

}
var ch = false;
function cht() {
    if (!ch) {
        $("#cht").hide(23, function () {

        });
        ch = true
        document.getElementById("inp").style.display = "none"
    }
    else {
        $("#cht").show(23, function () {

        });
        ch = false
        document.getElementById("inp").style.display = "block"
    }

}


function send() {
    document.getElementById("cht").innerHTML += `
    <div class="d-flex flex-row p-3 justify-content-end">
                    <div class="bg-white mr-2 p-3"><span class="text-muted">${document.getElementById("inp").value}</span></div> 
                </div>
    `
    document.getElementById("inp").value = ""
}


$( document ).ready(function() {
    setInterval(function time(){
    var d = new Date();
    var hours = 24 - d.getHours();
    var min = 60 - d.getMinutes();
    if((min + '').length == 1){
      min = '0' + min;
    }
    var sec = 60 - d.getSeconds();
    if((sec + '').length == 1){
          sec = '0' + sec;
    }
    jQuery('#countdown #hour').html(hours);
    jQuery('#countdown #min').html(min);
    jQuery('#countdown #sec').html(sec);
  }, 1000); });