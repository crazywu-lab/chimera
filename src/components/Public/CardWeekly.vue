<template>
  <div class="card-simple" id="card-weekly">
    <div class="flex-box close-button-container">
      <button type="close" class="close-button" v-on:click="showCard">
        <svg style=" stroke-width: 1px; stroke: black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <line x2="20" y2="20"/><line x1="20" y2="20"/>
        </svg>
      </button>
    </div>
    <p>
      This week's reading has arrived! Download the pdf file below, and upload the annotated
      version before {{}}.
    </p>
    <div class="flex-box">
      <div class="link" style="border-top: var(--border); border-bottom: var(--border)">
        DOWNLOAD TEXT
      </div>
    </div>
    <p>
      For this week, upload an image below (a footage, drawing, collage, or anything you'd like) of your reading process?
      It could be a photo in your balcony on a nice summer day, or on your couch with your dog taking a nap next to
      you. It could be a selfie, or clouds passing by. You don’t need to spend too much effort on this,
      or be creative!
    </p>
    <div class="flex-box">
      <div class="media-upload">
        <svg width="330" height="330" xmlns="http://www.w3.org/2000/svg" style="stroke-width:1px; stroke:#757575;">
          <path d="M0,0 l330,333"></path>
          <path d="m330,0 l-330,333"></path>
        </svg>
      </div>
    </div>
    <div class="flex-box" style="border-top: var(--border)">
      <div class="link" style="border-right: var(--border)">
        SUBMIT
      </div>
      <div class="link">
        DELETE
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardWeekly",
  data() {
    return {
      showSelf: true,
    }
  },
  mounted(){
    this.addDropZone();
  },
  methods: {
    showCard(event){
      console.log(event);
      this.$emit("showCard", false);
    },
    addDropZone() {
      const dropzone = document.querySelector('.media-upload');

      dropzone.addEventListener('dragenter', event => {
        event.preventDefault();
      });

      dropzone.addEventListener('dragleave', event => {
        event.preventDefault();
      });

      dropzone.addEventListener('dragover', event => {
        event.preventDefault();
      });

      dropzone.addEventListener('drop', event => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('loadend', () => {
          const img = document.createElement('img');
          img.src = reader.result;
          img.style = "width: 330px; height: 333px; object-fit: cover; "
          let svg = dropzone.querySelector("svg");
          dropzone.appendChild(img);
          svg.remove();

        })
      });
    }
  }
}
</script>

<style scoped>
  #card-weekly{
    width: 330px;
  }

  .media-upload{
    width: 330px;
    border-top: var(--border);
    margin: 0 auto;
    top: 0;
    left: 0;
    padding-bottom: -1px;

  }
  .media-upload img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin: 0;
    padding: 0;
    position: fixed;
  }
  .flex-box {
    padding: 0;
    margin: 0;
  }

</style>
