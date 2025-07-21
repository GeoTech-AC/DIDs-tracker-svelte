<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';

  export let path = 'M0 0';
  export let color = '#FFFFFF';
  export let strokeColor = '#000';
  export let fallbackFillColor = '#FFFFFF';
  export let fillOpacity = 1.0;
  export let mode = 'area';
  export let contextName = 'canvas';

  const { register, deregister, invalidate } = getContext(contextName);

  const tFillOpacity = tweened(fillOpacity, {
    duration: 200
  });

 function draw(ctx) {
  ctx.fillStyle = color ? color : fallbackFillColor;
  ctx.strokeStyle = mode === 'stroke' && color ? color : strokeColor;
  ctx.lineWidth = mode === 'stroke' ? 5 : 2;   // <--- increased line widths

  const p = new Path2D(path);
  ctx.beginPath();

  ctx.globalAlpha = $tFillOpacity;
  if (mode === 'area') ctx.fill(p);

  ctx.globalAlpha = mode === 'area' ? 1.0 : $tFillOpacity;
  ctx.stroke(p);

  if (mode === 'stroke') {
    ctx.strokeStyle = fallbackFillColor;
    ctx.lineWidth = 5;  // <--- thicker fallback for regions
    ctx.stroke(p);
  }
}

  onMount(() => {
    register(draw);
    invalidate();
    
    return () => {
      deregister(draw);
    };
  });

	afterUpdate(invalidate);

	onDestroy(invalidate);

  $: tFillOpacity.set(fillOpacity);
</script>