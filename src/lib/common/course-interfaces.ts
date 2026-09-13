/**
 * Enum for consistency
 */
enum Day {
    DEFAULT = "DEFAULT",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
}

/**
 * Time is represented as 24-hour for simplification
 */
interface Time {
    hour: number;
    minute: number;
}

/**
 * ScheduledClass - A class scheduled for a day
 * 
 * day - What day this schedule class lands on
 * timeStart - What time this schedule class starts 
 * timeEnd - What time this schedule class ends
 */
interface ScheduledClass {
    day: Day;
    room: string;
    timeStart: Time;
    timeEnd: Time;
}

/**
 * Section - A section for a course
 * 
 * section - Specific section ID
 * instructor - Current instructor of the section
 * room - Current room of the section
 * schedule - All scheduled days of the week the section has class
 */
interface Section {
    section: string;
    instructor: string;
    schedule: Array<ScheduledClass>;
}

/**
 * Course - A selected course
 * 
 * id - Course ID
 * code - Course code
 * title - Course title
 * units - How many units the course has
 */
interface Course {
    name: string;
    code: string;
    title: string;
    units: number;
    sections: Array<Section>;
}

// Export everything in this file
// Enums
export {
    Day, 
}

// Interfaces
export type { 
    Time, 
    ScheduledClass,
    Section, 
    Course,

}