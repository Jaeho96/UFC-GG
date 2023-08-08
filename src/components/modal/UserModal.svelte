<script>
	import Modal from "./Modal.svelte";

    export let isShow; // boolean
</script>

<Modal bind:isShow>
    <input />
</Modal>