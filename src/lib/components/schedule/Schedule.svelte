<script lang="ts">
    import { Day, type Course, type ScheduledClass, type SelectedSection } from "$lib/common/course-interfaces";
    import { SvelteMap } from "svelte/reactivity";

	let { selectedList }: { selectedList: SvelteMap<string, SelectedSection> } = $props();

    interface ScheduleItem {
        section: SelectedSection;
        scheduleData: ScheduledClass;
    }

    let fullSchedule: SvelteMap<Day, Array<ScheduleItem>> = $derived.by(() => {
        let map: SvelteMap<Day, Array<ScheduleItem>> = new SvelteMap<Day, Array<ScheduleItem>>();
        
        selectedList.forEach((section: SelectedSection) => {
            section.section.schedule.forEach((schedule: ScheduledClass) => {
                let item: ScheduleItem = {
                    section: section,
                    scheduleData: schedule,
                }
                
                let currArray: Array<ScheduleItem> = map.get(schedule.day) ?? [];
                currArray.push(item);
                map.set(schedule.day, currArray);
            })
        })

        return map;
    });

    $effect(() => {
        console.log(fullSchedule);
    })

</script>

<div class="flex min-h-full p-2">
    <div class="flex flex-col items-center justify-center card preset-outlined-secondary-500 bg-secondary-950/20 min-w-full p-2 gap-2">
        <div class="flex flex-1 card preset-outlined-secondary-500 bg-secondary-950/20 p-2 items-center justify-center min-w-full">
            <h1>SCHEDULE</h1>
        </div>
        <div class="flex-15 min-w-full">
            <div class="card preset-outlined-secondary-500 bg-secondary-950/20 flex flex-col min-h-full text-center p-4 gap-1">
                <div class="flex min-w-full card bg-secondary-950/20 rounded-xl">
                    <div class="preset-outlined-secondary-500 rounded-tl-xl flex-1">Time</div>
                    <div class="flex-5 flex flex-row items-center justify-center">
                        <div class="preset-outlined-secondary-500 flex-1">Monday</div>
                        <div class="preset-outlined-secondary-500 flex-1">Tuesday</div>
                        <div class="preset-outlined-secondary-500 flex-1">Wednesday</div>
                        <div class="preset-outlined-secondary-500 flex-1">Thursday</div>
                        <div class="preset-outlined-secondary-500 flex-1 {fullSchedule.has(Day.Saturday) ? "" : "rounded-tr-xl"}">Friday</div>
                        {#if fullSchedule.has(Day.Saturday)}
                            <div class="preset-outlined-secondary-500 rounded-tr-xl  flex-1">Saturday</div>
                        {/if}
                    </div>
                </div>  

                <div class="flex flex-1 min-w-full min-h-full card bg-secondary-950/20 rounded-xl">
                    <!-- Time -->
                    <div class="preset-outlined-secondary-500 rounded-bl-xl flex-1">
                        
                    </div>
                    
                    <div class="flex-5 flex flex-row items-center justify-center">
                        <!-- Monday -->
                        <div class="preset-outlined-secondary-500 flex-1 min-h-full"></div>
                        
                        <!-- Tuesday -->
                        <div class="preset-outlined-secondary-500 flex-1 min-h-full"></div>
                        
                        <!-- Wednesday -->
                        <div class="preset-outlined-secondary-500 flex-1 min-h-full"></div>
                        
                        <!-- Thursday -->
                        <div class="preset-outlined-secondary-500 flex-1 min-h-full"></div>
                        
                        <!-- Friday -->
                        <div class="preset-outlined-secondary-500 flex-1 min-h-full {fullSchedule.has(Day.Saturday) ? "" : "rounded-br-xl"}"></div>
                        
                        <!-- Saturday -->
                        {#if fullSchedule.has(Day.Saturday)}
                            <div class="preset-outlined-secondary-500 rounded-br-xl  flex-1 min-h-full"></div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>