import ReactHtmlParser from 'react-html-parser';

export const clearMetaData = (props: {
    title?: string,
    description?: string,
    keywords?: string,
    icon?: string
    }) => {
    console.log("clearMetaData");
    if(props.title){
        document.querySelector('meta[name="title"]')?.remove();
        document.querySelector('title')?.remove();
    }
    if(props.description){
        document.querySelector('meta[name="description"]')?.remove();
    }
    if(props.icon){
        document.querySelector('link[rel="icon"]')?.remove();
    }
    if(props.keywords){
        document.querySelector('meta[name="keywords"]')?.remove();
    }
}
export const getSEOWeb = (props: {
    title?: string,
    description?: string,
    keywords?: string,
    icon?: string
}) => {
    let meta = {
        title: props.title ?? "ABC Learning",
        description: props.description ?? 'With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions.',
        canonical: window.location.href,
        meta: {
            "charset": 'utf-8',
            "name": {
                "RATING": "search engine optimization",
                "keywords": props.keywords ?? 'Abc e-learning, abc elearning, study online, practice test, practice question, exam prepare, asvab, teas exam, cdl test, cdl practice, cissp exam, cissp practice, accuplacer, comptia practice test, comptia A+, compTIA Network, comptia security, dmv, dmv practice test, driving theory, driving theory UK, G1 test, GED, hesi, hesi A2, motorcycle permit, pmp, pmp exam, ptcb, ptce, real estate exam, practice app, practice test onl, free practice test, free practice questions, free practice app',
                "robots": "index,follow",
                "fragment": "!",
                "Search Engines": `www.altaVista.com, www.aol.com, www.infoseek.com, www.excite.com, 
                                   www.hotbot.com, www.lycos.com, www.magellan.com, www.looksmart.com, 
                                   www.cnet.com, www.voila.com, www.google.fr, www.google.com, 
                                   www.google.com.vn, www.yahoo.fr, www.yahoo.com,www.alltheweb.com, 
                                   www.msn.com, www.netscape.com, www.nomade.com`,
                "title": props.title ?? 'ABC Learning',
                "description": props.description ?? 'With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions.'
            }
        },
    };
    if(props.icon){
        meta = Object.assign(meta, {
            link: {
                rel: {
                    icon: props.icon ?? "./favicon.ico",
                }
            }
        })
    }
    return meta;
}

export function onScrollElementAtParentElement(childClass: string, parentClass: string, offset?: number) {
    if(!offset){
        offset = 0;
    }
    let childElement = document.querySelector(childClass);
    let parentElement = document.querySelector(parentClass);
    let isMobileScreen = window.innerWidth <= 768;
    if(childElement && parentElement){
        let sHeight = childElement.getBoundingClientRect()?.x;
        parentElement.scrollTo({ top: sHeight + (isMobileScreen ? 0 : sHeight / 3) + offset, behavior: 'smooth' });
    }
}

export function onScrollToElement(childClass: string, offset?: number) {
    if(!offset){
        offset = 0;
    }
    let childElement = document.querySelector(childClass);
    let isMobileScreen = window.innerWidth <= 768;
    if(childElement){
        window.scrollTo({ top: childElement.scrollHeight + (isMobileScreen ? 0 : childElement.clientHeight / 3) + offset, behavior: 'smooth' });
    }
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function stringToHtml(str: string) {
    return ReactHtmlParser(str.replace(/<o:p>/g, '').replace(/<\/o:p>/, ''));
}