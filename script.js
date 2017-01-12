site = {};
site.dancers = []
url = window.location.href;
stuff = url.split('?');

site.init = function() {
    site.face = document.getElementById("img");
    site.dancer1 = document.getElementById("dancer1");
    site.dancer2 = document.getElementById("dancer2");
    site.dancers.push(site.dancer1);
    site.dancers.push(site.dancer2);
    site.dancer1.style.opacity = "0";
    site.dancer2.style.opacity = "0";
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
    site.click = 0;
    site.play = true;
    if (stuff[1] == 'autoplay') {
        site.face.className = "";
        site.dancers.push(site.face);
        document.getElementById("song").play();
        setTimeout(site.startdance, 3000);
        site.play = true;
    } else {
        site.face.addEventListener("mousedown", site.mousedown);
        site.face.addEventListener("mouseup", site.mouseup);
        site.dancing = false;
    }
    site.loop();
}

site.loop = function() {
    setTimeout(site.loop, 1000 / 60);
    if (site.dancing) {
        site.dancing = false;
        for (i = 0; i < site.dancers.length; i++) {
            site.transfig(true, site.dancers[i]);
        }
        setTimeout(site.dance, (Math.floor(Math.random() * 40) + 0)*10)
    }
}

site.dance = function() {
    for (i = 0; i < site.dancers.length; i++) {
        site.transfig(false, site.dancers[i]);
    }
    setTimeout(site.setdancing, (Math.floor(Math.random() * 40) + 0)*10)
}

site.setdancing = function() {
    site.dancing = true;
}

site.startdance = function() {
    site.dancer1.style.opacity = "1";
    site.dancer2.style.opacity = "0";
    setTimeout(site.startdance2, 200)
}

site.startdance2 = function() {
    site.dancer1.style.opacity = "1";
    site.dancer2.style.opacity = "1";
    setTimeout(site.continuedance, 2500)
}

site.continuedance = function() {
    site.dancing = true;
}

site.transfig = function(v, a) {
    if (v) {
        a.style.webkitTransform="scale(0.5)"
        a.style.msTransform="scale(0.5)"
        a.style.MozTransform="scale(0.5)"
        a.style.OTransform="scale(0.5)"
        a.style.transform="scale(0.5)"
        //document.getElementById("debug").innerHTML = "Shink"
    } else {
        a.style.webkitTransform="scale(1)"
        a.style.msTransform="scale(1)"
        a.style.MozTransform="scale(1)"
        a.style.OTransform="scale(1)"
        a.style.transform="scale(1)"
        //document.getElementById("debug").innerHTML = "Grow"
    }
    if (Math.floor(Math.random() * 2) == 1) {
        //document.getElementById("debug").innerHTML = site.click;
        if (v) {
            //document.getElementById("debug").innerHTML = "Rotating 10deg";
            a.style.webkitTransform="rotate(10deg)"
            a.style.msTransform="rotate(10deg)"
            a.style.MozTransform="rotate(10deg)"
            a.style.OTransform="rotate(10deg)"
            a.style.transform="rotate(10deg)"
        } else {
            //document.getElementById("debug").innerHTML = "Rotating -10deg";
            a.style.webkitTransform="rotate(-10deg)"
            a.style.msTransform="rotate(-10deg)"
            a.style.MozTransform="rotate(-10deg)"
            a.style.OTransform="rotate(-10deg)"
            a.style.transform="rotate(-10deg)"
        }
    }
    a.style.transition="all 0.1s"
    a.style.WebkitTransition="all 0.1s"
}

site.mousedown = function() {
    site.face.className = "";
    site.transfig(true, site.face);
    if (site.click >= 5) {
        site.click = 0;
    } else {
        site.click++;
    }
}

site.mouseup = function() {
    site.transfig(false, site.face);
    if (site.play) {
        document.getElementById("song").play();
        setTimeout(site.startdance, 3000);
        site.play = false
    }
}

window.onload = function() {
  site.init();
}
