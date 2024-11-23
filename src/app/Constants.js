export const ITEMS_PER_PAGE = 20;
export const TOTAL_ITEMS = 110;

export function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring((name + "=").length, cookie.length);
        }
    }
    return null;
}