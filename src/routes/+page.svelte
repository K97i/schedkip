<script lang="ts">
    import type { Course } from "$lib/course-interfaces";
    import { onMount } from "svelte";

    let courses: Array<Course> = $state(new Array<Course>());

    // Function to grab courses from API
    async function grabCourses() {
        const response = await fetch('./api/get-courses');
        courses = await response.json();
    }

    // Grab courses on load
    onMount(async () => await grabCourses());
</script>