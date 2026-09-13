# Technical Rationale

This file is to document the rationale between design and architectural decisions.

## UI Design Inspirations

### Slottle

[Slottle](https://pana.tools/slottle-chrome)'s overall layout is clean, effective, and makes sense to a normal user. As such, the layout and design of Slottle shall become the base (or the fork in version control terms) of the layout and design of Schedkip. However, information and individual components (specifically the course list) could be more condensed or tighter.

### Visual Studio Code

<p align="center">
    <img width="300px" src="./gh-assets/rationale/vscode-1.png">
</p>

Visual Studio Code's layout and design for search is simple, concise, and self descriptive of the functions of each component. I think that this will be a more effective design for the search than Slottle's design.

## Frameworks, Libraries

For this site, I used Svelte / SvelteKit (web framework), TailwindCSS (CSS framework), and SkeletonUI (component library), as I am most familiar with the usage of all of these technologies.

## Course Data Structure

I explicitly defined the entire structure of the course data in `course-interfaces.ts`, with interface definitions. Instead of a JSON file piped into the TypeScript code, I opted to make the mock data inside TypeScript file `mock-data.ts`, to explicitly ensure type safety during the creation of the mock data (and further input from an admin webpage should this be developed into an actual website).
