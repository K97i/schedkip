<script lang="ts">
    import type { Course, Section, SelectedSection } from "$lib/common/course-interfaces";
    import { SvelteMap } from "svelte/reactivity";
    import FilterComponent from "./FilterComponent.svelte";
    import SectionList from "./SectionList.svelte";

    // Get course from props
	let { courses, selectedList = $bindable()  }: { courses: Array<Course>, selectedList: SvelteMap<string, SelectedSection> } = $props();
    let filteredSections: Array<Section> = $state(new Array<Section>()),
        courseCode: string = $state('');

</script>

<div class="flex flex-col flex-auto p-2 gap-2 min-h-full max-h-full min-w-full">
    <FilterComponent courses={courses} bind:courseCode={courseCode} bind:filteredSections={filteredSections} />
    <SectionList courseCode={courseCode} sections={filteredSections} bind:selectedList={selectedList} />
</div>