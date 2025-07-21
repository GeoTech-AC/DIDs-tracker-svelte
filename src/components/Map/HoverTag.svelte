<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, draw } from 'svelte/transition';
  import { statusRenameDict } from '../../utils/levels.js';

  import { tagConnectorPath, tagLabelPath } from '../../utils/paths';

  import Centroid from './Centroid.svelte';

  export let data;
  export let tagHeight = 35;
  export let tagGap = 10;
  export let tagOffset = 40;
  export let mapWidth = 0;
  export let mapHeight = 0;

  const dispatch = createEventDispatcher();

  const labelArrowWidth = 30;
  const pathGrowDuration = 200;
  const cornerRadius = 5;
  const offset = 20;

  let textCategoryElems = [];
  let textNameElems = [];

  function handleTagLabelClick(tag) {
    if (!tag.filterable) return;
    const { category, name } = tag;
    dispatch('tagclick', {
      category,
      name
    });
  }


  function getDisplayStatus(status) {
  return statusRenameDict[status] || status;
}


  $: tags = [
    {
      category: 'name',
      ...{
        ...data.name,
        name: data.name.name === 'United States of America' ? 'United States' : data.name.name
      }
    },
    ...Object.keys(data.categories)
    .map(key => {
      return {
        category: key,
        ...data.categories[key]
      };
    })
    .filter(d => d.name !== 'Undecided')
  ];


  $: totalHeight = Math.max(0, tagHeight * (tags.length - 0) + tagGap * (tags.length - 1));

  $: maxTagWidth = Math.max(0, ...[...textCategoryElems.map(d => d.getBBox()), textNameElems.map(d => d.getBBox())].map(d => d.width).filter(d => d));
  $: isAtTopBorder = data.centroid[1] - totalHeight / 2 < offset;
  $: isAtLeftBorder = data.centroid[0] < maxTagWidth + offset + tagOffset + 2 * labelArrowWidth;
  $: isAtBottomBorder = data.centroid[1] + totalHeight / 2 > mapHeight - offset;
  $: isAtRightBorder = data.centroid[0] > mapWidth - offset - maxTagWidth - tagOffset - 2 * labelArrowWidth;
  
  $: yShift = isAtTopBorder ? totalHeight / 2 - data.centroid[1] : isAtBottomBorder ? mapHeight - (data.centroid[1] + totalHeight / 1.8) : 0;

  $: tagsPaths = tags.map((tag, i) => {
    let direction = isAtRightBorder ? -1 : isAtLeftBorder ? 1 : (tag.category === 'name' ? -1 : 1);
    const height = tag.category === 'name' && !isAtLeftBorder && !isAtRightBorder? tagHeight : totalHeight;
    const x2 = direction * tagOffset;
    const y2 = i * (tagHeight + tagGap) - height / 2 + tagHeight / 2 + yShift;
    const x3 = x2 + labelArrowWidth * direction;
    const y3 = y2 - tagHeight / 2;
    const x4 = x3 + 0.5 * labelArrowWidth * direction;
    const y4 = y3;
    const x5 = x4;
    const y5 = y4 + tagHeight;
    const x6 = x3;
    const y6 = y5;
    return {
      ...tag,
      id: i,
      x1: 0,
      y1: 0,
      x2,
      y2,
      x3,
      y3,
      x4,
      y4,
      x5,
      y5,
      x6,
      y6,
      direction
    };
  });

  $: tagsPathsRefined = textNameElems.map((textName, i) => {
    const tag = tagsPaths[i];
    const { direction } = tag;
    const { width: widthCategory } = textCategoryElems[i].getBBox();
    const { width: widthName, height } = textName.getBBox();
    const width = Math.max(widthCategory, widthName);
    return {
      ...tag,
      x4: tag.x4 + width * direction,
      x5: tag.x4 + width * direction,
      textCategoryYOffset: -tagHeight / 6,
      textNameYOffset: tag.category === 'name' ? height / 4 : tagHeight / 3
    };
  });
  
</script>

