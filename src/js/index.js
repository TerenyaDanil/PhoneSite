import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"
import LocomotiveScroll from "locomotive-scroll"

const userAgent = navigator.userAgent.toLowerCase()
const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent)

const buttonAnimation = document.querySelectorAll(".button--animation")

const burger = document.querySelector(".burger")
const headerContent = document.querySelector(".header__content")
const headerLinks = headerContent.querySelectorAll("a[href*='#']")
const headerAnimation = headerContent.querySelectorAll(".nav__link, .header__button")

window.addEventListener("load", () => {
    const animationSection = document.querySelectorAll("[animation-section]")
    const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
            wrapper: window,
            content: document.documentElement,
            lerp: 0.1,
            duration: 1.2,
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            normalizeWheel: true,
        },
    })

    const typeSplitDeskription = new SplitType("[animation-deskription]", {
        types: "chars",
        tagName: "span",
    })

    const typeSplitTitle = new SplitType("[animation-title]", {
        types: "lines",
        tagName: "span",
    })

    gsap.registerPlugin(ScrollTrigger)

    if (animationSection.length > 0) {
        animationSection.forEach((section) => {
            const sectionDeskription = section.querySelectorAll("[animation-deskription] .char")
            const sectionTitle = section.querySelectorAll("[animation-title] .line")
            const sectionText = section.querySelectorAll("[animation-text]")

            const animationDuration = isMobile ? 0.8 : 0.5
            const animationStart = "-75%"

            if (sectionDeskription.length > 0) {
                gsap.from(sectionDeskription, {
                    y: "50%",
                    opacity: 0,
                    duration: animationDuration,
                    ease: "circ.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: animationStart,
                    },
                })
            }

            if (sectionTitle.length > 0) {
                gsap.from(sectionTitle, {
                    y: "100%",
                    opacity: 0,
                    duration: animationDuration,
                    ease: "circ.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: section,
                        start: animationStart,
                    },
                })
            }
            if (sectionText.length > 0) {
                gsap.from(sectionText, {
                    opacity: 0,
                    duration: animationDuration,
                    ease: "circ.out",
                    stagger: 0.25,
                    scrollTrigger: {
                        trigger: section,
                        start: animationStart,
                    },
                })
            }
        })
    }
})

if (isMobile) {
    if (burger) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active")

            if (headerContent) {
                headerContent.classList.toggle("active")

                if (headerContent.classList.contains("active")) {
                    gsap.from(headerAnimation, {
                        y: "50%",
                        opacity: 0,
                        duration: 0.5,
                        ease: "circ.out",
                        stagger: 0.1,
                        delay: 0.5,
                    })
                }
            }
        })
    }

    if (headerLinks.length > 0) {
        headerLinks.forEach((item) => {
            item.addEventListener("click", () => {
                burger.classList.remove("active")
                headerContent.classList.remove("active")
            })
        })
    }
}

if (buttonAnimation.length > 0 && !isMobile) {
    buttonAnimation.forEach((item) => {
        item.addEventListener("mouseenter", (e) => {
            const span = item.querySelector(".button__circle")
            span.style.top = e.pageY - item.getBoundingClientRect().top - window.scrollY + "px"
            span.style.left = e.pageX - item.getBoundingClientRect().left - window.scrollX + "px"
        })
        item.addEventListener("mouseout", (e) => {
            const span = item.querySelector(".button__circle")
            span.style.top = e.pageY - item.getBoundingClientRect().top - window.scrollY + "px"
            span.style.left = e.pageX - item.getBoundingClientRect().left - window.scrollX + "px"
        })
    })
}
