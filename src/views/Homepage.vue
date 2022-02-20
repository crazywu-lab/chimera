<template>
  <div>
    <nav class="nav-container">
      <div class="nav-element">
        <a href=" " id="gohome"><h2>Home</h2></a>
      </div>
      <span class="circle nav-element" id="login"></span>
    </nav>
    <div class="container" id="viewport">
      <div class="prompt-lead draggable" id="div-1">
        <header>
          <h1>Welcome to Chimera.</h1>
        </header>
        <p>
          Please submit the reading material that you want to share below. Any
          topic is welcome, but note that you will benefit the most by
          contributing materials that you would like to see people’s response.
          It could be a reading that baffles you and wish to see how other
          people think; a reading that is related to your research interest, and
          you hope to gather more references and feedbacks; or just a favourite
          reading that influences you, and you wish to share with others! A
          reasonable page range for a weekly leisure read; we suggest no more
          than 40 pages.
        </p>
      </div>
      <div class="input-lead draggable" id="div-2">
        <input
          type="text"
          class="text-input"
          id="input-year"
          name="year"
          placeholder="Year"
          maxlength="4"
          size="4"
        />
      </div>
      <div class="input-lead draggable" id="div-3">
        <input
          type="text"
          class="text-input"
          id="input-author"
          name="author"
          placeholder="Author"
          required
        />
      </div>
      <div class="input-lead draggable" id="div-4">
        <input
          type="text"
          class="text-input"
          id="input-title"
          name="title"
          placeholder="Title"
          required
        />
      </div>
      <div class="input-lead draggable" id="div-5">
        <textarea
          class="text-input"
          id="input-explanation"
          name="explanation"
          rows="5"
          placeholder="Short explanation on why you chose the text ..."
          required
        ></textarea>

        <!--            <h2 class="input-description">Short explanation on why you chose the text ...</h2>-->
        <!--            <input type="text" class="text-input" id="input-explanation" name="explanation" style="height: 8.4rem">-->
      </div>
      <div class="draggable" id="div-6">
        <img src="assets/sebald1.jpg" width="300px" />
      </div>
      <div class="draggable" id="div-7">
        <img src="assets/sebald2.jpg" width="240px" />
      </div>
      <div class="draggable" id="div-8">
        <img src="assets/sebald3.jpg" width="260px" />
      </div>
      <div class="draggable button-container" id="div-9">
        <button id="submit">submit</button>
      </div>
    </div>

    <div class="container" id="bg-text-container"></div>
    <!-- <script src="./javascripts/draggable.js"></script>
    <script src="./javascripts/bg_sketch.js"></script>
    <script src="./javascripts/bg_text.js"></script> -->
  </div>
</template>

<script>

export default {
  name: "Homepage",
  data() {
    return {
      userName: this.$cookie.get("chimera-place-auth"),
    };
  },
  components: {
  },
};
</script>
<style scoped>

.column{
    width: 480px;
    margin: 0 auto;
}

.input-lead{
    font-weight: bold;
}

.circle {
    height: 80px;
    width: 80px;
    background-color: black;
    border-radius: 50%;
}
img {
    box-shadow: var(--shadow);
}
button {
    margin: 0 auto;
    background-color: white;
    font-weight: bold;
    font-size: var(--font-med);
    border: 1px solid #757575;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    box-shadow: var(--shadow);
}

button:hover{
    border-width: 2px;
}

button:active{
    transform: translateY(1px);
}

#login{
    box-shadow: 0 0 20px 5px yellowgreen;
}

nav {
    display: flex;
    justify-content: space-between;
}
.nav-element {
    margin: 20px;
}

p {
    font-size: var(--font-small);
    margin: 0 auto;
}

.bg-text {
    font-family: "IBM Plex Mono";
    font-size: var(--font-bg);
    color: #cecbc9;
    font-weight: 100;
    user-select: none;
}

h1 {
    font-family: "Droid Serif";
    font-size: var(--font-big);
    font-weight: lighter;
    margin: 10px 0px 10px;
}

h2 {
    font-size: var(--font-med);
    font-weight: lighter;
    margin: 2px auto;
}

.prompt-lead{
    padding: 10px;
    width: 420px;
    z-index: 10;
    background-color: white;
    border: 1px solid #757575;
}


div .draggable{
    /*position: absolute;*/
    position: relative;
    float: left;
    display: none;
    z-index: auto;
    shape-outside: content-box;
}

div .input-lead{
    float: inside;
}

.active{
    cursor: move;
    user-select: none;
    /*pointer-events: none;*/
}

.button-container{
    position: relative;
    margin: 0 auto;
    /*-ms-transform: translate(-50%, -50%);*/
    /*transform: translate(-50%, -50%);*/
}

.text-input {
    font-size: 1.2rem;
    font-family: sans-serif;
    width: 300px;
    border: 1px solid #757575;
    padding: 7px;
    background-color: black;
    box-shadow: var(--shadow);
}

#input-explanation {
    width: 471px;
}

.text-input:hover {
    background-color: white;
    transition-delay: 500ms;
    transition-duration: 500ms;
}

</style>
