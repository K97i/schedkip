<script lang="ts">
    import ScheduledBlock from "./ScheduledBlock.svelte";
    import ScheduleHourDivider from "./ScheduleHourDivider.svelte";
    import { type RowData, type ScheduleItem } from "./ScheduleItem";

	let { daySchedule, rowData }: { daySchedule: Array<ScheduleItem> | undefined, rowData: RowData } = $props();

    // Convert time to row number in schedule
    function timeToRow(time: { hour: number; minute: number }, earliestHour: number): number {
        return (time.hour - earliestHour) * 4 + Math.floor(time.minute / 15);
    }
    
    // Interface for schedule item data
    interface ScheduleDiv {
        flex: number;
        data: ScheduleItem | undefined;
    }

    /**
     * Create an array of blocks for the divs
     */
    let dayArray: Array<ScheduleDiv> = $derived.by(() => {
        const blocks: ScheduleDiv[] = [];
        let currentCursorRow = 0;

        // For each of the daySchedule...
        daySchedule?.forEach((item) => {
            // Get start-end points of item
            const startRow = timeToRow(item.scheduleData.timeStart, rowData.earliestHour);
            const endRow = timeToRow(item.scheduleData.timeEnd, rowData.earliestHour);

            // Add any necessary empty space (break periods) before item
            if (startRow > currentCursorRow) {
                blocks.push({
                    flex: startRow - currentCursorRow,
                    data: undefined
                });
            }

            // Add actual item to array
            blocks.push({
                flex: endRow - startRow,
                data: item
            });

            // Move current row to end of row
            currentCursorRow = endRow;
        })

        // Add padding to the end to fill the rest of the rows
        if (currentCursorRow < rowData.divRows) {
            blocks.push({
                flex: rowData.divRows - currentCursorRow,
                data: undefined
            });
        }

        // Return final array
        return blocks;
    });
</script>

<div class="grid grid-cols-1 grid-rows-1 min-w-8 md:min-w-32 max-w-full h-full">
    <!-- Divider Underlay -->
    <div class="col-start-1 row-start-1 h-full">
        <ScheduleHourDivider divRows={rowData.divRows} />
    </div>
    
    <!-- Actual Data -->
    <div class="col-start-1 row-start-1 h-full">
        <div class="flex flex-col p-1 h-full items-center">
            {#each dayArray as item}
                <!-- Set number of rows taken -->
                <div style="flex: {item.flex}" class="flex min-w-full">
                    <!-- If block is an actual class -->
                    {#if item.data}
                        <ScheduledBlock data={item.data} />
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>