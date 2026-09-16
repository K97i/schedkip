<script lang="ts">
    import { Day, type ScheduledClass, type SelectedSection } from "$lib/common/course-interfaces";
    import { SvelteMap } from "svelte/reactivity";
    import { ScheduleTime, type RowData, type ScheduleItem } from "./ScheduleItem";
    import ScheduleColumn from "./ScheduleColumn.svelte";
    import TimeColumn from "./TimeColumn.svelte";
    import { onMount } from "svelte";

	let { selectedList }: { selectedList: SvelteMap<string, SelectedSection> } = $props();

    /**
     * Map the entire schedule to be split between days
     * fullSchedule = { Day.Monday => {[...]}, Day.Tuesday = {[...]}, ... }
     */
    let fullSchedule: SvelteMap<Day, Array<ScheduleItem>> = $derived.by(() => {
        // Store inner map
        let map: SvelteMap<Day, Array<ScheduleItem>> = new SvelteMap<Day, Array<ScheduleItem>>();
        
        // For each section...
        selectedList.forEach((section: SelectedSection) => {
            
            // For each scheduled class in section...
            section.section.schedule.forEach((schedule: ScheduledClass) => {
                // Create item object
                let item: ScheduleItem = {
                    section: section,
                    scheduleData: schedule,
                }
                
                // Push to day in inner map
                let currArray: Array<ScheduleItem> = map.get(schedule.day) ?? [];
                currArray.push(item);
                map.set(schedule.day, currArray);
            })
        })

        // Arrange each scheduled class chronologically
        for (const schedule of map.values()) {
            schedule.sort((a, b) => {
                const aTime = a.scheduleData.timeStart;
                const bTime = b.scheduleData.timeStart;

                return (
                    (aTime.hour * 60 + aTime.minute) -
                    (bTime.hour * 60 + bTime.minute)
                );
            });
        }

        // Return final map
        return map;
    });

    // Calculate numbers for schedule, number of rows
    let rowData: RowData = $derived(ScheduleTime(fullSchedule));
    
    // Responsive Design stuff
    let screenWidth: number = $state(0);
    let remSize: number = $state(0);

    onMount(() => {
		remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
	});
</script>

<!-- Get screen width -->
<svelte:window bind:innerWidth={screenWidth} />

<div class="flex min-h-full p-2">
    <div class="flex flex-col items-center justify-center card preset-outlined-primary-500 bg-primary-950/20 min-w-full p-2 md:p-4 gap-2">
        
        <!-- Schedule Title -->
        <div class="flex card preset-outlined-primary-500 bg-primary-950/20 p-4 items-center justify-center min-w-full max-w-full min-h-fit">
            <h1 class="font-black">SCHEDULE</h1>
        </div>
        
        <!-- Schedule Proper -->
        <div class="flex-auto min-w-full max-w-full card preset-outlined-primary-500 bg-primary-950/20 items-center justify-center overflow-auto scrollbar-thin scrollbar-thumb-primary-contrast-950-50/50">
            <div class="flex flex-col min-h-full min-w-fit text-sm text-center md:p-4 gap-1">

                <!-- Table Headers -->
                <div class="flex min-w-full card bg-primary-950/20 rounded-tl-xl">
                    <div class="preset-outlined-primary-500 rounded-tl-xl flex-1">{screenWidth >= 48 * remSize ? "Time" : "Time"}</div>
                    <div class="flex-5 flex flex-row items-center justify-center">
                        <div class="preset-outlined-primary-500 flex-1">{screenWidth >= 48 * remSize ? "Monday" : "M"}</div>
                        <div class="preset-outlined-primary-500 flex-1">{screenWidth >= 48 * remSize ? "Tuesday" : "T"}</div>
                        <div class="preset-outlined-primary-500 flex-1">{screenWidth >= 48 * remSize ? "Wednesday" : "W"}</div>
                        <div class="preset-outlined-primary-500 flex-1">{screenWidth >= 48 * remSize ? "Thursday" : "T"}</div>
                        <div class="preset-outlined-primary-500 flex-1 {fullSchedule.has(Day.Saturday) ? "" : "rounded-tr-xl"}">{screenWidth >= 48 * remSize ? "Friday" : "F"}</div>
                        {#if fullSchedule.has(Day.Saturday)}
                            <div class="preset-outlined-primary-500 rounded-tr-xl  flex-1">{screenWidth >= 48 * remSize ? "Saturday" : "S"}</div>
                        {/if}
                    </div>
                </div>

                <!-- Table Data -->
                <div class="flex flex-1 min-w-full card bg-primary-950/20 rounded-bl-xl">
                    
                    <!-- Time -->
                    <div class="flex flex-1 flex-row items-center justify-center preset-outlined-primary-500 rounded-bl-xl">
                        <div class="h-full w-full">
                            <TimeColumn rowData={rowData}></TimeColumn>
                        </div>
                    </div>
                    
                    <!-- Days -->
                    <div class="flex-5 flex flex-row items-center justify-center">
                        <!-- Monday -->
                        <div class="preset-outlined-primary-500 flex-1 h-full">
                            <ScheduleColumn daySchedule={fullSchedule.get(Day.Monday)} rowData={rowData}></ScheduleColumn>
                        </div>
                        
                        <!-- Tuesday -->
                        <div class="preset-outlined-primary-500 flex-1 h-full">
                            <ScheduleColumn daySchedule={fullSchedule.get(Day.Tuesday)} rowData={rowData}></ScheduleColumn>
                        </div>
                        
                        <!-- Wednesday -->
                        <div class="preset-outlined-primary-500 flex-1 h-full">
                            <ScheduleColumn daySchedule={fullSchedule.get(Day.Wednesday)} rowData={rowData}></ScheduleColumn>
                        </div>
                        
                        <!-- Thursday -->
                        <div class="preset-outlined-primary-500 flex-1 h-full">
                            <ScheduleColumn daySchedule={fullSchedule.get(Day.Thursday)} rowData={rowData}></ScheduleColumn>
                        </div>
                        
                        <!-- Friday -->
                        <div class="preset-outlined-primary-500 flex-1 h-full {fullSchedule.has(Day.Saturday) ? "" : "rounded-br-xl"}">
                            <ScheduleColumn daySchedule={fullSchedule.get(Day.Friday)} rowData={rowData}></ScheduleColumn>
                        </div>
                        
                        <!-- Saturday -->
                        {#if fullSchedule.has(Day.Saturday)}
                            <div class="preset-outlined-primary-500 rounded-br-xl  flex-1 h-full">
                                <ScheduleColumn daySchedule={fullSchedule.get(Day.Saturday)} rowData={rowData}></ScheduleColumn>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>