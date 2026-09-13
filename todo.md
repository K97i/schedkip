Add SelectedSection interface, replace current system
```ts
interface SelectedSection {
    course: string; // Course Code
    section: Section;
}
```

Create Schedule.svelte for timetable (`<Table>`, row/col span)

Check for schedule conflicts (use day and timeStart/End)
- Add "one-off" parameter to course interface (ex: LASARE1)