<script lang="ts">
    import ScheduleHourDivider from "./ScheduleHourDivider.svelte";
    import { ScheduleTime, type ScheduleItem } from "./ScheduleItem";
    import { SvelteMap } from "svelte/reactivity";

	let { daySchedule, divRows, hourData }: { daySchedule: Array<ScheduleItem> | undefined, divRows: number, hourData: { earliestHour: number, latestHour: number } } = $props();

    function timeToRow(time: { hour: number; minute: number }, earliestHour: number): number {
        return (time.hour - earliestHour) * 4 + Math.floor(time.minute / 15);
    }
    
    interface ScheduleDiv {
        flex: number;
        data: ScheduleItem | undefined;
    }

    let dayArray: Array<ScheduleDiv> = $derived.by(() => {
        const blocks: ScheduleDiv[] = [];
        let currentCursorRow = 0;

        for (const item of daySchedule ?? []) {
            const startRow = timeToRow(
                item.scheduleData.timeStart,
                hourData.earliestHour
            );

            const endRow = timeToRow(
                item.scheduleData.timeEnd,
                hourData.earliestHour
            );

            // Empty space before the class
            if (startRow > currentCursorRow) {
                blocks.push({
                    flex: startRow - currentCursorRow,
                    data: undefined
                });
            }

            // Class itself
            blocks.push({
                flex: endRow - startRow,
                data: item
            });

            // Move cursor to the end of the class
            currentCursorRow = endRow;
        }

        // Fill the remainder of the padded timeline
        if (currentCursorRow < divRows) {
            blocks.push({
                flex: divRows - currentCursorRow,
                data: undefined
            });
        }

        return blocks;
    });
</script>

<div class="grid grid-cols-1 grid-rows-1 h-full">
    <div class="col-start-1 row-start-1 h-full">
        <ScheduleHourDivider divRows={divRows} />
    </div>
    
    <div class="col-start-1 row-start-1 h-full">
        <div class="flex flex-col p-1 h-full items-center">
            {#each dayArray as item}
                <div style="flex: {item.flex}" class="flex min-w-full">
                    {#if item.data}
                        <div class="card preset-outlined-primary-500 bg-primary-950/20 backdrop-blur-[2px] flex flex-col min-w-full justify-between">
                            <!-- Start Time -->
                            <div class="flex flex-row justify-center text-surface-300">
                                <div class="text-[0.70rem]">
                                    {item.data.scheduleData.timeStart.hour}:{item.data.scheduleData.timeStart.minute < 10 ? '0' + item.data.scheduleData.timeStart.minute : item.data.scheduleData.timeStart.minute} 
                                </div>
                            </div>

                            <!-- Section Data -->
                            <div class="flex flex-col text-md leading-none">
                                <div>
                                    {item.data.section.course} ({item.data.section.section.section})
                                </div>
                                <div>
                                    {item.data.scheduleData.room}
                                </div>
                            </div>
                            <!-- End Time -->
                            <div class="flex flex-row justify-center text-surface-300">
                                <div class="text-[0.70rem]">
                                    {item.data.scheduleData.timeEnd.hour}:{item.data.scheduleData.timeEnd.minute < 10 ? '0' + item.data.scheduleData.timeEnd.minute : item.data.scheduleData.timeEnd.minute}
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>