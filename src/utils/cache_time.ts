import { KEY_POSTS, TIME_CACHE } from "../stores/posts";
import { clearItem, getItem } from "./storage";

export const hasPassedThreeDays = () => {
    const currentDate = new Date();
    const savedTime = new Date(getItem(TIME_CACHE));
    const timeDifference = currentDate.getTime() - savedTime.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysPassed >= 3) {
        clearItem(KEY_POSTS)
    }
}