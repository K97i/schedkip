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
    <div class="flex flex-col md:flex-row h-svh overflow-y-scroll snap-y snap-mandatory">
        <div class="md:flex-1 min-w-4xs min-h-svh snap-start">
            <SearchComponent courses={courses} bind:selectedList={selectedList} />
        </div>

        <div class="flex-3 max-w-full md:max-w-3/4 min-h-svh snap-start">
            <Schedule selectedList={selectedList} />
        </div>

    </div>
</div>