<g class="shadow-hover-tag">
  {#each tagsPaths as tag, i (tag.id)}
    <text
      class="tag-text-category"
      bind:this={textCategoryElems[i]}
    >
      {tag.title}
    </text>
    <text
      class="tag-text-name"
      bind:this={textNameElems[i]}
    >
    {getDisplayStatus(tag.name)}
    </text>
  {/each}
</g>
<g
  class="hover-tag"
  transform="translate({data.centroid[0]} {data.centroid[1]})"
  on:mouseenter
  on:mouseleave
>
  {#each tagsPathsRefined as tag (tag.id)}
    <path
      class="tag-connector-path background"
      d={tagConnectorPath(tag.x1, tag.y1, tag.x2, tag.y2)}
      transition:draw={{duration: pathGrowDuration}}
    />
    <path
      class="tag-connector-path"
      d={tagConnectorPath(tag.x1, tag.y1, tag.x2, tag.y2)}
      stroke={data.categories.new_status.color}
      transition:draw={{duration: pathGrowDuration}}
    />
    <g
      class="tag-label"
      class:selectable={tag.filterable}
      in:fade={{delay: pathGrowDuration}}
      out:fade={{delay: 0}}
      style="--stroke: {data.categories.new_status.color};"
    >
      <path
        class="tag-label-path background"
        class:country={tag.category === 'country'}
        d={tagLabelPath(tag.x2, tag.y2, tag.x3, tag.y3, tag.x4, tag.y4, tag.x5, tag.y5, tag.x6, tag.y6, tag.direction * cornerRadius)}
      />
      <path
        class="tag-label-path"
        class:country={tag.category === 'name'}
        d={tagLabelPath(tag.x2, tag.y2, tag.x3, tag.y3, tag.x4, tag.y4, tag.x5, tag.y5, tag.x6, tag.y6, tag.direction * cornerRadius)}
        fill={tag.category === 'name' ? data.categories.new_status.color : 'var(--secWhite)'}
        on:click={() => handleTagLabelClick(tag)}
      />
      <g
        class="tag-label-content"
        transform="translate({tag.x2} {tag.y2})"
      >
        {#if (tag.category !== 'name')}
          <text
            class="tag-text-category"
            text-anchor="{tag.direction === 1 ? 'start' : 'end'}"
            dx={labelArrowWidth * tag.direction}
            dy={tag.textCategoryYOffset}
            fill={tag.category === 'name' ? 'var(--darkgray)' : data.categories.new_status.color}
          >
            {tag.title}
          </text>
        {/if}
        <text
          class="tag-text-name"
          text-anchor="{tag.direction === 1 ? 'start' : 'end'}"
          dx={labelArrowWidth * tag.direction}
          dy={tag.textNameYOffset}
        >
        {tag.category === 'new_status' ? getDisplayStatus(tag.name) : tag.name}
      </text>
      </g>
    </g>
  {/each}
</g>
<Centroid
  dataCountry={data}
  color={data.categories.new_status.color}
  isReactive={false}
  inverted={getDisplayStatus(data.status) === 'region'}
/>

<style>
  g {
  user-select: none;
  pointer-events: none;
}

g.tag-label {
  pointer-events: all;
}

/* Connector Path Styles */
.tag-connector-path {
  stroke-width: 2.3;
  fill: none;
  filter: drop-shadow(0 2px 8px #7bdff2cc);
}

.tag-connector-path.background {
  stroke: #f7faff;
  stroke-width: 6;
  fill: none;
}

/* Tag Label Path as a Glassy/Colorful Pill */
.tag-label-path {
  stroke: var(--stroke);
  stroke-width: 2.3;
  fill: #6ed1e7;   /* Fallback: a nice blue-teal */
  filter: drop-shadow(0 4px 14px #aee9f855);
  opacity: 0.98;
  transition: filter 0.16s, stroke 0.14s, fill 0.18s;
}
.selectable .tag-label-path:not(.country) {
  cursor: pointer;
}
.selectable .tag-label-path:not(.country):hover {
  stroke: #0093e9;
  fill: #aee9f8;  /* Lighter on hover */
  filter: drop-shadow(0 8px 24px #00b4d888);
}

.tag-label-path.background {
  stroke: #e0f7fa;
  stroke-width: 7;
  fill: none;
}

/* Text styling */
text {
  font-family: var(--primFont, 'Inter', 'Segoe UI', Arial, sans-serif);
  text-shadow: 0 2px 12px #f7faffcc, 0 1px 3px #fff8;
  transition: fill 0.13s, text-shadow 0.15s;
}

.tag-text-category {
  font-size: 0.94rem;
  fill: #2274a5;
  font-weight: 700;
  opacity: 0.93;
  letter-spacing: 0.025em;
}

.tag-text-name {
  fill: #fff;
  font-size: 1.14rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 10px #0093e977, 0 4px 22px #fff7;
}

g.tag-label.selectable:hover .tag-label-path:not(.background) {
  filter: drop-shadow(0 12px 34px #0093e988) blur(0.2px);
  opacity: 1;
}

g.tag-label.selectable:hover .tag-text-name {
  fill: #e7faff;
  text-shadow: 0 3px 18px #80d0c7;
}

g.tag-label.selectable:active .tag-label-path:not(.background) {
  fill: #00b4d8;
  stroke: #2274a5;
}

g.tag-label.selectable:active .tag-text-name {
  fill: #b9f3fc;
}
</style>