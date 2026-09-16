<script lang="ts">
    import { Combobox, Portal, type ComboboxRootProps, useListCollection } from '@skeletonlabs/skeleton-svelte';
    import { Day } from "$lib/common/course-interfaces";
    import type { Course, ScheduledClass, Section } from "$lib/common/course-interfaces";
    import { fade } from 'svelte/transition';

	let { courses, courseCode = $bindable(), filteredSections = $bindable() }: { courses: Array<Course>, courseCode: string, filteredSections: Array<Section> } = $props();

    let searchInstructor: string = $state("");
    let selectedDate: Day = $state(Day.DEFAULT);
    let comboboxItems: Array<Course> = $derived(courses);

    /**
     * Filter function
     */
    function filter() {
        // Update filteredSections
        filteredSections = courses.filter((course: Course) => course.code === courseCode)
                    .flatMap((course: Course) => course.sections)
                    .filter((section: Section) => {
                        return (
                            // Search by instructor
                            (searchInstructor === "" ? true : 
                                section.instructor.toLowerCase().includes(searchInstructor.toLowerCase())) &&

                            // Search by preferred day
                            (selectedDate === Day.DEFAULT ? true : 
                                section.schedule.filter((schedule: ScheduledClass) => {
                                    schedule.day === selectedDate;
                            }))
                        )
                    });
    };

    // The following code is derived from Skeleton UI's combobox documentation
    // https://www.skeleton.dev/docs/svelte/framework-components/combobox
    
    const comboboxCollection = $derived(
		useListCollection({
			items: courses,
			itemToString: (item) => item.code,
			itemToValue: (item) => item.code,
		}),
	);

    const comboboxOnOpenChange = () => {
		comboboxItems = courses;
	};

    const comboboxOnInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const comboboxFiltered = courses.filter((item) => item.code.toLowerCase().includes(event.inputValue.toLowerCase()));
		if (comboboxFiltered.length > 0) {
			comboboxItems = comboboxFiltered;
		} else {
			comboboxItems = courses.flatMap((course: Course) => course);
		}
	};

    const comboboxOnValueChange: ComboboxRootProps['onValueChange'] = (event) => {
        courseCode = event.value[0];
        filter();
    }
</script>

<div class="card preset-outlined-secondary-500 bg-secondary-950/20 p-2 flex flex-col gap-2">
    <!-- Search by Course -->
    <div>
        <Combobox placeholder="Select course..." onValueChange={comboboxOnValueChange} onInputValueChange={comboboxOnInputValueChange} onOpenChange={comboboxOnOpenChange} collection={comboboxCollection}>
            <Combobox.Control>
                <Combobox.Input class="preset-outlined-secondary-400-600 bg-secondary-500/20"/>
                <Combobox.Trigger />
            </Combobox.Control>
            <Portal>
                <Combobox.Positioner>
                    <Combobox.Content class="preset-outlined-secondary-400-600 bg-surface-800">
                        {#each comboboxItems as course}
                            <Combobox.Item class="bg-secondary-800/20 hover:brightness-70 transition-all" item={course}>
                                <Combobox.ItemText>{course.code}</Combobox.ItemText>
                                <Combobox.ItemIndicator />
                            </Combobox.Item>
                        {/each}
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>
        </Combobox>
    </div>

    <!-- Additional filters -->
    {#if filteredSections.length > 0}
        <div class="flex flex-col gap-2" transition:fade={{ duration: 100 }}>
            <hr class="hr border-secondary-500"/>
            <!-- Search by Instructor-->
            <label class="label">
                <input bind:value={searchInstructor} onkeyup={filter} class="input preset-outlined-secondary-400-600 bg-secondary-500/20" type="text" placeholder="Search by Instructor..." />
            </label>
        </div>
    {/if}
</div>