<script lang="ts">
    import type { ScheduleItem } from "./ScheduleItem";

    let { data }: { data: ScheduleItem } = $props();
</script>

<div class="card preset-outlined-primary-500 bg-primary-950/20 backdrop-blur-[2px] flex flex-col min-w-full justify-between">
    <!-- Start Time -->
    <div class="flex flex-row justify-center text-surface-300">
        <div class="text-xs md:text-[0.70rem]">
            {data.scheduleData.timeStart.hour}:{data.scheduleData.timeStart.minute < 10 ? '0' + data.scheduleData.timeStart.minute : data.scheduleData.timeStart.minute} 
        </div>
    </div>

    <!-- Section Data -->
    <div class="flex flex-col text-[0.60rem] md:text-[0.70rem] leading-none">
        <div>
            {data.section.course}
        </div>
        <div>
            {data.scheduleData.room}
        </div>
        <div>
            ({data.section.section.section})
        </div>
    </div>
    <!-- End Time -->
    <div class="flex flex-row justify-center text-surface-300">
        <div class="text-xs md:text-[0.70rem]">
            {data.scheduleData.timeEnd.hour}:{data.scheduleData.timeEnd.minute < 10 ? '0' + data.scheduleData.timeEnd.minute : data.scheduleData.timeEnd.minute}
        </div>
    </div>
</div>