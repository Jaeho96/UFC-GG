<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
    import { saveUser, saveScore, getUsers, getScores } from '../firebase';
	import Modal from '../components/modal/Modal.svelte';
	import UserModal from '../components/modal/UserModal.svelte';

    let username = '';
    let score = 0;

    const registerUser = () => {
    if (username && score) {
        const user = { username };
        saveUser(userId, user);
        saveScore(userId, { score });
    }
    };

    let userId = '';
    let users = [];
    let scores = [];

    getUsers((data) => {
        users = data;
    })

    getScores(userId, (data) => {
        scores = data;
    });

    //$: console.log("users", users)
    //$: console.log("scores", scores)
    
    let showModal = {
        userModal: false,
        recordModal: false,
    }

    $: console.log("showModal", showModal)

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
            <button on:click={() => (showModal.userModal = true)}> user modal </button>
            <button on:click={() => (showModal.recordModal = true)}> record modal </button>
            <h2>User Registration</h2>
            <input bind:value={username} placeholder="Username" />
            <input type="number" bind:value={score} placeholder="Score" />
            <button on:click={registerUser}>Register</button>
          
            <h2>User Scores</h2>
            <ul>
              {#each scores as s}
                <li>{s.score}</li>
              {/each}
            </ul>
            <div style="display:flex; justify-content:space-between; border: 1px solid red">
                <p>이름</p>
                <p>승리</p>
                <p>패배</p>
            </div>
        </div>
	</div>
    <!--<UserModal bind:showModal />-->
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
