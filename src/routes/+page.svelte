<script lang="ts">
    import SearchComponent from "$lib/components/search/SearchComponent.svelte";
    import type { Course, SelectedSection } from "$lib/common/course-interfaces";
    import { onMount } from "svelte";
    import { SvelteMap } from "svelte/reactivity";
    import Schedule from "$lib/components/schedule/Schedule.svelte";

    let courses: Array<Course> = $state(new Array<Course>()),
        selectedList: SvelteMap<string, SelectedSection> = $state(new SvelteMap<string, SelectedSection>());

    // Function to grab courses from API
    async function grabCourses() {
        const response = await fetch('./api/get-courses');
        courses = await response.json();
    }

    // Grab courses on load
    onMount(async () => await grabCourses());
</script>

<div class="bg-primary-900/5">
    <div class="flex flex-col md:flex-row min-h-svh">
        <!-- Left Panel -->
        <div class="flex-1 max-h-svh max-w-lg">
            <SearchComponent courses={courses} bind:selectedList={selectedList} />
        </div>

        <!-- Right Panel -->
        <div class="flex-3">
            <Schedule selectedList={selectedList} />
        </div>
    </div>
</div>