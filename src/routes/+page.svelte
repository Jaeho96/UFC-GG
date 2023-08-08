<script>
    import welcome from '$lib/images/svelte-welcome.webp';
    import welcome_fallback from '$lib/images/svelte-welcome.png';
    import { getPlayerCollectionDoc } from '../firebase';
    import Modal from '../components/modal/Modal.svelte';
    import Content from '../components/modal/Content.svelte';
    import { modal } from '../components/modal/modalStore';
    import { onDestroy, onMount } from 'svelte';
  
    let playersData = [];

  onMount(() => {
    const unsubscribe = getPlayerCollectionDoc((data) => {
      playersData = data;
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  });

  onDestroy(() => {
    playersData = [];
  });
  
    $: sortedPlayersData = [...playersData].sort((a, b) => b.win - a.win);
  </script>
  
  <svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
  </svelte:head>
  
  <section>
    <div class="middle">
      <span class="welcome">
        <picture>
          <source srcset={welcome} type="image/webp" />
          <img src={welcome_fallback} alt="Welcome" />
        </picture>
      </span>
      <div style="position: relative">
        <h1 style="margin: 0;">UFC.GG</h1>
        <Modal show={$modal}>
          <Content playersData={playersData} />
        </Modal>
      </div>
    </div>
    <div style="width:100%; margin-top: 2rem;">
      {#if playersData.length > 0}
        {#each sortedPlayersData as player}
          <div style="display: flex; justify-content: space-around">
            <p style="width: 25%">{player.name}</p>
            <p style="width: 25%">승: {player.win}</p>
            <p style="width: 25%">패: {player.lose}</p>
            <p style="width: 25%">승률: {player.win + player.lose === 0 ? 0 : ((player.win / (player.win + player.lose)) * 100).toFixed(2)}%</p>
          </div>
        {/each}
      {:else}
        <p>Loading...</p>
      {/if}
    </div>
  </section>
  
  <style>
    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 0.6;
    }
  
    .middle {
      width: 100%;
    }
  
    .welcome {
      display: block;
      position: relative;
      width: 100%;
      height: 0;
      padding: 0 0 calc(100% * 495 / 2048) 0;
    }
  
    .welcome img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      display: block;
    }
  </style>
  