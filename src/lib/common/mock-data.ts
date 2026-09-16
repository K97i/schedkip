import { Day } from "./course-interfaces.ts";
import type { Course } from "./course-interfaces.ts";

// Courses to test general functionality
const CCPROG3: Course = {
    name: "CCPROG3",
    code: "CCPROG3",
    title: "Object-Oriented Programming",
    units: 3,
    sections: [
        {
            section: "S01",
            instructor: "Rafael Cabredo",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 12, minute: 45, },
                    timeEnd: { hour: 14, minute: 15, },
                },
                {
                    day: Day.Thursday,
                    room: "G302B",
                    timeStart: { hour: 12, minute: 45, },
                    timeEnd: { hour: 14, minute: 15, },
                },
            ]
        },
        {
            section: "S02",
            instructor: "Rafael Cabredo",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 12, minute: 45, },
                    timeEnd: { hour: 14, minute: 15, },
                },
                {
                    day: Day.Thursday,
                    room: "G302B",
                    timeStart: { hour: 14, minute: 30, },
                    timeEnd: { hour: 16, minute: 0, },
                },
            ]
        },
        {
            section: "S03",
            instructor: "Maria Art Antonette Clariño",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 9, minute: 15, },
                    timeEnd: { hour: 10, minute: 45, },
                },
                {
                    day: Day.Thursday,
                    room: "G306B",
                    timeStart: { hour: 11, minute: 0, },
                    timeEnd: { hour: 12, minute: 30, },
                },
            ]
        },
        {
            section: "S04",
            instructor: "Gary Soriano",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 14, minute: 30, },
                    timeEnd: { hour: 16, minute: 0, },
                },
                {
                    day: Day.Thursday,
                    room: "G304B",
                    timeStart: { hour: 14, minute: 30, },
                    timeEnd: { hour: 16, minute: 0, },
                },
            ]
        },
    ]
};

const CCINFOM: Course = {
    name: "CCINFOM",
    code: "CCINFOM",
    title: "Information Management",
    units: 3,
    sections: [
        {
            section: "S40H",
            instructor: "Michelle Renee Ching",
            schedule: [
                {
                    day: Day.Monday,
                    room: "G304B",
                    timeStart: { hour: 12, minute: 45, },
                    timeEnd: { hour: 14, minute: 15, },
                },
                {
                    day: Day.Thursday,
                    room: "G304B",
                    timeStart: { hour: 12, minute: 45, },
                    timeEnd: { hour: 14, minute: 15, },
                },
            ]
        },
        {
            section: "S40I",
            instructor: "Estefanie Bertumen",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 7, minute: 30, },
                    timeEnd: { hour: 9, minute: 0, },
                },
                {
                    day: Day.Thursday,
                    room: "G304B",
                    timeStart: { hour: 7, minute: 30, },
                    timeEnd: { hour: 9, minute: 0, },
                },
            ]
        },
        {
            section: "S40J",
            instructor: "Oliver Malabanan",
            schedule: [
                {
                    day: Day.Tuesday,
                    room: "Online",
                    timeStart: { hour: 9, minute: 15, },
                    timeEnd: { hour: 10, minute: 45, },
                },
                {
                    day: Day.Friday,
                    room: "G304B",
                    timeStart: { hour: 9, minute: 15, },
                    timeEnd: { hour: 10, minute: 45, },
                },
            ]
        },
    ]
};

const CCPROG1: Course = {
    name: "CCPROG1",
    code: "CCPROG1",
    title: "Logic Formulation and Introductory Programming",
    units: 3,
    sections: [
        {
            section: "S15A",
            instructor: "Arturo Caronongan",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 12, minute: 45, },
                    timeEnd: { hour: 14, minute: 15, },
                },
                {
                    day: Day.Thursday,
                    room: "G302A",
                    timeStart: { hour: 12, minute: 45, },
                    timeEnd: { hour: 14, minute: 15, },
                },
            ]
        },
        {
            section: "S19B",
            instructor: "Gary Soriano",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 9, minute: 15, },
                    timeEnd: { hour: 10, minute: 45, },
                },
                {
                    day: Day.Thursday,
                    room: "G306B",
                    timeStart: { hour: 9, minute: 15, },
                    timeEnd: { hour: 10, minute: 45, },
                },
            ]
        },
        {
            section: "S20B",
            instructor: "Louis Patrice Lu",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 14, minute: 30, },
                    timeEnd: { hour: 16, minute: 0, },
                },
                {
                    day: Day.Thursday,
                    room: "G302B",
                    timeStart: { hour: 14, minute: 30, },
                    timeEnd: { hour: 16, minute: 0, },
                },
            ]
        },
    ]
};

// Course to test row accuracy
const MTH101A: Course = {
    name: "MTH101A",
    code: "MTH101A",
    title: "Foundation Course in Mathematics",
    units: 5,
    sections: [
        {
            section: "S19",
            instructor: "Noel Fortun",
            schedule: [
                {
                    day: Day.Monday,
                    room: "Online",
                    timeStart: { hour: 7, minute: 30, },
                    timeEnd: { hour: 8, minute: 30, },
                },
                {
                    day: Day.Tuesday,
                    room: "Online",
                    timeStart: { hour: 7, minute: 30, },
                    timeEnd: { hour: 8, minute: 30, },
                },
                {
                    day: Day.Thursday,
                    room: "V203",
                    timeStart: { hour: 7, minute: 30, },
                    timeEnd: { hour: 9, minute: 0, },
                },
                {
                    day: Day.Friday,
                    room: "V203",
                    timeStart: { hour: 7, minute: 30, },
                    timeEnd: { hour: 9, minute: 0, },
                },
            ]
        },
    ]
};

// Course to test multiple classes in one day
const CCICOMP: Course = {
    name: "CCICOMP",
    code: "CCICOMP",
    title: "Introduction to Computing",
    units: 5,
    sections: [
        {
            section: "S19",
            instructor: "Jocelynn Cu",
            schedule: [
                {
                    day: Day.Tuesday,
                    room: "Online",
                    timeStart: { hour: 7, minute: 30, },
                    timeEnd: { hour: 9, minute: 0, },
                },
                {
                    day: Day.Friday,
                    room: "G101",
                    timeStart: { hour: 9, minute: 15, },
                    timeEnd: { hour: 10, minute: 45, },
                },
                {
                    day: Day.Friday,
                    room: "G405",
                    timeStart: { hour: 12, minute: 45, },
                    timeEnd: { hour: 14, minute: 15, },
                },
            ]
        },
    ]
};

// Course to test Day.Saturday classes
const NSTPCW2: Course = {
    name: "NSTPCW2",
    code: "NSTPCW2",
    title: "CWTS Formation Phase",
    units: 3,
    sections: [
        {
            section: "S04",
            instructor: "Richie Enecillo",
            schedule: [
                {
                    day: Day.Saturday,
                    room: "V203",
                    timeStart: { hour: 9, minute: 0, },
                    timeEnd: { hour: 12, minute: 0, },
                },
            ]
        },
    ]
};

const MOCK_COURSES: Array<Course> = [
    CCPROG3,
    CCINFOM,
    CCPROG1,
    MTH101A,
    CCICOMP,
    NSTPCW2,
];

export { MOCK_COURSES };