<script lang="ts">
	let { divRows, leftPad = false }: { divRows: number, leftPad?: boolean } = $props();
</script>

<div class="flex flex-col h-full">
    <!-- divRows is 15-minutes intervals, add end line for each -->
    {#each { length: divRows } as _}
        <div class="flex-1 flex flex-col min-w-full">
            <div class="min-w-full min-h-[calc(100% - 1px)]">
            </div>
            <!-- If divider is on time column -->
            <div class="{leftPad ? 'pl-4' : ''}">
                <hr class="hr border-t-1 border-primary-500/50 rounded-xl relative"/>
            </div>
        </div>
    {/each}
</div>