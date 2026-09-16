<script lang="ts">
    import type { Section, SelectedSection } from "$lib/common/course-interfaces";
    import { SvelteMap } from "svelte/reactivity";
    import { fade, fly } from "svelte/transition";

    // Only keys that will select the sections when using keyboard
    const TOGGLE_KEYS: Array<string> = [
        "Enter",
        "Space",
    ];

    // Get section from props
	let { courseCode, section, selectedList = $bindable(), }: { courseCode: string, section: Section, selectedList: SvelteMap<string, SelectedSection> } = $props();
    let sectionData: SelectedSection = $derived({
        course: courseCode,
        section: section
    });

    let sectionCode: string = $derived(`${courseCode}-${section.section}`);
    let selected: boolean = $derived(selectedList.has(sectionCode));
    
    /**
     * Check if there is a schedule conflict
     */
    let scheduleConflict: boolean = $derived.by(() => {
        const selectedSections: Array<SelectedSection> = Array.from(selectedList.values());

        // In any schedule block...
        return sectionData.section.schedule.some((currentSectionSchedule) => {
            // Get block start and end
            const scheduleStart = currentSectionSchedule.timeStart.hour * 60 + currentSectionSchedule.timeStart.minute;
            const scheduleEnd = currentSectionSchedule.timeEnd.hour * 60 + currentSectionSchedule.timeEnd.minute;

            // In any of selected section...
            return selectedSections.some((listSection) => {
                // In any schedule block in said selected section...
                return listSection.section.schedule.some((scheduleItem) => {
                    // If not of same day, return false
                    if ((currentSectionSchedule.day !== scheduleItem.day)) return false;

                    // Get block start and end
                    const itemStart = scheduleItem.timeStart.hour * 60 + scheduleItem.timeStart.minute;
                    const itemEnd = scheduleItem.timeEnd.hour * 60 + scheduleItem.timeEnd.minute;
                    
                    // Return if there is conflict between two blocks
                    return ( (scheduleStart < itemEnd) && (scheduleEnd > itemStart) )
                })
            });
        })
    })

    // Toggle functions for selection
    function toggle() {
        if (!selected)
            selectedList.set(sectionCode, sectionData);
        else
            selectedList.delete(sectionCode);
    }

    function toggleKey(event: KeyboardEvent) {
        if (TOGGLE_KEYS.some(key => key === event.key))
            toggle();
    }

    // Set card color
    let cardColor: string = $derived(selected ? 
        "preset-outlined-primary-400-600 bg-primary-500/20" : 
            (!scheduleConflict ? 
                "preset-outlined-secondary-400-600 bg-secondary-500/20" : 
                "preset-outlined-error-400-600 bg-error-500/20 brightness-70"
            )
    )
</script>

<div transition:fly={{ duration: 100, y: 20 }} class="min-w-full flex relative" > 
    <div transition:fade={{ duration: 100 }} 
        onclick={selected ? toggle : (!scheduleConflict ? toggle : () => {})} 
        onkeyup={(event) => {selected ? toggleKey(event) : (!scheduleConflict ? toggleKey(event) : () => {})}} 
        role="button" tabindex="0" 
        class="card 
            {cardColor} 
            {selected ? '' : (!scheduleConflict ? 'hover:brightness-70' : '')} 
            transition-all p-2 gap-2 flex flex-col min-w-full min-h-24 select-none"
    >
        <!-- Top Bar -->
        <div class="flex flex-row justify-between gap-2 text-sm">
            <!-- Section -->
            <div class="card {cardColor} p-0.5 px-2 rounded-lg flex items-center justify-center whitespace-nowrap">
                {section.section}
            </div>

            <div class="card {cardColor} p-0.5 px-2 rounded-lg flex items-center justify-center whitespace-nowrap">
                {section.instructor}
            </div>
        </div>

        <!-- Section Info -->
        <div class="flex flex-row gap-2 flex-wrap">
            {#each section.schedule as schedule}
                <div class="card {cardColor} p-2 flex-auto text-center text-sm min-w-1/3">
                    <div>
                        {schedule.day}
                    </div>
                    <div class="text-xs whitespace-nowrap">
                        {schedule.timeStart.hour}:{schedule.timeStart.minute <= 10 ? "0" + schedule.timeStart.minute : schedule.timeStart.minute} - {schedule.timeEnd.hour}:{schedule.timeEnd.minute <= 10 ? "0" + schedule.timeEnd.minute : schedule.timeEnd.minute}
                    </div>
                    <div class="text-xs">
                        {schedule.room}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Add overlay if schedule conflict -->
    {#if scheduleConflict && !selected}
        <div class="rounded-xl absolute inset-0 backdrop-blur-[1.25px]">
            <div class="flex h-full items-center justify-center">
                <div class="chip preset-outlined-error-400-600 bg-error-500/10">
                    Schedule Conflict!
                </div>
            </div>
        </div>
    {/if}
</div>
    

