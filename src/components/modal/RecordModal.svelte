<script>
    import { getContext } from 'svelte';
	import ComboBox from '../combobox/ComboBox.svelte';
    export let message;
    export let hasForm = false;
    export let onOkay = () => {};
    export let playersData = [];
    console.log(playersData, 'playersData by ReecordModal.svelte')
    console.log(hasForm, 'hasForm  by ReecordModal.svelte')
  
    const { close } = getContext('simple-modal');
      
      let recordValue = {
        loser: "",
        winner: "",
        update: false
      };

      let onChange = () => {};
      
      function _onCancel() {
          close();
          recordValue = {
                loser: "",
                winner: "",
                update: false
            };
      }
      
      function _onOkay() {
          onOkay(recordValue);
          recordValue = {
                loser: "",
                winner: "",
                update: false
            };
          close();
      }
      
      $: onChange(recordValue)
  </script>
  
  <h2>{message}</h2>
  
  {#if hasForm && playersData.length > 0}
      <ComboBox
        label="승리자"
        name="winner"
        placeholder="선택해 주세요."
        options={playersData}
        bind:value={recordValue.winner}
      />
      <br />
      <ComboBox
        label="패배자"
        name="loser"
        placeholder="선택해 주세요."
        options={playersData}
        bind:value={recordValue.loser}
      />
  {/if}
  
  <div class="buttons">
      <button on:click={_onCancel}>
          닫기
      </button>
      <button on:click={_onOkay}>
          저장
      </button>
  </div>

  <style>
    h2 {
          font-size: 2rem;
          text-align: center;
      }
      
      input {
          width: 100%;
      }
      
      .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
      }
  </style>