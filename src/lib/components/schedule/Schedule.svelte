<script lang="ts">
    import type { Course, Section } from "$lib/common/course-interfaces";
    import type { SvelteSet } from "svelte/reactivity";

	let { courses, selectedList  }: { courses: Array<Course>, selectedList: SvelteSet<Section> } = $props();
</script>

<div class="">
    
</div>