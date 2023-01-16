<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
    import { getPlayerCollectionDoc } from '../firebase'
	import { onMount } from 'svelte';
	import Modal from '../components/modal/Modal.svelte';
	import Content from '../components/modal/Content.svelte';
    import { modal } from '../components/modal/modalStore'

    let playersData = []
    //onMount(async () => {
    //    playersData = await getPlayerCollectionDoc();
    //})

    getPlayerCollectionDoc().then(value => playersData = value)
    // 플레이어 값 변경때마다 실시간으로 보여주고싶은데....
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
                <Content />
            </Modal>
        </div>
	</div>
    <div style="width:100%; margin-top: 2rem;">
        {#each playersData as player}
        <div style="display: flex; justify-content: space-around">
            <p style="width: 25%">{player.name}</p>
            <p style="width: 25%">승: {player.win}</p>
            <p style="width: 25%">패: {player.lose}</p>
            <p style="width: 25%">승률: {player.win || player.lose !== 0 ? ((player.win / (player.win + player.lose)) * 100).toFixed(2) : 0}%</p>
        </div>
        {/each}
    </div>
    <!--<RecordModal/>-->
</section>

<!--<Modal show={$modal}>
    <Content />
</Modal>-->

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
