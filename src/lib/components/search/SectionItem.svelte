<script lang="ts">
    import type { Section } from "$lib/common/course-interfaces";
    import { SvelteSet } from "svelte/reactivity";
    import { fade, fly } from "svelte/transition";

    const TOGGLE_KEYS: Array<string> = [
        "Enter",
        "Space",
    ]

    // Get section from props
	let { section, selectedList = $bindable(), }: { section: Section, selectedList: SvelteSet<Section> } = $props();
    let selected: boolean = $state(false);

    function toggle() {
        selected = !selected;

        if (selected)
            selectedList.add(section);
        else
            selectedList.delete(section);
    }

    function toggleKey(event: KeyboardEvent) {
        if (TOGGLE_KEYS.some(key => key === event.key))
            toggle();
    }

    let cardColor: string = $derived(selected ? "preset-outlined-primary-400-600 bg-primary-500/20" : "preset-outlined-secondary-400-600 bg-secondary-500/20")
</script>

<div transition:fly={{ duration: 100, y: 20 }} class="min-w-full flex" >
    <div transition:fade={{ duration: 100 }} onclick={toggle} onkeyup={(event) => toggleKey(event)} role="button" tabindex="0" class="card {cardColor} hover:brightness-70 transition-all p-2 gap-2 flex flex-col min-w-full min-h-24 select-none">
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
        <div class="flex flex-row gap-2">
            {#each section.schedule as schedule}
                <div class="card {cardColor} p-2 flex-auto text-center text-sm">
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
</div>
    

