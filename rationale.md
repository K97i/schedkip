# Technical Rationale

This file is to document the rationale between design and architectural decisions.

## Frameworks, Libraries

For this site, I used Svelte / SvelteKit (web framework), TailwindCSS (CSS framework), and SkeletonUI (component library), as I am most familiar with the usage of all of these technologies.

## Course Data Structure

I explicitly defined the entire structure of the course data in `course-interfaces.ts`, with interface definitions. Instead of a JSON file piped into the TypeScript code, I opted to make the mock data inside TypeScript file `mock-data.ts`, to explicitly ensure type safety during the creation of the mock data (and further input from an admin webpage should this be developed into an actual website).
