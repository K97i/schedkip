<script lang="ts">
    import ScheduleHourDivider from "./ScheduleHourDivider.svelte";

	let { divRows, hourData }: { divRows: number, hourData: { earliestHour: number, latestHour: number } } = $props();

    let noOfHours = $derived(divRows / 4);
</script>


<div class="grid grid-cols-1 grid-rows-1 h-full">
  
    <div class="col-start-1 row-start-1 h-full">
        <div class="flex flex-col p-1 h-full">
                {#each { length: noOfHours } as _, i}
                    <div class="flex-1 flex flex-col min-w-full">
                        <div class="card preset-outlined-primary-500 bg-primary-950/20 min-w-full min-h-full flex items-center justify-center">
                            {hourData.earliestHour + i}:00
                        </div>
                    </div>
                {/each}
            </div>
    </div>

    <div class="col-start-1 row-start-1 h-full">
        <ScheduleHourDivider leftPad divRows={divRows} />
    </div>

</div>