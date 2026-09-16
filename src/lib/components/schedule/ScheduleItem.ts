import type { Day, ScheduledClass, SelectedSection } from "$lib/common/course-interfaces";
import { SvelteMap } from "svelte/reactivity";

interface ScheduleItem {
    section: SelectedSection;
    scheduleData: ScheduledClass;
}

function ScheduleTime(schedule: SvelteMap<Day, Array<ScheduleItem>>) {
    let earliest = Infinity;
    let latest = -Infinity;

    for (const items of schedule.values()) {
        for (const item of items) {
            const start = item.scheduleData.timeStart;
            const end = item.scheduleData.timeEnd;

            earliest = Math.min(
                earliest,
                start.hour * 60 + start.minute
            );

            latest = Math.max(
                latest,
                end.hour * 60 + end.minute
            );
        }
    }

    if (earliest === Infinity) {
        return {
            earliestHour: 0,
            latestHour: 0,
            divRows: 0
        };
    }

    return {
        earliestHour: Math.floor(earliest / 60),
        latestHour: Math.ceil(latest / 60),
        divRows: Math.ceil(((latest - (latest % 60)) - (earliest - (earliest % 60)) + 60) / 15)
    };
}

export { 
    type ScheduleItem, 
    ScheduleTime 
}