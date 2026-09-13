<script lang="ts">
    import type { Course, Section } from "$lib/common/course-interfaces";
    import { SvelteSet } from "svelte/reactivity";
    import FilterComponent from "./FilterComponent.svelte";
    import SectionList from "./SectionList.svelte";

    // Get course from props
	let { courses, selectedList = $bindable()  }: { courses: Array<Course>, selectedList: SvelteSet<Section> } = $props();
    let filteredCourses: Array<Section> = $state(new Array<Section>());
</script>

<div class="flex flex-col flex-auto p-2 gap-2 min-h-full max-h-full min-w-full">
    <FilterComponent courses={courses} bind:filteredCourses={filteredCourses} />
    <SectionList sections={filteredCourses} bind:selectedList={selectedList} />
</div>