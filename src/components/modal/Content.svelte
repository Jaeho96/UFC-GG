<script>
    import { getContext } from 'svelte';      
	import { addRecordDoc } from '../../firebase';
    import RecordModal from './RecordModal.svelte';

    export let playersData = [];
    console.log(playersData, 'playersData from Content.svelte')
  
    const { open } = getContext('simple-modal');
      
      const onOkay = (recordValue) => {
        addRecordDoc(recordValue)
      }
  
    const showDialog = () => {
          open(
              RecordModal,
              {
                  message: "경기 기록",
                  hasForm: true,
                  onOkay,
                  playersData,
              },
              {
                  closeButton: false,
                  closeOnEsc: false,
                  closeOnOuterClick: false,
              }
        );
      };
  </script>
  
  <section>
        <button style="position: absolute; top: 5px; right: 0; font-size: 24px;" on:click={showDialog}>전적추가</button>
  </section>
  
  <style>
      
  </style>