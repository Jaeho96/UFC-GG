<script>
    import { getContext } from 'svelte';
	import { getPlayerCollectionDoc } from '../../firebase';
	import ComboBox from '../combobox/ComboBox.svelte';
    export let message;
    export let hasForm = false;
    export let onOkay = () => {};
  
    const { close } = getContext('simple-modal');
      
      let recordValue = {
        loser: "",
        winner: "",
        update: false
      };

      let playerList = []
      getPlayerCollectionDoc()
        .then(players => {
            playerList = players.map((item) => {
                return { text: item.name, value: item.name }
            })
        })

      let onChange = () => {};
      
      function _onCancel() {
          close();
      }
      
      function _onOkay() {
          onOkay(recordValue);
          close();
      }
      
      $: onChange(recordValue)
  </script>
  
  <h2>{message}</h2>
  
  {#if hasForm}
    <!--승리자
    <input
      type="text" required bind:value={recordValue.winner}/>
    <br/>
    패배자
    <input
      type="text" required bind:value={recordValue.loser}/>-->
      <ComboBox
        label="승리자"
        name="winner"
        placeholder="선택해 주세요."
        options={playerList}
      />
      <ComboBox
        label="패배자"
        name="loser"
        placeholder="선택해 주세요."
        options={playerList}
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