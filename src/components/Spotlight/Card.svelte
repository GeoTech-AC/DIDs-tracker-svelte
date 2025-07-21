<script>
  import { orderBy } from 'lodash-es';
  import { css } from '../../actions/css';
  import { statusRenameDict } from '../../utils/levels.js';

  export let datum;

  function getDisplayStatus(status) {
    return statusRenameDict[status] || status;
  }

  $: categories = orderBy(Object.keys(datum.categories).map(key => {
    return {
      category: key,
      ...datum.categories[key]
    };
  }), 'filterable', 'desc');
</script>

<div class="spotlight-card">
  <div class="card-header">
    <div class="card-country-identity">
      <div class="card-country">{datum.name}</div>
      <div class="card-project">{datum.digital_id_name}</div> 
    </div>
    <div class="card-overview">
      <p>{datum.overview_spotlight}</p>
    </div>
  </div>
  

  <div class="card-key-developments">
    <p class="text-md">
      {@html datum.key_developments_spotlight.replace(/\n/g, '<br>')}
    </p>
  </div>

  <div class="card-tag-list">
    {#each categories as cat (cat.title)}
      <div 
        class="card-global-tag" 
        use:css={{chipColor: cat.color}}
      >
        <div
          class="card-local-tag"
          use:css={{chipColor: cat.color}}
        >
          <span class="card-cat-title">{cat.title}</span>
          <span class="chip">
            {getDisplayStatus(cat.name)}
          </span>
        </div> 
      </div>
    {/each}
  </div>
</div>

<style>

.spotlight-card {
  font-family: var(--primFont, 'Inter', 'Segoe UI', Arial, sans-serif);
  max-width: 640px;
  min-width: 270px;
  margin: 18px auto;
  border-radius: 2.1em;
  background: linear-gradient(115deg, #f7faff 70%, #e0f7fa 100%);
  box-shadow: 0 10px 36px 0 #c9e7fa55, 0 2px 12px #6ed1e755;
  border: 1.8px solid #aee9f8;
  overflow: hidden;
  transition: box-shadow 0.19s, transform 0.13s;
  position: relative;
}
.spotlight-card:hover {
  box-shadow: 0 16px 44px 0 #6ed1e799, 0 8px 36px #aee9f899;
  transform: scale(1.012);
}

.card-header {
  background: linear-gradient(90deg, #6ed1e7 0%, #aee9f8 100%);
  padding: 1.2em 1.5em 1em 1.5em;
  border-bottom: 1.5px solid #b0e0ee;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 2em 2em 0 0;
  box-shadow: 0 4px 18px #6ed1e711;
}

.card-country-identity {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.18em;
}

.card-country {
  color: #2196f3;
  font-size: 1.12rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  margin-bottom: 0.2em;
  text-shadow: 0 2px 8px #aee9f880;
}

.card-project {
  color: #08547a;
  font-size: 1.37rem;
  font-weight: 600;
  letter-spacing: 0.012em;
  margin-bottom: 0.22em;
}

.card-overview {
  font-size: 0.99rem;
  max-width: 310px;
  text-align: left;
  font-style: italic;
  color: #0a3d62;
  opacity: 0.83;
  margin-left: 1.2em;
}

.card-key-developments {
  margin: 1.5em 2em 1em 2em;
  font-size: 1.05rem;
  color: #3d4852;
  border-left: 5px solid #6ed1e7;
  background: #f4fcffb8;
  padding: 1.1em 1.3em;
  border-radius: 0.8em;
  box-shadow: 0 2px 10px #c9e7fa18;
  transition: box-shadow 0.12s;
}

.card-key-developments:hover {
  box-shadow: 0 5px 18px #aee9f829;
}

.card-tag-list {
  font-size: 1rem;
  padding: 1.1em 1.2em 1.2em 1.2em;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7em;
  background: linear-gradient(90deg, #f7faff 60%, #e3f2fd 100%);
  border-radius: 0 0 1.3em 1.3em;
  border-top: 1.1px solid #e0f7fa;
}

.card-global-tag {
  border: 2.5px solid var(--chipColor, #2196f3);
  border-radius: 1.8em;
  display: inline-flex;
  background: linear-gradient(90deg, #aee9f8 10%, #fff 80%);
  box-shadow: 0 2px 10px #aee9f844;
  margin: 2.5px 5.5px 2.5px 0;
  transition: box-shadow 0.13s, border-color 0.16s;
}
.card-global-tag:hover {
  box-shadow: 0 6px 22px #6ed1e733;
  border-color: #2196f3;
}

.card-local-tag {
  display: flex;
  align-items: center;
  font-size: 0.99rem;
  border-radius: 1.5em;
}

.card-cat-title {
  padding: 0.23rem 0.6rem;
  color: #2196f3;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.chip {
  padding: 0.23rem 0.7rem;
  color: #fff;
  background: linear-gradient(90deg, var(--chipColor, #2196f3) 40%, #00b4d8 100%);
  border: none;
  outline: none;
  cursor: inherit;
  border-radius: 1em;
  font-weight: 700;
  margin-left: 0.13em;
  box-shadow: 0 1px 8px #2196f344;
  font-size: 1.07rem;
}

.text-md {
  font-size: 1.07rem;
}

/* Responsive layout for mobile */
@media (max-width: 700px) {
  .spotlight-card {
    margin: 12px 0;
    border-radius: 1.3em;
  }
  .card-header {
    padding: 1em 0.8em 0.8em 0.8em;
    flex-direction: column;
    align-items: flex-start;
  }
  .card-overview {
    margin-left: 0;
    max-width: 98vw;
    font-size: 0.97rem;
  }
  .card-tag-list {
    padding: 0.8em 0.7em 1em 0.7em;
    font-size: 0.97rem;
    border-radius: 0 0 1em 1em;
  }
}

</style>