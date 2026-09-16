import type { Day, ScheduledClass, SelectedSection } from "$lib/common/course-interfaces";
import { SvelteMap } from "svelte/reactivity";

// Scheduled class interface
interface ScheduleItem {
    section: SelectedSection;
    scheduleData: ScheduledClass;
}

// RowData interface
interface RowData {
    earliestHour: number,
    latestHour: number,
    divRows: number,
}

/**
 * Get earliest hour, latest hour of, 
 * and number of rows in, the final schedule
 */
function ScheduleTime(schedule: SvelteMap<Day, Array<ScheduleItem>>): RowData {
    let earliest = Infinity;
    let latest = -Infinity;

    // For each day...
    schedule.values().forEach((items) => {
        // For each block
        items.forEach((item) => {
            // Get start and end of scheduled block
            const start = item.scheduleData.timeStart;
            const end = item.scheduleData.timeEnd;

            // Get earliest between saved earliest and item
            earliest = Math.min(
                earliest,
                start.hour * 60 + start.minute
            );

            // Get latest between saved earliest and item
            latest = Math.max(
                latest,
                end.hour * 60 + end.minute
            );
        })
    })

    // If none found, set to 0
    if (earliest === Infinity) {
        return {
            earliestHour: 0,
            latestHour: 0,
            divRows: 0
        };
    }

    return {
        // Pad to hour
        earliestHour: Math.floor(earliest / 60),
        latestHour: Math.ceil(latest / 60),
        
        // Pad to hour and divide to 15-min intervals
        divRows: Math.ceil(((latest - (latest % 60)) - (earliest - (earliest % 60)) + 60) / 15)
    };
}

export { 
    type ScheduleItem, 
    type RowData,
    ScheduleTime 
}