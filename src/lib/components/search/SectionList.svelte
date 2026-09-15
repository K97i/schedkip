<script lang="ts">
    import type { Section, SelectedSection } from "$lib/common/course-interfaces";
    import { SvelteMap } from "svelte/reactivity";
    import SectionItem from "./SectionItem.svelte";

    // Get course from props
	let { courseCode, sections, selectedList = $bindable() }: { courseCode: string, sections: Array<Section>, selectedList: SvelteMap<string, SelectedSection> } = $props();
</script>

<div class="card preset-outlined-secondary-500 bg-secondary-950/20 p-2 gap-2 flex flex-col flex-auto items-center overflow-auto max-h-full max-w-full scrollbar-thin scrollbar-thumb-secondary-contrast-950-50/50">
    {#each sections as section}
        <SectionItem courseCode={courseCode} section={section} bind:selectedList={selectedList} />
    {/each}
</div>