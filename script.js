// const scroll = new LocomotiveScroll({
//     el: document.querySelector('main'),
//     smooth: true
// });

var timeout;


const MouseFollowerSkewser = () => {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        this.clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.6, 1.4, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.6, 1.4, dets.clientX - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        MouseFollower(xscale, yscale);

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px ,${dets.clientY}px) scale(1, 1)`
        }, 100)
    })
}

const MouseFollower = (xscale, yscale) => {
    window.addEventListener("mousemove", function detail(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px ,${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

const BoundingAnime = () => {
    var tl = gsap.timeline()

    tl.from("nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".bounding-elem", {
        y: 0,
        duration: 2,
        stagger: .2,
        delay: -1,
        ease: Expo.easeInOut
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,       
        ease: Expo.easeInOut
    })
}

const pictureHoverMover = () => {
    document.querySelectorAll(".elem").forEach(function(elem){
        elem.addEventListener("mousemove", function(dets){

            var diff = dets.clientY - elem.getBoundingClientRect().top;
            
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power1,
                top: diff,
                left: dets.clientX,
            });

        });
    });
}


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        // transform: 'translate(-50%, -50%)',
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });


MouseFollower()
BoundingAnime()
MouseFollowerSkewser()
// pictureHoverMover()
